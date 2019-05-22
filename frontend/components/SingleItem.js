import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const SINGLE_ITEM_QUERY = gql`
  query SingleItem($id: ID!) {
    item(where:{id: $id}) {
      title
      description
    }
  }
`
const SingleItem = props => (
  <Query
    query={SINGLE_ITEM_QUERY}
    variables={{ id: props.id }}
  >
    {({ data, error, loading }) => {
      if (loading) return null
      if (error) return `Error!: ${error}`
      return (
        <div>
          <h3>{data.item.title}</h3>
          <span>{data.item.description}</span>
        </div>
      )
    }}
  </Query>
)
export default SingleItem
