import { Mutation } from 'react-apollo'
import { useMutation } from 'react-apollo-hooks'
import { Button, Card, Image, Modal, Header, Icon } from 'semantic-ui-react'
import { ConvertToCurrency } from '../../lib/utils'
import AddToCart from '../AddToCart'
import UpdateItemButton from './UpdateItemButton'
import DeleteItemButton from './DeleteItemButton'

const ItemCard = ({ item, refetch }) => {
  return (
    <Card key={item.id}>
      {item.image
        ? <Image src={item.image} />
        : <Image src='/static/image.png' />}
      <Card.Content>
        <Card.Header>{item.title}</Card.Header>
        {item.price > 0 && <Card.Meta> <span>{ConvertToCurrency(item.price)}</span></Card.Meta>}
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
