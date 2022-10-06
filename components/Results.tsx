import { type MouseEventHandler } from 'react'

interface ResultsProps {
  isCorrect: boolean
  name: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export function Results(props: ResultsProps) {
  const { isCorrect, name, onClick } = props
  const formattedName = name.replace(/-f$/i, '♀').replace(/-m$/i, '♂')
  return (
    <>
      <h2 className={`-mt-4 text-5xl p-4 font-bold font-display text-stroke text-stroke-white ${isCorrect ? 'text-green-500' : 'text-poke-red'}`}>{isCorrect ? 'Ya! It\'s' : 'No! It\'s'}</h2>
      <h2 className="text-display text-7xl md:text-9xl uppercase">{formattedName}</h2>
      <button onClick={onClick} className="text-sm py-2 px-3 rounded bg-white hover:opacity-80 mt-7 mb-8">Next →</button>
    </>
  )
}
