import fs from 'fs'
import path from 'path'

interface PicFilesInfo {
  list: PicFile[]
  totalSize: number
  totalSizeMB: string
}

interface PicFile {
  filePath: string
  size: number
}

export const getAllPicFiles: (path: string) => Promise<PicFilesInfo> = async (path: string) => {
  let totalSize = 0
  const allPicFiles: PicFile[] = []
  await walkSync(path, (filePath: string, dirent) => {
    if (
      dirent.name.endsWith('.png') ||
      dirent.name.endsWith('.jpg') ||
      dirent.name.endsWith('.jpeg') ||
      dirent.name.endsWith('.gif') ||
      dirent.name.endsWith('.svg')
    ) {
      let size = getFileSizeInBytes(filePath)
      allPicFiles.push({
        filePath,
        size,
      })
      totalSize += size
    }
  })

  return {
    list: allPicFiles,
    totalSize,
    totalSizeMB: (totalSize / 1024 / 1024).toFixed(2),
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
