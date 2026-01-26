# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS build
WORKDIR /app
ARG STUDIO_GITHUB_MODERATORS=web.somsritshirt@outlook.com
ENV STUDIO_GITHUB_MODERATORS=web.somsritshirt@outlook.com

COPY package.json bun.lock* ./

# use ignore-scripts to avoid builting node modules like better-sqlite3
RUN bun install --frozen-lockfile --ignore-scripts

# Copy the entire project
COPY . .

RUN --mount=type=secret,id=STUDIO_GITHUB_CLIENT_ID \
    --mount=type=secret,id=STUDIO_GITHUB_CLIENT_SECRET \
    export STUDIO_GITHUB_CLIENT_ID=$(cat /run/secrets/STUDIO_GITHUB_CLIENT_ID) && \
    export STUDIO_GITHUB_CLIENT_SECRET=$(cat /run/secrets/STUDIO_GITHUB_CLIENT_SECRET) && \
    bun --bun run build

# copy production dependencies and source code into final image
FROM oven/bun:1 AS production
WORKDIR /app

ENV NODE_ENV=production

# Only `.output` folder is needed from the build stage
COPY --from=build /app/.output /app
COPY --from=build /app/entrypoint.js /app

# run the app
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "--bun", "run", "./entrypoint.js"] 
