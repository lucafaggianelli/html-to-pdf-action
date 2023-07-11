FROM ghcr.io/puppeteer/puppeteer:20.8.0

# WORKDIR and USER shouldn't be used in Docker actions,
# though they're set by puppeteer image
# so we need to reset them here
USER root
WORKDIR /github/workspace/

# Install NPM dependencies
COPY package.json ./
RUN npm install --verbose

COPY . .

ENTRYPOINT ["node", "lib/main.js"]
