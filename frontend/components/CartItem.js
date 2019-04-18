import { Content, Header, Menu, Icon, Item, Image, Table } from 'semantic-ui-react'
import styled from 'styled-components'
import Router from 'next/router'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import { ConvertToCurrency } from '../lib/utils'
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
  console.log(payload)
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
  return (
    <Table.Row >
      <Table.Cell onClick={handleClick}>
        <Image src={cartItem.item.image} size='tiny' />
      </Table.Cell>
      <Table.Cell onClick={handleClick}>
        <Header>
          {cartItem.item.title}
        </Header>
      </Table.Cell>
      <Table.Cell>
        <Item.Meta>
          {ConvertToCurrency(cartItem.item.price)}
        </Item.Meta>
      </Table.Cell>
      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id: cartItem.id }}
        update={update}
        optimisticResponse={{
          __typename: 'Mutation',
          removeFromCart: {
            __typename: 'CartItem',
            id: cartItem.id
          }
        }}
      >
        {removeFromCartMutation => {
          return (
            <Table.Cell>
              <Icon name='close' onClick={removeFromCartMutation} />
            </Table.Cell>)
        }}
      </Mutation>
    </Table.Row>
  )
}

export default CartItem
