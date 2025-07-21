# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM node:lts-slim
WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json ./

# use ignore-scripts to avoid builting node modules like better-sqlite3
RUN pnpm install --no-frozen-lockfile --ignore-scripts
RUN npm rebuild --arch=x64 --platform=linux --libc=glibc sharp   

# Copy the entire project
COPY . .

RUN npm run build

# run the app
EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]
