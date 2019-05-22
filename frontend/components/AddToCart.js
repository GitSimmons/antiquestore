import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from 'semantic-ui-react'
import { TOGGLE_CART_MUTATION } from './Cart.js'
import { CURRENT_USER_QUERY } from './User.js'

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart (id: $id) {
      id
      item {
        id
        title
        price
        image
        description
      }
    }
}
`

const AddToCart = ({ id, item }) => {
  const update = (store, payload) => {
    const data = store.readQuery({ query: CURRENT_USER_QUERY })
    data.currentUser.cart.push(payload.data.addToCart)
    store.writeQuery({
      query: CURRENT_USER_QUERY,
      data
    })
  }
  return (
    <Mutation
      mutation={ADD_TO_CART_MUTATION}
      variables={{ id }}
      update={update}
      optimisticResponse={{
        __typename: 'Mutation',
        addToCart: {
          __typename: 'CartItem',
          id: id,
          item: {
            __typename: 'Item',
            id: id,
            title: item.title,
            price: item.price,
            description: item.description,
            image: item.image
          }
        } }}
      // refetchQueries={['CURRENT_USER_QUERY']}
    >
      {addToCartMutation =>
        <Button circular icon='cart' floated='right' onClick={addToCartMutation} />
      }
    </Mutation>

  )
}

export default AddToCart
