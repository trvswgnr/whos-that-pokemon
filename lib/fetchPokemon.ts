import { GetServerSidePropsContext } from 'next'
import { getBaseUrl } from './util'

async function fetchPokemon(req?: GetServerSidePropsContext['req']) {
  // get random pokemon id between 1 and 151
  const randomPokemonId = Math.floor(Math.random() * 151) + 1

  const baseUrl = getBaseUrl(req)

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
