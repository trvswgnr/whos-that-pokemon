import type { NextApiRequest, NextApiResponse } from 'next'

type Pokemon = {
  id: number
  name: string
  image: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pokemon>
) {
  const {
    id,
    name,
    image
  } = req.body
  return res.status(200).json({
    id,
    name,
    image
  })
}
