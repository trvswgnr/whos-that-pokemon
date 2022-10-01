import { useEffect, useRef, useState, type MouseEventHandler } from 'react'
import colors from 'tailwindcss/colors'
import { isCloseMatch } from '../lib/compareStrings'
import Results from './Results'
import Guess from './Guess'

interface GameProps {
  pokemon: Pokemon
  error?: Error
  reset: MouseEventHandler<HTMLButtonElement> | (() => void)
}

export default function Game(props: GameProps) {
  const { pokemon, error, reset } = props
  const [submitted, setSubmitted] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)

  if (!pokemon) {
    throw new Error(error ? error.message : 'Error fetching pokémon.')
  }

  const name = pokemon.name.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const id = pokemon.id
  const sprites = pokemon.sprites.other


  if (!sprites) {
    throw new Error('No sprites found for pokemon with ID: ' + id)
  }

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    const canvas = canvasRef.current
    const image: string = sprites['official-artwork'].front_default

    const img = new Image()
    img.src = image

    img.onload = () => {
      canvas.height = img.height
      canvas.width = img.width
      const context = canvas.getContext('2d')!
      draw(context, canvas, img)
    }

    function draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) {
      const dArr = [-1, -1, 0, -1, 1, -1, -1, 0, 1, 0, -1, 1, 0, 1, 1, 1] // offset array
      const strokeWidth = 4
      const x = 0
      const y = 0

      // draw images at offsets from the array scaled by strokeWidth
      for (let i = 0; i < dArr.length; i += 2) {
        ctx.drawImage(img, x + dArr[i] * strokeWidth, y + dArr[i + 1] * strokeWidth)
      }

      let strokeColor: string = colors.white

      if (submitted) {
        strokeColor = isCorrect ? colors.green['400'] : colors.red['600']
      }

      // fill with color
      ctx.globalCompositeOperation = 'source-in'
      ctx.fillStyle = strokeColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // draw original image in normal mode
      ctx.globalCompositeOperation = 'source-over'

      const filter = submitted ? 'brightness(1)' : 'brightness(0)'

      ctx.filter = filter
      ctx.drawImage(img, x, y)
    }
  }, [submitted, isCorrect, sprites])

  function judge() {
    const guess = nameInput.toLowerCase()
    const answer = name.toLowerCase()
    const isCorrect = isCloseMatch(guess, answer, 0.85)
    setIsCorrect(isCorrect)
    setSubmitted(true)
  }

  return (
    <>
      <div className="mb-4">
        <canvas ref={canvasRef} width={475} height={475} className="aspect-square lg:aspect-video w-full h-full object-contain"></canvas>
      </div>
      {
        submitted
          ? <Results {...{ isCorrect, name }} onClick={reset} />
          : <Guess onChange={(e) => setNameInput(e)} onClick={judge} />
      }
    </>
  )
}
