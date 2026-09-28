import { request } from 'node:https';

const allowedResponseHeaders = new Set([
    'x-goog-hash',
    'x-goog-stored-content-length',
    'content-length',
    'x-goog-generation',
    'content-type',
    'x-guploader-uploadid',
    'x-goog-request-id',
    'retry-after',
]);

try {
    let input = '';
    for await (const chunk of process.stdin) {
        input += chunk;
        if (input.length > 65536) throw new Error('Input too large');
    }
    const { url, headers } = JSON.parse(input);
    const target = new URL(url);
    if (target.protocol !== 'https:' || target.hostname !== 'storage.googleapis.com') throw new Error('Invalid HEAD host');
    const result = await new Promise((resolve, reject) => {
        const outgoing = request(target, { method: 'HEAD', headers }, (incoming) => {
            const rawHeaders = [];
            for (let index = 0; index < incoming.rawHeaders.length; index += 2) {
                const name = incoming.rawHeaders[index];
                if (allowedResponseHeaders.has(name.toLowerCase())) rawHeaders.push(name, incoming.rawHeaders[index + 1]);
            }
            incoming.resume();
            incoming.on('end', () => resolve({
                status: incoming.statusCode ?? 0,
                statusText: incoming.statusMessage ?? '',
                rawHeaders,
            }));
            incoming.on('error', reject);
        });
        outgoing.on('error', reject);
        outgoing.end();
    });
    process.stdout.write(JSON.stringify(result));
} catch {
    // Do not print signed headers, URLs, keys, or underlying request errors.
    process.exitCode = 1;
}
