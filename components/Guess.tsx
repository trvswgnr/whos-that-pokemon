import SearchBox from '../components/SearchBox'

interface GuessProps {
  onChange: (value: string) => void
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Guess(props: GuessProps) {
  const { onChange, onClick } = props
  return (
    <div className="flex justify-center items-center max-w-xl mx-auto">
      <div className="w-full mr-4">
        <SearchBox onChange={onChange} />
      </div>
      <button onClick={onClick} className="h-12 w-28 text-white rounded bg-cyan-500 hover:bg-cyan-600 transition-colors">Guess!</button>
    </div>
  )
}
