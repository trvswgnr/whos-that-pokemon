import Turnstone from 'turnstone'
import { pokemon } from '~/data/pokemon151'
import { isCloseMatch } from '~/lib'

const styles = {
  input: 'h-12 w-full border py-2 px-4 text-lg outline-none rounded',
  listbox: 'bg-neutral-900 w-full text-slate-50 rounded-md max-h-64 overflow-y-auto',
  highlightedItem: 'bg-neutral-800',
  query: 'text-oldsilver-800 placeholder:text-slate-400',
  typeahead: 'text-slate-500',
  clearButton: 'absolute inset-y-0 text-lg right-0 w-10 inline-flex items-center justify-center bg-netural-700 hover:text-red-500',
  noItems: 'cursor-default text-center my-20',
  match: 'font-semibold',
  groupHeading: 'px-5 py-3 text-pink-500'
}

const listbox = {
  displayField: 'pokemon',
  data: async (input: string) => {
    const results = pokemon.filter((pokemon) => {
      const name = pokemon.name.toLowerCase()
      const query = input.toLowerCase()
      return isCloseMatch(query, name) || name.includes(query)
    })
    return results
  }
  // searchType: 'startsWith'
}

const Item: React.FC<{ item: { id: number, name: string } }> = ({ item }) => {
  return (
    <div className="flex items-center cursor-pointer px-5 py-4">
      <p>{item.name}</p>
    </div>
  )
}

interface SearchBoxProps {
  onChange: (value: string) => void
}

export function SearchBox(props: SearchBoxProps) {
  const { onChange } = props

  return (
    <div className="relative h-12 w-full">
      <div className="absolute w-full">
        <Turnstone
          id="search"
          name="search"
          autoFocus={true}
          typeahead={true}
          clearButton={true}
          debounceWait={250}
          listboxIsImmutable={true}
          maxItems={6}
          noItemsMessage="No matches found."
          placeholder="Enter a Pokémon name"
          listbox={listbox}
          styles={styles}
          Item={Item}
          onChange={onChange}
        // plugins={[recentSearchesPlugin]}
        // text='Iron M'
        />
      </div>
    </div>
  )
}

