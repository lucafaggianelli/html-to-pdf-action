FROM ghcr.io/puppeteer/puppeteer:20.8.0

# Install NPM dependencies
COPY package.json ./
RUN npm install --verbose

COPY . .

ENTRYPOINT ["node", "lib/main.js"]
