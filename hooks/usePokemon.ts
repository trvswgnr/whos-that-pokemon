import { useCallback, useMemo, useState } from 'react'
import { fetchPokemon } from '~/lib'

interface UsePokemonResponse {
  data?: Pokemon
  next?: Pokemon
  error?: Error
  isValidating: boolean
  reset: () => Promise<void>
}

export function usePokemon(initialData?: Pokemon): UsePokemonResponse {
  const [data, setData] = useState<Pokemon|undefined>(undefined)
  const [error, setError] = useState<Error|undefined>(undefined)
  const [isValidating, setIsValidating] = useState(false)
  const [next, setNext] = useState<Pokemon|undefined>(initialData)

  const reset = useCallback(async () => {
    setIsValidating(true)
    try {
      setData(next)
      console.log('data', next?.name)
      const data = await fetchPokemon()
      setNext(data)
      console.log('next', data?.name)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsValidating(false)
    }
  }, [next])

  useMemo(() => reset(), [])

  return { data, next, isValidating, error, reset }
}
