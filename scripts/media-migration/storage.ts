import { AwsClient } from 'aws4fetch';
import { spawnSync } from 'node:child_process';
import { createHash, createHmac } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { config } from './config';

export interface RemoteObject {
    size: number;
    crc32c: string | null;
    generation: string | null;
}

export interface ObjectStorage {
    head(key: string): Promise<RemoteObject | null>;
    put(key: string, bytes: Uint8Array, mimeType: string, crc32c: string): Promise<void>;
}

export class StorageError extends Error {
    constructor(public readonly status: number | null, operation: string, details?: {
        statusText: string;
        headers: Record<string, string>;
        body: string;
    }) {
        const response = details ? `; statusText=${JSON.stringify(details.statusText)}; headers=${JSON.stringify(details.headers)}; body=${JSON.stringify(details.body)}` : '';
        super(`${operation} failed${status === null ? ' (network)' : ` (HTTP ${status})`}${response}`);
    }
}

export function isRetryable(error: unknown): boolean {
    if (error instanceof StorageError) {
        return error.status === null || error.status === 408 || error.status === 429 || (error.status !== null && error.status >= 500);
    }
    return false;
}

export async function retryTransient<T>(operation: () => Promise<T>, wait: (ms: number) => Promise<void> = (ms) => new Promise((resolve) => setTimeout(resolve, ms))): Promise<T> {
    for (let retry = 0; ; retry++) {
        try { return await operation(); }
        catch (error) {
            if (!isRetryable(error) || retry >= 5) throw error;
            await wait(Math.min(8000, 200 * 2 ** retry) + Math.floor(Math.random() * 100));
        }
    }
}

function parseCrc32c(values: string[]): string | null {
    for (const value of values) {
        const match = value.match(/(?:^|,)\s*crc32c\s*=\s*([A-Za-z0-9+/]{6}==)(?=\s*(?:,|$))/i);
        if (match) return match[1]!;
    }
    return null;
}

interface RawHeadResponse {
    status: number;
    statusText: string;
    rawHeaders: string[];
}

function rawHeaderValues(rawHeaders: string[], name: string): string[] {
    const values: string[] = [];
    for (let index = 0; index < rawHeaders.length; index += 2) {
        if (rawHeaders[index]?.toLowerCase() === name) values.push(rawHeaders[index + 1]!);
    }
    return values;
}

function headMetadata(values: (name: string) => string[]): RemoteObject {
    const rawSize = values('x-goog-stored-content-length')[0] ?? values('content-length')[0];
    const size = rawSize && /^\d+$/.test(rawSize) ? Number(rawSize) : NaN;
    if (!Number.isSafeInteger(size) || size < 0) throw new Error('HEAD returned invalid content length');
    return {
        size,
        crc32c: parseCrc32c(values('x-goog-hash')),
        generation: values('x-goog-generation')[0] ?? null,
    };
}

async function readRawHead(signed: Request): Promise<RawHeadResponse> {
    // Bun collapses repeated x-goog-hash headers even in its node:https shim.
    // Native Node preserves them; pass the signed request via stdin, never argv/logs.
    const result = spawnSync('node', [fileURLToPath(new URL('./raw-head.mjs', import.meta.url))], {
        input: JSON.stringify({ url: signed.url, headers: Object.fromEntries(signed.headers) }),
        encoding: 'utf8',
        maxBuffer: 64 * 1024,
        env: { PATH: process.env.PATH ?? '' },
    });
    if (result.error || result.status !== 0) throw new Error('Raw HEAD failed');
    return JSON.parse(result.stdout) as RawHeadResponse;
}

function objectUrl(key: string): string {
    const encoded = key.split('/').map((segment) => encodeURIComponent(segment)
        .replace(/[!'()*]/g, (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`)).join('/');
    return `${config.endpoint}/${config.bucket}/${encoded}`;
}

function signedGooglePut(url: string, bytes: Uint8Array, mimeType: string, crc32c: string, accessKeyId: string, secretAccessKey: string): Request {
    const target = new URL(url);
    const timestamp = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
    const date = timestamp.slice(0, 8);
    const scope = `${date}/${config.region}/storage/goog4_request`;
    const payloadHash = createHash('sha256').update(bytes).digest('hex');
    const headers = new Headers({
        'content-type': mimeType,
        'x-goog-content-sha256': payloadHash,
        'x-goog-date': timestamp,
        'x-goog-hash': `crc32c=${crc32c}`,
        'x-goog-if-generation-match': '0',
    });
    const signedNames = ['content-type', 'host', ...headers.keys()].filter((name, index, names) => names.indexOf(name) === index).sort();
    const canonicalHeaders = signedNames.map((name) => `${name}:${name === 'host' ? target.host : headers.get(name)}`).join('\n') + '\n';
    const canonicalRequest = ['PUT', target.pathname, '', canonicalHeaders, signedNames.join(';'), payloadHash].join('\n');
    const stringToSign = ['GOOG4-HMAC-SHA256', timestamp, scope, createHash('sha256').update(canonicalRequest).digest('hex')].join('\n');
    const hmac = (key: string | Buffer, value: string) => createHmac('sha256', key).update(value).digest();
    const signingKey = hmac(hmac(hmac(hmac(`GOOG4${secretAccessKey}`, date), config.region), 'storage'), 'goog4_request');
    const signature = createHmac('sha256', signingKey).update(stringToSign).digest('hex');
    headers.set('authorization', `GOOG4-HMAC-SHA256 Credential=${accessKeyId}/${scope}, SignedHeaders=${signedNames.join(';')}, Signature=${signature}`);
    return new Request(url, { method: 'PUT', headers, body: bytes });
}

export function createGcsStorage(accessKeyId: string, secretAccessKey: string, rawHead = readRawHead): ObjectStorage {
    const client = new AwsClient({ accessKeyId, secretAccessKey, region: config.region, service: 's3', retries: 0 });
    function redact(value: string): string {
        let safe = value;
        for (const secret of [accessKeyId, secretAccessKey]) {
            if (secret) safe = safe.split(secret).join('[REDACTED]');
        }
        return safe.replace(/<Authorization\b[^>]*>[\s\S]*?<\/Authorization>/gi, '<Authorization>[REDACTED]</Authorization>')
            .replace(/\bAuthorization\s*[:=]\s*[^\r\n<]+/gi, 'Authorization: [REDACTED]');
    }
    async function responseError(response: Response, operation: 'HEAD' | 'PUT'): Promise<StorageError> {
        const headers: Record<string, string> = {};
        for (const name of ['content-type', 'x-guploader-uploadid', 'x-goog-request-id', 'x-goog-error-code', 'retry-after']) {
            const value = response.headers.get(name);
            if (value !== null) headers[name] = redact(value);
        }
        let body = '';
        try {
            const text = await response.text();
            const safeText = redact(text);
            body = safeText.slice(0, 8192);
            if (safeText.length > 8192) body += ' [truncated]';
        } catch { body = '[response body unavailable]'; }
        return new StorageError(response.status, operation, {
            statusText: redact(response.statusText), headers, body,
        });
    }
    async function request(key: string, method: 'HEAD' | 'PUT', headers?: HeadersInit, body?: Uint8Array): Promise<Response> {
        try {
            return await client.fetch(objectUrl(key), { method, headers, body });
        } catch {
            // Underlying exceptions can include signed request details. Never print them.
            throw new StorageError(null, method);
        }
    }
    return {
        async head(key) {
            const response = await request(key, 'HEAD');
            if (response.status === 404) return null;
            if (!response.ok) throw await responseError(response, 'HEAD');
            const metadata = headMetadata((name) => {
                const value = response.headers.get(name);
                return value === null ? [] : [value];
            });
            if (metadata.crc32c) return metadata;
            // Bun Fetch keeps only the last repeated x-goog-hash (often MD5).
            // Re-read the signed HEAD via Node's rawHeaders so CRC32C is not lost.
            let raw: RawHeadResponse;
            try { raw = await rawHead(await client.sign(objectUrl(key), { method: 'HEAD' })); }
            catch { throw new StorageError(null, 'HEAD'); }
            if (raw.status === 404) return null;
            if (raw.status < 200 || raw.status >= 300) throw new StorageError(raw.status, 'HEAD', {
                statusText: redact(raw.statusText),
                headers: Object.fromEntries(['content-type', 'x-guploader-uploadid', 'x-goog-request-id', 'retry-after']
                    .flatMap((name) => rawHeaderValues(raw.rawHeaders, name).slice(0, 1).map((value) => [name, redact(value)]))),
                body: '',
            });
            return headMetadata((name) => rawHeaderValues(raw.rawHeaders, name));
        },
        async put(key, bytes, mimeType, crc32c) {
            let response: Response;
            try {
                response = await fetch(signedGooglePut(objectUrl(key), bytes, mimeType, crc32c, accessKeyId, secretAccessKey));
            } catch {
                // Signed requests can contain credentials; keep network diagnostics generic.
                throw new StorageError(null, 'PUT');
            }
            if (!response.ok) throw await responseError(response, 'PUT');
        },
    };
}
