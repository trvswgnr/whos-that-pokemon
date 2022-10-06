import { useCallback, useEffect, useMemo, useState } from 'react'

export class SharedData<T> {
  listeners: CallableFunction[] = []
  value: T

  constructor(target: T) {
    this.value = target
  }

  get() {
    return this.value
  }

  set(newValue: T) {
    if (this.value === newValue) return
    this.value = newValue
    this.listeners.forEach((l) => l(this.value))
  }

  subscribe(listenerFunc: CallableFunction) {
    this.listeners.push(listenerFunc)
    return () => this.unsubscribe(listenerFunc)
  }

  unsubscribe(listenerFunc: CallableFunction) {
    this.listeners = this.listeners.filter((l) => l !== listenerFunc)
  }
}

/**
 * Create a reusable hook that can be used in any component
 */
export function sharedHook<T>(initialValue: T) {
  const observable = new SharedData(initialValue)

  const useObservable: () => [T, (newValue: T) => void] = () => {
    const [value, setValue] = useState(observable.get())

    useEffect(() => {
      return observable.subscribe(setValue)
    }, [])

    const actions = useMemo(() => {
      return {
        set: (newValue: T) => observable.set(newValue),
        reset: () => observable.set(initialValue)
      }
    }, [])

    return [value, actions.set]
  }

  return useObservable
}

/**
 * Create a reusable hook that can be used in any component for fetching remote data. It should use the SharedData class.
 * @returns [data, error, isValidating, reset]
 */
export function sharedFetchHook<T>(fetcher: () => Promise<T>) {
  const observable = new SharedData<T | undefined>(undefined)

  const useObservable: () => [T | undefined, Error | undefined, boolean, () => Promise<void>] = () => {
    const [data, setData] = useState<T | undefined>(observable.get())
    const [error, setError] = useState<Error | undefined>(undefined)
    const [isValidating, setIsValidating] = useState(false)

    const reset = useCallback(async () => {
      setIsValidating(true)
      try {
        const data = await fetcher()
        setData(data)
      } catch (error) {
        setError(error as Error)
      } finally {
        setIsValidating(false)
      }
    }, [])

    useEffect(() => {
      return observable.subscribe(setData)
    }, [])

    useEffect(() => {
      reset()
    }, [reset])

    return [data, error, isValidating, reset]
  }

  return useObservable
}

