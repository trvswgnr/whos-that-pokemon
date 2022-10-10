import ffmpeg from 'fluent-ffmpeg'
import { NextApiRequest, NextApiResponse } from 'next'
import { pokemon } from '~/data'
import * as fs from 'fs'
import path from 'path'

function getFileNames(dirPath: string) {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        reject(err)
      }
      resolve(files)
    })
  })
}

// rewrite convertImage to use promises
function convertImage(input: string, output: string) {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(input)
      .on('end', resolve)
      .on('error', reject)
      .saveToFile(output)
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let filenames: string[] = []
  try {
    filenames = await getFileNames(path.join(process.cwd(), 'public/images/png'))
    filenames = filenames?.length ? filenames.sort((a, b) => Number(a.slice(0, -4)) - Number(b.slice(0, -4))) : []
  } catch (err) {
    return res.status(500).json({
      message: 'Error reading directory',
      error: err
    })
  }

  const failed = []
  const succeeded = []

  for (const filename of filenames) {
    const id = Number(filename.slice(0, -4))
    const output = `public/images/webp/${id}.webp`
    try {
      await convertImage(`${path.join(process.cwd(), 'public/images/png')}/${filename}`, output)
      succeeded.push(output)
    } catch (err) {
      failed.push(filename)
    }
  }

  res.status(200).json({
    message: `${succeeded.length}/${filenames.length} images converted.`,
    failed,
    succeeded
  })
}
