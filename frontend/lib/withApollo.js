import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'
import { LOCAL_STATE_QUERY } from '../components/Cart'
const endpoint = `http://localhost:4445`

function createClient ({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers
      })
    },
    clientState: {
      defaults: {
        cartOpen: false
      },
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
    }
  })
}

export default withApollo(createClient)
