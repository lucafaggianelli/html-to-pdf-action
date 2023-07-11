FROM ghcr.io/puppeteer/puppeteer:20.8.0

LABEL MAINTAINER="Xudong Cai <fifsky@gmail.com>"

WORKDIR /home/pptruser

COPY package.json .
RUN npm install

COPY . .

ENTRYPOINT ["node", "lib/main.js"]
