import tinify from 'tinify'
import { getFolderPath } from './inputPath'
import { getAllPicFiles, PicFile } from './getAllPicFilesPath'
import { brandAsciiCompressPics } from './brandAscii'
import inquirer from 'inquirer'

let path = ''

const init = async () => {
  brandAsciiCompressPics()
  console.log()
  path = (await getFolderPath()).path
  console.log('Your images directory is:', path)

  const allPicFilesInfo = await getAllPicFiles(path)

  await compressPicsList(allPicFilesInfo.list)
}

const compressPicsList = async (list: PicFile[], startIndex = 0) => {
  const answers = await inquirer.prompt([
    {
      name: 'tinypngApi',
      message:
        'Please input a valid tinypng api key to continue ( You can find at https://tinify.com/dashboard/api ): ',
    },
  ])
  tinify.key = answers.tinypngApi

  for (let i = startIndex; i < list.length; i++) {
    console.log('processing: ', i + 1, '/', list.length, list[i].filePath)
    try {
      await tinify.fromFile(list[i].filePath).toFile(list[i].filePath)
      // last one
      if (i === list.length - 1) {
        console.log('Finished!')
        await getAllPicFiles(path)
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
