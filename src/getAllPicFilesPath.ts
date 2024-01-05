import fs from 'fs'
import path from 'path'
import Table from 'cli-table'
import { bold, cyan } from 'colorette'

interface PicFilesInfo {
  list: PicFile[]
  totalSize: number
  totalSizeMB: string
}

export interface PicFile {
  filePath: string
  size: number
}

export const getAllPicFiles: (path: string) => Promise<PicFilesInfo> = async (path: string) => {
  let canBeCompressedPicTotalSize = 0
  let cannotBeCompressedPicFilesTotalSize = 0
  // const allPicFiles: PicFile[] = []
  const canBeCompressedPicFiles: PicFile[] = []
  const cannotBeCompressedPicFiles: PicFile[] = []
  await walkSync(path, (filePath: string, dirent) => {
    if (
      dirent.name.endsWith('.png') ||
      dirent.name.endsWith('.jpg') ||
      dirent.name.endsWith('.jpeg')
    ) {
      let size = getFileSizeInBytes(filePath)
      canBeCompressedPicFiles.push({
        filePath,
        size,
      })
      canBeCompressedPicTotalSize += size
    }

    if (dirent.name.endsWith('.gif') || dirent.name.endsWith('.svg')) {
      let size = getFileSizeInBytes(filePath)
      cannotBeCompressedPicFiles.push({
        filePath,
        size,
      })
      cannotBeCompressedPicFilesTotalSize += size
    }
  })

  const canBeCompressedPicTotalSizeMB = (canBeCompressedPicTotalSize / 1024 / 1024).toFixed(2)
  const cannotBeCompressedPicFilesTotalSizeMB = (
    cannotBeCompressedPicFilesTotalSize /
    1024 /
    1024
  ).toFixed(2)

  const table = new Table({
    style: {
      border: ['cyan'],
      head: ['yellow'],
    },
    head: ['', 'Count', 'Size(MB)', 'Size(Bytes)'],
  })

  table.push(
    {
      canBeCompressedPicFiles: [
        String(canBeCompressedPicFiles.length),
        canBeCompressedPicTotalSizeMB,
        String(canBeCompressedPicTotalSize),
      ],
    },
    {
      cannotBeCompressedPicFiles: [
        String(cannotBeCompressedPicFiles.length),
        cannotBeCompressedPicFilesTotalSizeMB,
        String(cannotBeCompressedPicFilesTotalSize),
      ],
    }
  )

  console.log(table.toString())
  console.log('Notice: Gif and svg files cannot be compressed.')
  console.log(
    bold(cyan('Total size(MB):')),
    bold(
      cyan(
        ((canBeCompressedPicTotalSize + cannotBeCompressedPicFilesTotalSize) / 1024 / 1024).toFixed(
          2
        ) + 'MB'
      )
    )
  )
  console.log(
    cyan('Total size(Bytes):'),
    cyan(canBeCompressedPicTotalSize + cannotBeCompressedPicFilesTotalSize)
  )

  return {
    list: canBeCompressedPicFiles,
    totalSize: canBeCompressedPicTotalSize,
    totalSizeMB: canBeCompressedPicTotalSizeMB,
  }
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

const getFileSizeInBytes = (filename: string) => {
  var stats = fs.statSync(filename)
  var fileSizeInBytes = stats.size
  return fileSizeInBytes
}
