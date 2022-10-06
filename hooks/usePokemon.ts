import { useCallback, useEffect, useState } from 'react'
import { fetchPokemon } from '~/lib'
import { sharedFetchHook } from '~/lib'

interface UsePokemonResponse {
  data?: Pokemon,
  error?: Error,
  isValidating: boolean,
  reset: () => Promise<void>
}

export function usePokemon(): UsePokemonResponse {
  const [data, setData] = useState<Pokemon|undefined>(undefined)
  const [error, setError] = useState<Error|undefined>(undefined)
  const [isValidating, setIsValidating] = useState(false)

  const reset = useCallback(async () => {
    setIsValidating(true)
    try {
      const data = await fetchPokemon()
      setData(data)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsValidating(false)
    }
  }, [])

  useEffect(() => {
    reset()
  }, [reset])

  return { data, isValidating, error, reset }
}

/**
 * rewrite usePokemon to use sharedHook
 */
export const usePokemonShared = sharedFetchHook(fetchPokemon)