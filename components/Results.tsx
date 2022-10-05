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
      <h2 className={`mt-4 text-5xl p-4 font-bold font-display text-stroke text-stroke-white ${isCorrect ? 'text-green-400' : 'text-poke-red'}`}>{isCorrect ? 'Ya! It\'s' : 'No! It\'s'}</h2>
      <h1 className="text-display text-9xl uppercase">{name}</h1>
      <button onClick={onClick} className="underline mt-4 hover:opacity-60 dark:text-white pb-8">Next →</button>
    </>
  )
}
