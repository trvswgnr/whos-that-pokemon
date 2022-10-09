import { useCallback, useMemo, useState } from 'react'

export class SharedData<T> {
  listeners: CallableFunction[] = []
  value: T

  constructor(data: T) {
    this.value = data
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

  hook() {
    const useSharedData: () => [T, (newValue: T) => void] = () => {
      const [value, setValue] = useState(this.get())

      useMemo(() =>  this.subscribe(setValue), [])

      return [
        value,
        useCallback((newValue: T) => this.set(newValue), [])
      ]
    }

    return useSharedData
  }
}
