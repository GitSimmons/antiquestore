import { Content, Header, Menu, Icon, Item, Image, Table } from 'semantic-ui-react'
import { ConvertToCurrency } from '../lib/utils'
import styled from 'styled-components'
import Router from 'next/router'

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
        <Header size='m'>
          {cartItem.item.title}
        </Header>
      </Table.Cell>
      <Table.Cell>
        <Item.Meta>
          {ConvertToCurrency(cartItem.item.price)}
        </Item.Meta>
      </Table.Cell>
      <Table.Cell>
        <Icon name='close' />
      </Table.Cell>
    </Table.Row>
  )
}

export default CartItem
