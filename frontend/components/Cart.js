import { Icon, Menu, Sidebar, Table } from 'semantic-ui-react'
import { ConvertToCurrency } from '../lib/utils'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import CartItem from './CartItem'
import User from './User'
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
  return (
    <User>
      {({ currentUser }) => {
        return (
          <Query query={LOCAL_STATE_QUERY}>
            {({ data: { cartOpen } }) =>
              <Mutation mutation={TOGGLE_CART_MUTATION}>
                {toggleCartMutation =>
                  <Sidebar
                    as={Menu}
                    animation='overlay'
                    vertical
                    visible={cartOpen}
                    // onHide={toggleCartMutation}
                    width='wide'
                    direction='right'
                    icon='labeled'
                  >
                    <Menu.Item onClick={toggleCartMutation}>
                      <Icon name='close' />
                    </Menu.Item>
                    <Menu.Item>
                      { currentUser && <p> You have {currentUser.cart.length} item{currentUser.cart.length === 1 ? ''
                        : 's'} in your cart</p>}
                    </Menu.Item>
                    <Menu.Menu>
                      <Table unstackable basic='very'>
                        <Table.Body>
                          {currentUser && currentUser.cart.map(
                            cartItem =>
                              <CartItem cartItem={cartItem} key={cartItem.id} />
                          )}
                        </Table.Body>
                      </Table>
                    </Menu.Menu>
                    <Menu.Item >
                      Your total is {ConvertToCurrency(
                        currentUser && currentUser.cart.reduce((accumulator, currentValue) => {
                          if (!currentValue) {
                            return accumulator
                          }
                          return accumulator + currentValue.item.price
                        }, 0))}
                    </Menu.Item>
                    <Menu.Item as='a'>
                      <Icon name='shopping cart' />Checkout
                    </Menu.Item>
                  </Sidebar>
                }</Mutation>
            }
          </Query>)
      }}
    </User>
  )
}
export default Cart
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION }
