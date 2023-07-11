import { convertHtmlToPdf } from './pdf-exporter.js'

console.log('CWD is', process.cwd())
console.log('GH workspace is', process.env.GITHUB_WORKSPACE)

const getInput = (name) => process.env[`INPUT_${name.toUpperCase()}`]

async function run() {
  const htmlFile = getInput('htmlFile')
  const outputFile = getInput('outputFile')
  const pdfOptions = getInput('pdfOptions')
  const baseUrl = getInput('baseUrl')

  console.log(`Start convert ${htmlFile} to PDF`)

  try {
    await convertHtmlToPdf({
      pdfOptions: pdfOptions ? JSON.parse(pdfOptions) : {},
      htmlFile,
      outputFile,
      baseUrl,
    })

    console.log('PDF Generate DONE:', outputFile)
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}

run()
