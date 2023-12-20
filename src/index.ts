import Table from 'cli-table'
import tinify from 'tinify'
import { getFolderPath } from './inputPath'
import { getAllPicFiles } from './getAllPicFilesPath'
import { brandAsciiCompressPics } from './brandAscii'
// import { pressAKeyToContinue } from './pressAKeyToContinue'

const init = async () => {
  // brandAsciiCompressPics()
  console.log()
  const { path } = await getFolderPath()
  console.log('Your images directory is:', path)

  const allPicFilesInfo = await getAllPicFiles(path)

  const table = new Table({
    style: {
      border: ['cyan'],
    },
  })
  table.push(
    ['Total count:', allPicFilesInfo.list.length + ''],
    ['Total size:', allPicFilesInfo.totalSizeMB + 'MB']
  )
  console.log(table.toString())

  // const { key } = await pressAKeyToContinue()
  // console.log('key', key)

  // console.log('allPicFilesInfo', allPicFilesInfo)

  // tinify.key = 'YC4RydXcYxwqH101nCY66L9LM0Yk53s7'

  // const sizeBefore = getFileSizeInBytes('examples/images/coupon/profile_header.png')
  // console.log(sizeBefore)
  // const source = tinify.fromFile('examples/images/coupon/profile_header.png')
  // await source.toFile('examples/images/coupon/profile_header.png')
  // const sizeAfter = getFileSizeInBytes('examples/images/coupon/profile_header.png')
  // console.log(sizeAfter)
  // console.log('rate ', (sizeBefore - sizeAfter) / sizeBefore)

  // ---
  // const folderPath = prompt('images folder path: ', './examples/images')
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

  // console.log('Total count: ', count)
  // console.log('Total size: ', (size / 1024 / 1024).toFixed(2) + 'MB')
}

init()
