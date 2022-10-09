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
  const [data, setData] = useState<Pokemon|undefined>(initialData)
  const [error, setError] = useState<Error|undefined>(undefined)
  const [isValidating, setIsValidating] = useState(false)
  const [next, setNext] = useState<Pokemon|undefined>(undefined)

  const reset = useCallback(async () => {
    setIsValidating(true)
    try {
      setData(next)
      const data = await fetchPokemon()
      setNext(data)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsValidating(false)
    }
  }, [next])

  // set the initial data for next
  useMemo(async () => {
    try {
      const next = await fetchPokemon()
      setNext(next)
    } catch (error) {
      setError(error as Error)
    }
  }, [])

  return { data, next, isValidating, error, reset }
}
