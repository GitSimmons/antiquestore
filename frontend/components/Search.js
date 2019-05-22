import { useState } from 'react'
import { Input, Search } from 'semantic-ui-react'
import { debounce, ConvertToCurrency } from '../lib/utils'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import Router from 'next/router'
import AddToCart from './AddToCart'
import { runInContext } from 'vm'

const SEARCH_ITEMS_QUERY = gql`
query SEARCH_ITEMS_QUERY($searchQuery: String) {
  items(where: {
    OR: [
      {title_contains: $searchQuery}, {description_contains: $searchQuery}
    ]
  }) {
    id
    image
    title
    price
    description
  }
}
`
const SearchBar = (props) => {
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
    Router.push(`/item?id=${result.id}`)
  }
  const handleSearchChange = async (e, client) => {
    e.persist()
    setLoading(true)
    setValue(e.target.value)
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: {
        searchQuery: e.target.value
      }
    })
    setResults(res.data.items)
    setLoading(false)
    // setTimeout(() => {
    //   if (value.length < 1) return resetSearch()
    //   const re = value
    //   const isMatch = result => re.test(result.title)
    //   setLoading(false)
    //   setResults((prevResults) => prevResults.filter(isMatch))
    // }, 500)
  }
  const resultRenderer = ({ title, image, price }) => <><p>{title}</p><span>{ConvertToCurrency(price)}</span></>
  return (
    <ApolloConsumer>
      {client => (
        <Search
          loading={isLoading}
          onResultSelect={handleResultSelect}
          resultRenderer={resultRenderer}
          // onSearchChange={debounce(handleSearchChange, 20)}
          onSearchChange={(e) => handleSearchChange(e, client)}
          results={results}
          value={value}
          {...props}
          // input={{ icon: 'search', iconPosition: 'left' }}
        />)
      }
    </ApolloConsumer>
  )
}

export default SearchBar
