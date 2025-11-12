# BUILD
FROM oven/bun:1 AS build
WORKDIR /app
ARG NODE_ENV=production
ARG NODE_OPTIONS=--max-old-space-size=16384

COPY package.json bun.lock* ./

# use ignore-scripts to avoid builting node modules like better-sqlite3
RUN bun install ignore-scripts

COPY . .

RUN bun --bun run build

# COPY TO PRODUCTION
FROM oven/bun:1 AS production
WORKDIR /app
ARG NODE_ENV=production

# Install curl for call cloudflare api
RUN apt-get update && \
    apt-get install -y curl libvips && \
    rm -rf /var/lib/apt/lists/*

COPY package.json bun.lock* ./

RUN bun install --production

# Copy the entire project
COPY --from=build /app/.output .

# run the app
EXPOSE 3000/tcp

ENTRYPOINT [ "bun", "--bun", "run", "server/index.mjs" ]