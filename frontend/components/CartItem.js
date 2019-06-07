import { Header, Icon, Item, Image, Table } from 'semantic-ui-react'
import Router from 'next/router'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { useMutation } from 'react-apollo-hooks'
import { convertToCurrency } from '../lib/utils'
import { CURRENT_USER_QUERY } from './User'

const REMOVE_FROM_CART_MUTATION = gql`
mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
  removeFromCart(id: $id) {
    id
  }
}
`
const update = (store, payload) => {
  const data = store.readQuery({ query: CURRENT_USER_QUERY })
  const { id } = payload.data.removeFromCart
  data.currentUser.cart = data.currentUser.cart.filter((cartItem) => cartItem.id !== id)
  store.writeQuery({
    query: CURRENT_USER_QUERY,
    data
  })
}

const CartItem = ({ cartItem }) => {
  const handleClick = () => {
    Router.push(`/item?id=${cartItem.item.id}`)
  }
  const removeFromCart = useMutation(REMOVE_FROM_CART_MUTATION,
    { variables: { id: cartItem.id },
      update,
      optimisticResponse: {
        __typename: 'Mutation',
        removeFromCart: {
          __typename: 'CartItem',
          id: cartItem.id
        }
      }
    }
  )

  return (
    <Table.Row>
      <Table.Cell onClick={handleClick}>
        <Image src={cartItem.item ? cartItem.item.image : '/static/image.png'} size='tiny' />
      </Table.Cell>
      <Table.Cell onClick={handleClick}>
        <Header>
          {cartItem.item ? cartItem.item.title : 'This item no longer exists.'}
        </Header>
      </Table.Cell>
      <Table.Cell>
        <Item.Meta>
          {convertToCurrency(cartItem.item ? cartItem.item.price : 0)}
        </Item.Meta>
      </Table.Cell>
      <Table.Cell>
        <a>
          <Icon name='close' onClick={removeFromCart} />
        </a>
      </Table.Cell>
    </Table.Row>
  )
}

export default CartItem
