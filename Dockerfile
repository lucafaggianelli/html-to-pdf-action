FROM ghcr.io/puppeteer/puppeteer:20.8.0

LABEL MAINTAINER="Xudong Cai <fifsky@gmail.com>"

COPY . .

RUN npm install --omit=dev

ENTRYPOINT ["node", "lib/main.js"]
