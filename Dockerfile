FROM ghcr.io/puppeteer/puppeteer:20.8.0

# WORKDIR shouldn't be used in Docker actions,
# though it's probably set by puppeteer image
# so we need to reset it here
WORKDIR /github/workspace/

# Install NPM dependencies
COPY package.json ./
RUN npm install --verbose

COPY . .

ENTRYPOINT ["node", "lib/main.js"]
