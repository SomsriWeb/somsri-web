import { fileURLToPath } from 'node:url';

export const repoRoot = fileURLToPath(new URL('../../', import.meta.url));

// Public connection settings only. Planning never reads credentials or opens a connection.
// Upload/verify use the existing S3_ACCESS_KEY_ID/S3_SECRET_ACCESS_KEY.
export const config = Object.freeze({
    bucket: 'somsri-web',
    publicBaseUrl: 'https://storage.googleapis.com/somsri-web',
    endpoint: 'https://storage.googleapis.com',
    region: 'auto',
    connection: 's3-hmac',
});

export const mimeTypes: Readonly<Record<string, string>> = Object.freeze({
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.gif': 'image/gif',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.ico': 'image/x-icon',
});
