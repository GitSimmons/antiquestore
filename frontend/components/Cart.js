import React, { useState } from 'react'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { ConvertToCurrency } from '../lib/utils'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const LOCAL_STATE_QUERY = gql`
 query {
   cartOpen @client
 }
`
const TOGGLE_CART_MUTATION = gql`
  mutation toggleCartMutation {
  toggleCart @client
}
`
const Cart = () => {
  // some fake data
  const items = ['Item 1', 'Item 2']
  const total = 2000

  return (
    <Query query={LOCAL_STATE_QUERY}>
      {({ data: { cartOpen } }) =>
        <Mutation mutation={TOGGLE_CART_MUTATION}>
          {toggleCartMutation =>
            <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              inverted
              vertical
              visible={cartOpen}
              onHide={toggleCartMutation}
              width='thin'
              direction='right'
            >

              <Menu.Item as='a' onClick={toggleCartMutation}>
                <Icon name='close' />
              </Menu.Item>}

              <Menu.Item>
                <p> You have {items.length} items in your cart</p>
              </Menu.Item>
              <Menu.Item>
                {items.map(item => <p key={item}><a href='#'>{item}</a></p>)}

              </Menu.Item>
              <Menu.Item >
              Your total is {ConvertToCurrency(total)}
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='shopping cart' />
              Checkout
              </Menu.Item>
            </Sidebar>
          }</Mutation>
      }
    </Query>
  )
}
export default Cart
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION }
