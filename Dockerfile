FROM ghcr.io/puppeteer/puppeteer:20.8.0

# WORKDIR and USER shouldn't be used in Docker actions,
# though they're set by puppeteer image
# so we need to reset them here
USER root
WORKDIR /github/workspace/

# Install NPM dependencies
COPY package.json /html-to-pdf-action/
RUN npm install -g --verbose --prefix /html-to-pdf-action/

COPY src /html-to-pdf-action/src

ENTRYPOINT ["node", "/html-to-pdf-action/src/main.js"]
