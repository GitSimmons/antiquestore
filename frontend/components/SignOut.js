import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'

const SIGNOUT_MUTATION = gql`
mutation SignOut {
  signOut {
    message
  }
}
`
const SignOutButton = ({ children }) => {
  return (
    <> <Mutation
      mutation={SIGNOUT_MUTATION}
      refetchQueries={['CURRENT_USER_QUERY']}
    >
      {signOut =>
        children(signOut)
      }
    </Mutation>

    </>
  )
}

export default SignOutButton
