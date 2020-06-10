import { useState } from 'react'
import { Search } from 'semantic-ui-react'
import { debounce, convertToCurrency } from '../lib/utils'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import AddToCart from './AddToCart'

const SEARCH_ITEMS_QUERY = gql`
query SEARCH_ITEMS_QUERY($searchQuery: String) {
  items(where: {
    title_contains: $searchQuery
# Match the description as well with: 
#    OR: [
#      {title_contains: $searchQuery}, {description_contains: $searchQuery}
#    ]
  }) {
    id
    image
    title
    price
    description
  }
}
`
const SearchBar = ({ callbackFn }) => {
  const [isLoading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [value, setValue] = useState('')

  const resetSearch = () => {
    setLoading(false)
    setResults([])
    setValue('')
  }
  const handleResultSelect = (e, { result }) => {
    setValue(result.title)
    callbackFn(result)
    // Router.push(`/item?id=${result.id}`)
  }

  const handleSearchChange = debounce(async (e, client) => {
    e.persist()
    setLoading(true)
    setValue(e.target.value)
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: {
        searchQuery: e.target.value
      }
    })
    // Convert price from number to string to keep Search happy
    for (let item of res.data.items) {
      item.price = item.price.toString()
    }
    setResults(res.data.items)
    setLoading(false)
  }, 300, true)
  const resultRenderer = ({ title, image, price }) => <><p>{title}</p><span>{convertToCurrency(price)}</span></>
  return (
    <ApolloConsumer>
      {client => (
        <Search
          loading={isLoading}
          onResultSelect={handleResultSelect}
          resultRenderer={resultRenderer}
          onSearchChange={(e) => handleSearchChange(e, client)}
          results={results}
          value={value}
        />)
      }
    </ApolloConsumer>
  )
}

export default SearchBar
