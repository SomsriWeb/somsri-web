// start.js
import { spawn } from 'child_process';
import process from 'process';

const ZONE = process.env.CLOUDFLARE_ZONE_ID;
const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const MODE = process.env.PURGE_MODE || 'everything';
const PURGE_URLS = process.env.PURGE_URLS || '[]';
const PURGE_TAGS = process.env.PURGE_TAGS || '[]';

if (!ZONE || !TOKEN) {
    console.error('Missing CLOUDFLARE_ZONE_ID or CLOUDFLARE_API_TOKEN in env');
    // but don't exit because we still want the server to run — comment out exit if you prefer failure
}

// 1) Spawn Nuxt server (ปรับคำสั่งตามวิธีที่คุณรัน Nuxt)
const server = spawn('bun', ['--bun', 'run', 'server/index.mjs'], {
    stdio: 'inherit',
    shell: false,
});

// forward exit code or signals
server.on('exit', (code, signal) => {
    console.log(`Nuxt server exited with code=${code}, signal=${signal}`);
    // exit main process with same code so container stops
    process.exit(code ?? (signal ? 1 : 0));
});

// handle container signals and forward to child
['SIGINT', 'SIGTERM', 'SIGHUP'].forEach((sig) => {
    process.on(sig, () => {
        console.log(`Received ${sig}, forwarding to Nuxt server...`);
        server.kill(sig);
        // give it a moment then exit
        setTimeout(() => process.exit(0), 5000);
    });
});

// 2) After 60s, call Cloudflare purge (if env configured)
async function purgeCloudflare() {
    if (!ZONE || !TOKEN) {
        console.warn('Cloudflare env missing — skipping purge');
        return;
    }
    const endpoint = `https://api.cloudflare.com/client/v4/zones/${ZONE}/purge_cache`;

    try {
        console.log('Triggering Cloudflare purge, mode=', MODE);
        let body;
        if (MODE === 'everything') {
            body = JSON.stringify({ purge_everything: true });
        } else if (MODE === 'urls') {
            const urls = JSON.parse(PURGE_URLS);
            if (!Array.isArray(urls) || urls.length === 0) throw new Error('PURGE_URLS empty');
            body = JSON.stringify({ files: urls });
        } else if (MODE === 'tags') {
            const tags = JSON.parse(PURGE_TAGS);
            if (!Array.isArray(tags) || tags.length === 0) throw new Error('PURGE_TAGS empty');
            body = JSON.stringify({ tags });
        } else {
            throw new Error('Unknown PURGE_MODE');
        }

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
            body,
        });
        const json = await res.json();
        console.log('Cloudflare purge response:', json);
    } catch (err) {
        console.error('Cloudflare purge failed:', err);
    }
}

// schedule purge after 60s
setTimeout(() => {
    purgeCloudflare();
}, 60_000);

// keep process alive until server exits
