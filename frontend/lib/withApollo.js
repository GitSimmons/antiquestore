import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-client'
import { LOCAL_STATE_QUERY } from '../components/Cart'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

const endpoint = `http://localhost:4445`

const link = new HttpLink({
  uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
  credentials: 'include'
})
const cache = new InMemoryCache()

function createClient ({ headers }) {
  const middlewareLink = setContext(() => ({
    headers
  }))

  return new ApolloClient({
    link: middlewareLink.concat(link),
    cache,
    resolvers: {
      Mutation: {
        toggleCart: async (parent, args, { cache }, info) => {
          const { cartOpen } = await cache.readQuery({ query: LOCAL_STATE_QUERY })
          await cache.writeData({ data: {
            cartOpen: !cartOpen
          } })
          return !cartOpen
        }
      }
    }
  })
}

cache.writeData({
  data: {
    cartOpen: false
  }
})

export default withApollo(createClient)
