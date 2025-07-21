# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM node:lts-alpine
WORKDIR /usr/src/app

COPY package.json ./

# use ignore-scripts to avoid builting node modules like better-sqlite3
RUN pnpm install --frozen-lockfile --ignore-scripts
RUN npm rebuild --arch=x64 --platform=linux --libc=musl sharp   

# Copy the entire project
COPY . .

RUN pnpm run build

# run the app
EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]
