import React, { useState } from 'react'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { ConvertToCurrency } from '../lib/utils'

const Cart = () => {
  const [visible, setVisible] = useState(true)

  const handleHideClick = () => setVisible(false)
  const handleShowClick = () => setVisible(true)
  const handleSidebarHide = () => setVisible(false)
  // some fake data
  const items = ['Item 1', 'Item 2']
  const total = 2000

  return (
    <Sidebar
      as={Menu}
      animation='overlay'
      icon='labeled'
      inverted
      onHide={handleSidebarHide}
      vertical
      visible={visible}
      width='thin'
      direction='right'
    >
      <Menu.Item as='a' onClick={handleHideClick}>
        <Icon name='close icon' />

      </Menu.Item>
      <Menu.Item>
        <p> You have {items.length} items in your cart</p>
      </Menu.Item>
      <Menu.Item>
        {items.map(item => <p><a href='#'>{item}</a></p>)}

      </Menu.Item>
      <Menu.Item >
              Your total is {ConvertToCurrency(total)}
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='shopping cart' />
              Checkout
      </Menu.Item>
    </Sidebar>)
}
export default Cart
