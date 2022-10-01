import { type MouseEventHandler } from 'react'

interface ResultsProps{
  isCorrect: boolean
  name: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function Results(props: ResultsProps) {
  const { isCorrect, name, onClick } = props

  return (
    <>
      <h2 className={`mt-4 text-xl ${isCorrect ? 'text-green-400' : 'text-red-600'}`}>{isCorrect ? 'Correct!' : 'Incorrect!'}</h2>
      <h2 className="text-2xl font-bold my-4 dark:text-white">{name}</h2>
      <button onClick={onClick} className="underline mt-4 mb-10 hover:opacity-60 dark:text-white">Next →</button>
    </>
  )
}
