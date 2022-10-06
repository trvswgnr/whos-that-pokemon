import { Game } from '~/components'
import { usePokemon } from '~/hooks'
import Image from 'next/image'

export function Main() {
  const { data, error, reset, isValidating } = usePokemon()

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
    <Game {...{ pokemon: data, error, reset }} />
  )
}
