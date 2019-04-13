import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      id
      email
      name
      permissions
      cart {
        id
      }
    }
  }
`

const User = (props) => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {({ loading, error, data, refetch }) => {
      return (
        <>
          {props.children(data)}
        </>
      )
    }
    }
  </Query>
)

export default User
export { CURRENT_USER_QUERY }
