# Media migration — Phase 1

Run from the repository root:

```sh
bun run media:plan
```

Equivalent: `bun run scripts/media-migration/cli.ts plan`.

This command reads only `public/` plus Git HEAD metadata and writes a new
`migrations/media/<unique-run-id>/manifest.json`. Each invocation creates a separate
plan; it does not overwrite previous manifests. No upload, deletion, reference
replacement, Nuxt build, or network request is implemented. Unsupported commands
and flags (including `upload` and `--execute`) fail before planning.

The fixed public connection settings match the supplied PoC:

- Bucket: `somsri-web`
- Prefix: `studio-poc`
- Public base URL: `https://storage.googleapis.com/somsri-web`
- S3 endpoint: `https://storage.googleapis.com`
- Region: `auto`
- Future authentication: existing `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY`

Planning does not read or require credentials. No ADC, service-account JSON, or
new dependency is required. Do not add credentials to configuration or manifests.

Scope: PNG, JPG, JPEG, WebP, SVG, GIF, MP4, WebM, plus both ICO icons. Non-media
files such as fonts and manifests are counted as ignored. Counts reflect the
current working tree, not an assumed 3,010-file snapshot. MIME types are determined
by extension (case-insensitive), not content sniffing.

Each record includes sourcePath (repo-relative), oldPublicPath, objectKey,
publicUrl, size in bytes, CRC32C checksum (big-endian bytes encoded as base64),
mimeType, and pending status. Attempts remain zero; generation and verifiedAt
remain null. A generated publicUrl is a mapping only, not proof the object exists
or is publicly readable. Future verification must compare GCS size/CRC32C rather
than treating ETag as a checksum.

Folder structure, Unicode, spaces and case are preserved exactly in object keys.
URLs encode each path segment once. Symlinks, traversal, empty segments, control
characters, backslashes, oversized object keys and Unicode-normalized collisions
fail the plan. Source size/identity/timestamps are checked across hashing to
detect modifications during a read. Avoid editing public/ while planning; future
upload must recheck source bytes against this manifest.

Local tests (fixtures only, no cloud access):

```sh
bun test scripts/media-migration/manifest.test.ts
```
