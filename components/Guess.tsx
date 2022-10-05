import SearchBox from '../components/SearchBox'

interface GuessProps {
  onChange: (value: string) => void
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Guess(props: GuessProps) {
  const { onChange, onClick } = props
  return (
    <div className="flex justify-center items-center max-w-xl mx-auto pb-16">
      <div className="w-full mr-4">
        <SearchBox onChange={onChange} />
      </div>
      <button onClick={onClick} className="text-display text-5xl hover:opacity-90 !scale-100 hover:!scale-110 tracking-normal hover:rotate-6">Guess!</button>
    </div>
  )
}
