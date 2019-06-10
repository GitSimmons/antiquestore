import { Button, Card, Image } from 'semantic-ui-react'
import { convertToCurrency } from '../../lib/utils'
import AddToCart from '../AddToCart'
import UpdateItemButton from './UpdateItemButton'
import DeleteItemButton from './DeleteItemButton'
import Router from 'next/router'
import styled from 'styled-components'

const StyledImage = styled(Image)`
  height: 200px !important;
  object-fit: cover;
  
  @media (max-width: 767px) {
    height: auto!important;
    object-fit: fill;
  }
`
const ItemCard = ({ item, refetch }) => {
  const routeToItemPage = (id) => {
    Router.push(`/item?id=${id}`)
  }
  if (!item) {
    return (
      <Card style={{ maxWidth: '90vw' }}>
        <StyledImage src='/static/image.png' />
        <Card.Content>
          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Card.Content>
        <Card.Content extra>
          <Button circular icon='cart' floated='right' disabled />
          <Button circular icon='trash' floated='right' disabled />
          <Button circular icon='pencil' floated='right' disabled />
        </Card.Content>
      </Card>)
  }
  return (
    <Card style={{ maxWidth: '90vw' }}key={item.id}>
      {item.image
        ? <StyledImage fluid src={item.image} onClick={(e) => routeToItemPage(item.id)} />
        : <StyledImage src='/static/image.png' />}
      <Card.Content>
        <Card.Header onClick={(e) => routeToItemPage(item.id)}>{item.title}</Card.Header>
        {item.price > 0 && <Card.Meta> <span>{convertToCurrency(item.price)}</span></Card.Meta>}
        {item.description && <Card.Description>{item.description}</Card.Description>}
      </Card.Content>
      <Card.Content extra>
        <AddToCart id={item.id} item={item} />
        <DeleteItemButton item={item} refetch={refetch} />
        <UpdateItemButton item={item} />
      </Card.Content>
    </Card>
  )
}

export default ItemCard
