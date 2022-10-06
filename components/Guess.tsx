import { useState } from 'react'
import { SearchBox } from '~/components'

interface GuessProps {
  onChange: (value: string) => void
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function Guess(props: GuessProps) {
  const { onChange, onClick } = props
  const [val, setVal] = useState('')
  let hoverClasses = 'opacity-60'
  if (val) {
    hoverClasses = 'hover:!scale-110 hover:rotate-6 hover:opacity-90'
  }
  return (
    <div className="flex justify-center items-center max-w-xl mx-auto pb-16">
      <div className="w-full mr-4">
        <SearchBox onChange={(e) => {
          onChange(e)
          setVal(e)
        }} />
      </div>
      <button onClick={(e) => {
        if (val) {
          onClick(e)
        }
      }} className={`text-display text-5xl !scale-100 tracking-normal ${hoverClasses}`}>Guess!</button>
    </div>
  )
}
