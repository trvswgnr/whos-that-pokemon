import { NextApiRequest, NextApiResponse } from 'next'
import { pokemon } from '~/data'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')

  const { id } = req.query

  const pokemonData = pokemon.find(p => p.id === Number(id))

  if (!pokemonData) {
    return res.status(404).json({
      error: 'Pokemon not found'
    })
  }

  res.status(200).json(pokemonData)
}
