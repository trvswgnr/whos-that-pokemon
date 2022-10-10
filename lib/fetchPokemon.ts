import { pokemon } from '~/data/pokemon151'

async function fetchPokemon(): Promise<Pokemon> {
  const randomPokemonId = Math.floor(Math.random() * 151) + 1

  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://whos-that-pokemon-alpha.vercel.app'

  const response = await fetch(`${baseUrl}/api/pokemon/${randomPokemonId}`)

  const data = await response.json()

  if (data.error) {
    throw new Error(data.error)
  }

  if (!data) {
    throw new Error('Pokemon not found')
  }

  return data
}

export { fetchPokemon }
