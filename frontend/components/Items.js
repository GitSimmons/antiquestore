import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const GET_ALL_ITEMS = gql`
  query {
    items {
      id
      title
    }
  }
`
const Items = () => (
  <Query query={GET_ALL_ITEMS}>
    {({ loading, error, data }) => {
      if (loading) return <div> Loading... </div>
      if (error) return <div> Error... </div>
      return (
        <div>{data.items.map((item) => <li key={item.id}>{item.title} ... {item.id}</li>)}</div>
      )
    }}
  </Query>
)

export default Items
