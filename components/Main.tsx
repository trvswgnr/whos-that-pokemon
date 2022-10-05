import useSWR, { SWRResponse } from 'swr'
import Game from './Game'
import fetchPokemon from '../lib/fetchPokemon'

export default function Main() {
  const { data, error, mutate, isValidating }: SWRResponse<Pokemon, Error> = useSWR('fetchPokemon', fetchPokemon)

  if (error) {
    return (
      <div className="text-red-500">Failed to load pokémon.</div>
    )
  }

  if (!data || isValidating) {
    return (
      <div className="">Loading...</div>
    )
  }

  return (
    <Game {...{ pokemon: data, error, reset: mutate }} />
  )
}
