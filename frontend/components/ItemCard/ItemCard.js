import { Button, Card, Image } from 'semantic-ui-react'
import { convertToCurrency } from '../../lib/utils'
import AddToCart from '../AddToCart'
import UpdateItemButton from './UpdateItemButton'
import DeleteItemButton from './DeleteItemButton'

const ItemCard = ({ item, refetch }) => {
  if (!item) {
    return (
      <Card>
        <Image src='/static/image.png' />
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
    <Card key={item.id}>
      {item.image
        ? <Image src={item.image} />
        : <Image src='/static/image.png' />}
      <Card.Content>
        <Card.Header>{item.title}</Card.Header>
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
