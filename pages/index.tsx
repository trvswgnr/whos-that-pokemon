import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import { isCloseMatch } from '../lib/compareStrings'
import Container from '../components/Container'
import colors from 'tailwindcss/colors'
import SearchBox from '../components/SearchBox'
import { DarkModeToggle } from '../components/DarkModeToggle'

// this page will be custom, not through plasmic (the route must not exist in plasmic)
export default function Home({ pokemon, error }: { pokemon: Pokemon | false, error: string }) {
  const [submitted, setSubmitted] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)

  if (!pokemon) {
    throw new Error(error || 'There was an error fetching the pokemon')
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

  function Results(): JSX.Element | null {
    if (!submitted) {
      return null
    }

    return (
      <>
        <h2 className={`mt-4 text-xl ${isCorrect ? 'text-green-400' : 'text-red-600'}`}>{isCorrect ? 'Correct!' : 'Incorrect!'}</h2>
        <h2 className="text-2xl font-bold my-4 dark:text-white">{name}</h2>
        <button onClick={() => window.location.reload()} className="underline mt-4 mb-10 hover:opacity-60 dark:text-white">Next →</button>
      </>
    )
  }

  return (
    <>
      <div className="bg-white dark:bg-slate-800 min-h-screen">
        <Container className="text-center">
          <h1 className="text-4xl pt-10 pb-5 font-black dark:text-white">{'Who\'s that Pokémon?'}</h1>
          <div>
            <div className="mb-4">
              <canvas ref={canvasRef} width={475} height={475} className="aspect-square lg:aspect-video w-full h-full object-contain"></canvas>
            </div>
            { !submitted ?
              <div className="flex justify-center items-center max-w-xl mx-auto">
                <div className="w-full mr-4">
                  <SearchBox onChange={(value: string) => setNameInput(value)} />
                </div>
                <button onClick={judge} className="h-12 w-28 text-white rounded bg-cyan-500 hover:bg-cyan-600 transition-colors">Guess!</button>
              </div> :
              <Results />
            }
          </div>
        </Container>
      </div>
      <footer className="pt-10 pb-12 bg-slate-300 border-t border-slate-400 dark:bg-slate-900 dark:border-slate-700">
        <Container className="text-center">
          <div className="flex justify-center mb-5">
            <DarkModeToggle />
          </div>
          <p className="text-sm dark:text-white">Made with 💜 by <a href="https://github.com/trvswgnr" className="underline hover:opacity-60">Travis Aaron Wagner</a></p>
        </Container>
      </footer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
  // res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=59'
  // )
  const randomPokemonId = Math.floor(Math.random() * 151) + 1
  let error = ''
  let pokemon: Pokemon | false = await fetch('https://pokeapi.co/api/v2/pokemon/' + randomPokemonId)
    .then((res) => res.json())
    .catch((err: Error) => {
      error = err.message
      throw new Error('Error fetching pokemon with ID: ' + randomPokemonId + '. ' + err.message)
    })

  if (error) {
    pokemon = false
  }

  return {
    props: {
      pokemon,
      error
    }
  }
}
