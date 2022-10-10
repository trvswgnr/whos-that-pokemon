import { NextApiRequest, NextApiResponse } from 'next'
import { pokemon } from '~/data'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    pokemon,
    count: pokemon.length,
    timestamp: new Date().toISOString()
  })
}
