FROM ghcr.io/puppeteer/puppeteer:20.8.0

# WORKDIR and USER shouldn't be used in Docker actions,
# though they're set by puppeteer image
# so we need to reset them here
USER root
WORKDIR /html-to-pdf-action/

# Install NPM dependencies
COPY package*.json ./
RUN npm install

COPY src ./src

ENTRYPOINT ["node", "/html-to-pdf-action/src/main.js"]
