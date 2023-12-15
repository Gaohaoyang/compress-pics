import { readFiles } from './readFiles'
import promptSync from 'prompt-sync'
import fs from 'fs'
import path from 'path'
import tinify from 'tinify'

const prompt = promptSync()

const init = async () => {
  tinify.key = 'YC4RydXcYxwqH101nCY66L9LM0Yk53s7'

  const sizeBefore = getFileSizeInBytes('examples/images/coupon/Tntvip2023Zh.png')
  console.log(sizeBefore)
  const source = tinify.fromFile('examples/images/coupon/Tntvip2023Zh.png')
  await source.toFile('examples/images/coupon/Tntvip2023Zh.png')
  const sizeAfter = getFileSizeInBytes('examples/images/coupon/Tntvip2023Zh.png')
  console.log(sizeAfter)
  console.log('rate ', (sizeAfter - sizeBefore) / sizeBefore)

  // const folderPath = prompt('images folder path:', './examples/images')
  // let size = 0
  // let count = 0
  // walkSync(folderPath, (filePath: string, dirent) => {
  //   if (
  //     dirent.name.endsWith('.png') ||
  //     dirent.name.endsWith('.jpg') ||
  //     dirent.name.endsWith('.jpeg') ||
  //     dirent.name.endsWith('.gif') ||
  //     dirent.name.endsWith('.svg')
  //   ) {
  //     size += getFileSizeInBytes(filePath)
  //     count++
  //     console.log(filePath)
  //     // const source = tinify.fromFile(filePath)

  //     // source.toFile(filePath)
  //   }
  // })

  // console.log('count', count)
  // console.log('size', size)
  // console.log('size', (size / 1024 / 1024).toFixed(2) + 'MB')
}

const getFileSizeInBytes = (filename: string) => {
  var stats = fs.statSync(filename)
  var fileSizeInBytes = stats.size
  return fileSizeInBytes
}

const walkSync = (
  currentDirPath: string,
  callback: (filePath: string, dirent: fs.Dirent) => void
) => {
  fs.readdirSync(currentDirPath, { withFileTypes: true }).forEach((dirent) => {
    const filePath = path.join(currentDirPath, dirent.name)
    if (dirent.isFile()) {
      callback(filePath, dirent)
    } else if (dirent.isDirectory()) {
      walkSync(filePath, callback)
    }
  })
}

init()
