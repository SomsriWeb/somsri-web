# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1
WORKDIR /usr/src/app

COPY package.json ./

# use ignore-scripts to avoid builting node modules like better-sqlite3
RUN bun install --production --ignore-scripts
RUN bun install --cpu=x64 --os=linux --libc=glibc sharp

# Copy the entire project
COPY . .

RUN bun --bun run build

# run the app
EXPOSE 3000

CMD [ "bun", "--bun", "run", ".output/server/index.mjs" ]