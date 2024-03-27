import tinify from 'tinify'
import { getFolderPath } from './inputPath'
import { getAllPicFiles, PicFile } from './getAllPicFilesPath'
import { brandAsciiCompressPics } from './brandAscii'
import inquirer from 'inquirer'
import terminalLink from 'terminal-link'
import { cyan, bold, green } from 'colorette'

let path = ''
let size = 0
let sizeAfter = 0

const init = async () => {
  brandAsciiCompressPics()
  console.log()
  path = (await getFolderPath()).path
  console.log('Your images directory is:', path)

  const allPicFilesInfo = await getAllPicFiles(path)
  size = allPicFilesInfo.totalSize
  await compressPicsList(allPicFilesInfo.list)
}

const compressPicsList = async (list: PicFile[], startIndex = 0) => {
  const link = terminalLink('Tiny.com API', 'https://tinify.com/dashboard/api')
  const answers = await inquirer.prompt([
    {
      name: 'tinypngApi',
      message: `Please input a valid tinypng api key to continue ( You can find it at ${link} ): `,
    },
  ])
  tinify.key = answers.tinypngApi

  for (let i = startIndex; i < list.length; i++) {
    console.log('processing: ', i + 1, '/', list.length, list[i].filePath)
    try {
      await tinify.fromFile(list[i].filePath).toFile(list[i].filePath)
      // last one
      if (i === list.length - 1) {
        brandAsciiCompressPics({
          text: 'Finished',
          font: 'Standard',
        })
        const allPicFilesInfoAfter = await getAllPicFiles(path)
        sizeAfter = allPicFilesInfoAfter.totalSize
        console.log(
          green('================================================================================')
        )
        console.log(
          bold(
            cyan(
              `The total size has decreased by ${(((size - sizeAfter) / size) * 100).toFixed(
                2
              )}% after compression.`
            )
          )
        )
      }
    } catch (err) {
      // https://tinypng.com/developers/reference/nodejs#error-handling
      if (err instanceof tinify.AccountError) {
        console.log('The error message is: ' + err.message)
        compressPicsList(list, i)
      }
      break
    }
  }
}

init()
