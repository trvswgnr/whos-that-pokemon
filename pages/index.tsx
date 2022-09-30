import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { default as NextImage } from 'next/image'
import { useEffect, useState } from 'react'
import { isCloseMatch } from '../lib/compareStrings'
import Canvas, { type DrawProps } from '../components/Canvas'

// this page will be custom, not through plasmic (the route must not exist in plasmic)
export default function Home({ pokemon, error }: {pokemon: Pokemon | false, error: string}) {
  const [ submitted, setSubmitted ] = useState(false)
  const [ nameInput, setNameInput ] = useState('')
  const [ isCorrect, setIsCorrect ] = useState(false)

  if (!pokemon) {
    throw new Error(error || 'There was an error fetching the pokemon')
  }

  const name = pokemon.name.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const id = pokemon.id
  const sprites = pokemon.sprites.other

  if (!sprites) {
    throw new Error('No sprites found for pokemon with ID: ' + id)
  }

  const image: string = sprites['official-artwork'].front_default

  function judge() {
    const guess = nameInput.toLowerCase()
    const answer = name.toLowerCase()
    const isCorrect = isCloseMatch(guess, answer, 0.85)
    setIsCorrect(isCorrect)
    setSubmitted(true)
  }

  // useEffect(() => {
  //   const canvas = document.getElementById('canvas-005') as HTMLCanvasElement
  //   const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  //   const img = new Image()   // Create new img element
  //   img.addEventListener('load', function() {
  //     // Uncomment to hang in there
  //     canvas.height = img.height
  //     canvas.width = img.width
  //     ctx.filter = submitted ? 'brightness(1)' : 'brightness(0)'
  //     ctx.drawImage(img,0,0)
  //   //  console.log("It Loaded !");
  //   }, false)
  //   img.src = image
  // }, [image, submitted])

  const draw = ({ context, canvas }: DrawProps) => {
    context.filter = submitted ? 'brightness(1)' : 'brightness(0)'
    const img = new Image()
    img.src = image

    img.onload = () => {
      canvas.height = img.height
      canvas.width = img.width
    }

    context.drawImage(img, 0, 0)
  }

  return (
    <div>
      <h1>{'Who\'s that Pokémon?'}</h1>
      <div>
        <Canvas draw={draw} width={300} height={300} />
        {/* <NextImage src={image} alt={name} width={400} height={400} style={style}/> */}
        {submitted && <h2>{name}</h2>}
        <div>
          <input type="text" onChange={(e) => setNameInput(e.target.value)}/>
          <button onClick={judge}>Guess</button>
        </div>
        {
          submitted &&
          <h2 style={{ color: isCorrect ? 'green' : 'red' }}>{isCorrect ? 'Correct!' : 'Incorrect!'}</h2>
        }
        {submitted && <button onClick={() => window.location.reload()}>Next</button>}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
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
