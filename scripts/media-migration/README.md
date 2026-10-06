# Media migration — Phase 1 plan and Phase 2 upload/verify

Run from the repository root:

```sh
bun run media:plan
```

Equivalent: `bun run scripts/media-migration/cli.ts plan`.

The `plan` command reads only `public/` plus Git HEAD metadata and writes a new
`migrations/media/<unique-run-id>/manifest.json`. Each invocation creates a separate
plan; it does not overwrite previous manifests. No upload occurs during planning.

The fixed public connection settings match the supplied PoC:

- Bucket: `somsri-web`
- Object keys: path after `public/` directly (no prefix)
- Public base URL: `https://storage.googleapis.com/somsri-web`
- S3 endpoint: `https://storage.googleapis.com`
- Region: `auto`
- Upload/verify authentication: existing `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY`

Planning does not read or require credentials. Upload/verify use the installed
`aws4fetch` and existing HMAC environment. They do not use ADC or service-account
JSON. Do not add credentials to configuration, manifests, command arguments, or logs.

Scope: PNG, JPG, JPEG, WebP, SVG, GIF, MP4, WebM, plus both ICO icons. Non-media
files such as fonts and manifests are counted as ignored. Counts reflect the
current working tree, not an assumed 3,010-file snapshot. MIME types are determined
by extension (case-insensitive), not content sniffing.

Each record includes sourcePath (repo-relative), oldPublicPath, objectKey,
publicUrl, size in bytes, CRC32C checksum (big-endian bytes encoded as base64),
mimeType, and pending status. A generated publicUrl is a mapping only, not proof
the object exists or is publicly readable.

Folder structure, Unicode, spaces and case are preserved exactly in object keys.
URLs encode each path segment once. Symlinks, traversal, empty segments, control
characters, backslashes, oversized object keys and Unicode-normalized collisions
fail the plan. Source size/identity/timestamps are checked across hashing to
detect modifications during a read. Avoid editing public/ while planning; future
upload must recheck source bytes against this manifest.

The final Studio configuration explicitly uses `prefix: ''`. Omitting that option
would restore Studio's built-in `studio` prefix. The migration config and new
manifest contain no `prefix` field. Older manifests with `studio-poc` are rejected
by upload/verify; use a newly generated manifest for the root-bucket layout.

Preview the first five eligible files without credentials, remote requests, a
manifest lock, or manifest changes:

```sh
bun run media:upload --manifest migrations/media/<run-id>/manifest.json --limit 5 --dry-run
```

The preview prints the manifest path, bucket, eligible count, process count,
and selected `sourcePath -> objectKey` mappings. Only `pending`/`failed` files
are eligible, in manifest order. Omit `--limit` to select all eligible files.
`--limit` must be a positive integer.

To upload from **an existing manifest** only when explicitly ready:

```sh
bun run media:upload --manifest migrations/media/<run-id>/manifest.json --execute
```

`--execute` prints the same manifest path, bucket, eligible count and process
count before any remote request. Add `--limit 5` for a bounded run; remaining
pending files are left untouched and do not make an otherwise successful run
fail.

The upload command processes only `pending`/`failed` records. It rechecks local
size and CRC32C, then HEADs the remote object. A matching existing object is
adopted as `verified` without a PUT. A different or uncheckable object becomes
`conflict`. Each PUT carries `x-goog-if-generation-match: 0` and an `x-goog-hash`
CRC32C, so it cannot replace a live object and GCS checks uploaded bytes. After
PUT, HEAD size and CRC32C must match before the record becomes `verified`.
PUT uses the same HMAC credentials with GCS V4 (`GOOG4-HMAC-SHA256`) signing and
only `x-goog-*` extension headers; `aws4fetch` remains in use for HEAD requests.
Transient network/408/429/5xx errors get at most five retries after the first
attempt. An ambiguous PUT is checked by HEAD before any retry. Upload is
sequential; the manifest is atomically checkpointed after every attempted file.
Interrupted runs can be restarted with the same command. A `.lock` file prevents
simultaneous writers; if the process is killed, inspect/remove only that stale lock.

Read-only verification of **all** manifest keys:

```sh
bun run media:verify --manifest migrations/media/<run-id>/manifest.json
```

`verify` only sends HEAD requests. It does not change GCS or the manifest.
Missing pending/failed objects count as skipped; other missing objects count as
failed. Matching objects count as verified. Size/CRC32C/generation differences
count as conflict. Both commands print `uploaded`, `verified`, `skipped`, `failed`,
and `conflict`; errors/conflicts produce exit code 1. ETag is not used as a hash.
GCS can return CRC32C and MD5 as separate `x-goog-hash` headers. Bun retains
only the last value, so a HEAD missing CRC32C is repeated through the native
Node executable on `PATH` to read both raw header values. Stored content length
is preferred over HTTP content length. This fallback is read-only.

To reconcile existing `conflict`/`failed` records without uploading:

```sh
bun run media:reconcile --manifest migrations/media/<run-id>/manifest.json
```

`reconcile` only sends HEAD requests. A matching size and CRC32C with a generation
changes the record to `verified`, saves its generation, clears its error, and
atomically checkpoints the manifest after that record. Missing, mismatched, or
unreadable objects keep their old status. A manifest lock prevents concurrent
writers; unresolved records or HEAD errors produce exit code 1. No PUT or DELETE
request is made.

Neither command deletes GCS objects, deletes local media, nor changes content
references. Older Phase 1 manifests use the previous prefix and must not be used
for this layout.

Local tests (fixtures only, no cloud access):

```sh
bun test scripts/media-migration
```
