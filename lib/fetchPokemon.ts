import pokemon from '~/data/pokemon151'

async function fetchPokemon(): Promise<Pokemon> {
  const randomPokemonId = Math.floor(Math.random() * 151) + 1
  const pokemonData = pokemon.find(p => p.id === randomPokemonId)

  if (!pokemonData) {
    throw new Error('Pokemon not found')
  }

  const { id, name } = pokemonData

  return {
    id,
    name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`
  }
}

export { fetchPokemon }
