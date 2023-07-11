import path from 'path'

import puppeteer from 'puppeteer'
import express from 'express'

/**
 *
 * @param {object} options
 * @param {string} options.htmlFile
 * @param {string} options.outputFile
 * @param {object} options.pdfOptions
 * @param {object} options.launchOptions
 * @param {string} options.baseUrl
 *
 */
export const convertHtmlToPdf = async (options) => {
  const server = express()
    .use(express.static(path.join(process.cwd(), options.baseUrl || '')))
    .listen(3000)

  const browser = await puppeteer.launch({
    ...options.launchOptions,
    headless: 'new',
  })
  const page = await browser.newPage()
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
  )

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
