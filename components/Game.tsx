import { useEffect, useRef, useState, type MouseEventHandler } from 'react'
import colors from 'tailwindcss/colors'
import { isCloseMatch } from '~/lib'
import { Results, Guess } from '~/components'
import { useStreak } from '~/hooks'

interface GameProps {
  pokemon: Pokemon
  error?: Error
  reset: MouseEventHandler<HTMLButtonElement> | (() => void)
}

interface DrawProps {
  canvas: HTMLCanvasElement
  image: HTMLImageElement
}

interface DrawStrokeProps extends DrawProps {
  width: number
  color: string
}

interface DrawFillProps extends DrawProps {
  color: string | CanvasGradient | CanvasPattern
}

export function Game(props: GameProps) {
  const { pokemon, error, reset } = props

  const [submitted, setSubmitted] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)

  if (!pokemon) {
    throw new Error(error ? error.message : 'Error fetching pokémon.')
  }

  const name = pokemon.name.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  const canvasStrokeRef = useRef<HTMLCanvasElement>(null)
  const canvasFillRef = useRef<HTMLCanvasElement>(null)

  const [streak, setStreak] = useStreak()

  useEffect(() => {
    if (!canvasStrokeRef.current || !canvasFillRef.current) {
      return
    }
    const canvasStroke = canvasStrokeRef.current
    const canvasFill = canvasFillRef.current
    const image: string = pokemon.image

    const img = new Image()

    img.onload = () => {
      canvasStroke.height = img.height
      canvasStroke.width = img.width
      canvasFill.height = img.height
      canvasFill.width = img.width

      let strokeColor: string = colors.white
      let fillColor: string = colors.black

      if (submitted) {
        strokeColor = isCorrect ? colors.green['400'] : colors.red['600']
        fillColor = colors.transparent
      }

      drawStroke({
        canvas:canvasStroke,
        image: img,
        width: 3,
        color: strokeColor
      })

      drawFill({
        canvas: canvasFill,
        image: img,
        color: fillColor
      })
    }
    img.src = image

    /**
     * Uses the image data to draw a stroke on the canvas
     */
    function drawStroke(props: DrawStrokeProps) {
      const { canvas, image, color, width } = props
      const context = canvas.getContext('2d')!

      context.shadowColor = color
      context.shadowBlur = 0

      // X offset loop
      for (let x = -width; x <= width; x++) {
        // Y offset loop
        for (let y = -width; y <= width; y++) {
          // set shadow offset
          context.shadowOffsetX = x
          context.shadowOffsetY = y

          // draw image with shadow
          context.drawImage(image, 0, 0, canvas.width, canvas.height)
        }
      }
    }

    function drawFill(props: DrawFillProps) {
      const { canvas, image, color } = props
      const context = canvas.getContext('2d')!

      // fill image
      context.fillStyle = color
      context.fillRect(0, 0, canvas.width, canvas.height)

      // draw image
      context.globalCompositeOperation = 'destination-in'
      context.drawImage(image, 0, 0)
    }
  }, [submitted, isCorrect, pokemon.image])

  function judge() {
    const guess = nameInput.toLowerCase()
    const answer = name.toLowerCase()
    const isCorrect = isCloseMatch(guess, answer, 0.85)

    if (isCorrect) {
      setStreak(streak + 1)
    } else {
      setStreak(0)
    }

    setIsCorrect(isCorrect)
    setSubmitted(true)
  }

  return (
    <>
      <div className="mb-4 relative aspect-square sm:aspect-video max-w-screen-sm mx-auto">
        <canvas ref={canvasStrokeRef} width={475} height={475} className="absolute w-full h-full object-contain"></canvas>
        <canvas ref={canvasFillRef} width={475} height={475} className="absolute w-full h-full object-contain "></canvas>
      </div>
      {
        submitted
          ? <Results {...{ isCorrect, name }} onClick={reset} />
          : <Guess onChange={setNameInput} onClick={judge} />
      }
    </>
  )
}
