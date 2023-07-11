FROM ghcr.io/puppeteer/puppeteer:20.8.0

WORKDIR /home/pptruser

COPY package.json .
COPY package-lock.json .
RUN npm install --verbose

COPY . .

ENTRYPOINT ["node", "lib/main.js"]
