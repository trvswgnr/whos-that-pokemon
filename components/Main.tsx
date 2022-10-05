import useSWR, { SWRResponse } from 'swr'
import { Game } from '~/components'
import { fetchPokemon } from '../lib'

export function Main() {
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
