import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Button } from 'semantic-ui-react'
import { TOGGLE_CART_MUTATION } from './Cart.js'

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart (id: $id) {
      id
    }
}
`

const AddToCart = ({ id }) => {
  return (
    <Mutation
      mutation={ADD_TO_CART_MUTATION}
      variables={{ id }}
      refetchQueries={['CURRENT_USER_QUERY']}
    >
      {addToCartMutation =>
        <Button negative circular icon='cart' floated='right' onClick={addToCartMutation} />
      }
    </Mutation>

  )
}

export default AddToCart
