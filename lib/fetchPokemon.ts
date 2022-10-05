function fetchPokemon() {
  const randomPokemonId = Math.floor(Math.random() * 151) + 1
  return fetch('https://pokeapi.co/api/v2/pokemon/' + randomPokemonId).then((res: Response) => res.json())
}

export { fetchPokemon }
