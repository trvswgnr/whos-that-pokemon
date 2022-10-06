async function fetchPokemon(): Promise<Pokemon> {
  const randomPokemonId = Math.floor(Math.random() * 151) + 1
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + randomPokemonId)
  const data: Pokemon = await res.json()
  return data
}

export { fetchPokemon }
