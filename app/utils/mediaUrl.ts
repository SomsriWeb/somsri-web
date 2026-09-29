export const MEDIA_PUBLIC_BASE_URL = 'https://storage.googleapis.com/somsri-web';

// Accept a raw object key (optionally with a leading slash), as stored in public/.
export function mediaUrl(path: string): string {
    if (!path || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path)) return path;

    const key = path.replace(/^\//, '');
    const segments = key.split('/');
    if (segments.some((segment) => !segment || segment === '.' || segment === '..')
        || /[\\\u0000-\u001f\u007f]/u.test(key)) {
        throw new Error(`Unsafe media path: ${JSON.stringify(path)}`);
    }

    return `${MEDIA_PUBLIC_BASE_URL}/${segments.map(encodeURIComponent).join('/')}`;
}
