FROM ghcr.io/puppeteer/puppeteer:20.8.0

LABEL MAINTAINER="Xudong Cai <fifsky@gmail.com>"

ENTRYPOINT ["node", "/lib/main.js"]

COPY . .

RUN npm install --production
