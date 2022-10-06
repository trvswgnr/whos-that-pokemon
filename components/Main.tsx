import { Game } from '~/components'
import { usePokemon } from '~/hooks'
import Image from 'next/image'
import { useState } from 'react'

interface MainProps {
  pokemon: Pokemon
}

export function Main(props: MainProps) {
  let { pokemon: initialPokemon } = props
  const { data: pokemon, error, reset, isValidating } = usePokemon()
  const [data, setData] = useState<Pokemon|undefined>(initialPokemon)

  if (error) {
    return (
      <>
        <div className="mb-4 relative max-w-[100px] sm:max-w-[150px] m-auto">
          <Image src="/missingno.webp" alt="Missingno" width={500} height={1167} layout="responsive" />
        </div>
        <p className="text-red-500">Error loading pokémon.</p>
      </>
    )
  }

  if (!data || isValidating) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <Game {...{ pokemon: data, error }} reset={() => {
      reset()
      setData(pokemon)
    }} />
  )
}
