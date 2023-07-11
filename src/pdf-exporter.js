import path from 'path'

import puppeteer from 'puppeteer'
import express from 'express'

/**
 *
 * @param {object} options
 * @param {string} options.htmlFile
 * @param {string} options.outputFile
 * @param {object} options.pdfOptions
 * @param {string} options.baseUrl
 *
 */
export const convertHtmlToPdf = async (options) => {
  const server = express()
    .use(express.static(path.join(process.cwd(), options.baseUrl || '')))
    .listen(3000)

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome-stable',
    args: [
      // mandatory to run as root
      '--no-sandbox',
      '--headless',
      '--disable-gpu',
      '--font-render-hinting=none',
    ],
    // Show console logs in the terminal
    dumpio: true,
    headless: 'new',
  })
  const page = await browser.newPage()

  const url = `http://localhost:3000/${options.htmlFile}`

  // Open then HTML page and wait to be fully loaded
  await page.goto(url, {
    waitUntil: 'networkidle0',
  })

  // Generate the PDF
  await page.pdf({
    ...options.pdfOptions,
    path: options.outputFile,
  })

  // Close the browser and the server
  await browser.close()
  server.close()
}
