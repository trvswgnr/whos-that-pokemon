import * as fs from 'fs'
import request, { RequestCallback } from 'request'
import { NextApiRequest, NextApiResponse } from 'next'
import { pokemon } from '~/data'

// function downloadImage(uri: string, filename: string, callback: RequestCallback) {
//   request.head(uri, () => {
//     // console.log('content-type:', res.headers['content-type'])
//     // console.log('content-length:', res.headers['content-length'])

//     request(uri).pipe(fs.createWriteStream(filename)).on('close', callback)
//   })
// }

// rewrite downloadImage to use promises
function downloadImage(uri: string, filename: string) {
  return new Promise((resolve, reject) => {
    request.head(uri, (err, res) => {

      // check for errors
      if (res.statusCode !== 200) {
        reject(new Error(`Error downloading image: ${uri}`))
      }

      request(uri).pipe(fs.createWriteStream(filename)).on('close', resolve)
    })
  })
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const failed = []
  const succeeded = []

  for (const poke of pokemon) {
    const { id, image } = poke
    const filename = `public/images/png/${id}.png`
    try {
      await downloadImage(image, filename)
      succeeded.push(filename)
    } catch (err) {
      failed.push(image)
    }
  }

  res.status(200).json({
    message: `${succeeded.length}/${pokemon.length} images downloaded.`,
    failed,
    succeeded
  })
}
