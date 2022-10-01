import { useState, useEffect } from 'react'
import { Button } from './Button'

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')

    if (!savedMode) {
      const isDarkMode = window?.matchMedia('(prefers-color-scheme: dark)')?.matches
      setDarkMode(isDarkMode)
    }

    if (savedMode) {
      setDarkMode(savedMode === 'true')
    }
  }, [])

  const toggleMode = () => {
    setDarkMode(!darkMode)
    localStorage.setItem('darkMode', String(!darkMode))
  }

  return { darkMode, toggleMode }
}

export const DarkModeToggle = () => {
  const { darkMode, toggleMode } = useDarkMode()

  useEffect(() => {
    const root = document.body
    if (darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <Button
      className="flex items-center justify-center text-2xl h-12 w-12 text-black dark:text-white
      !bg-gray-100 border-2 border-gray-300 dark:bg-white hover:bg-gray-200 dark:hover:bg-opacity-90"
      onClick={toggleMode}
    >
      {darkMode ? '🌞' : '🌚'}
    </Button>
  )
}

export default DarkModeToggle
