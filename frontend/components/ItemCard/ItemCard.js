import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Button, Card, Image, Modal, Header, Icon } from 'semantic-ui-react'
import { ConvertToCurrency } from '../../lib/utils'
import AddToCart from '../AddToCart'
import UpdateItem from '../UpdateItem'

const DELETE_ITEM_MUTATION = gql`
mutation DELETE_ITEM_MUTATION($id: ID!) {
  deleteItem(id: $id) {
    id
  }
}
`
const ItemCard = ({ item, refetch }) => {
  return (
    <Mutation
      mutation={DELETE_ITEM_MUTATION}
      key={item.id}
      refetchQueries={[
        'ALL_ITEMS_QUERY',
        'PAGINATION_QUERY']}
      variables={{ id: item.id }}
    >
      {deleteItem =>
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
            <Modal
              basic
              closeIcon
              dimmer='blurring'
              size='small'
              trigger={
                <Button negative circular icon='trash' floated='right' />
              }
            >
              <Header icon='trash' content='Delete Item' />
              <Modal.Content>
                <p>
            Are you sure you want to delete {item.title} ?
                </p>
              </Modal.Content>
              <Modal.Actions >
                <Button basic color='red' inverted>
                  <Icon name='remove' /> No
                </Button>
                <Button color='green' inverted onClick={async () => {
                  await deleteItem()
                  refetch()
                }}>
                  <Icon name='checkmark' /> Yes
                </Button>
              </Modal.Actions>
            </Modal>
            <Modal trigger={<Button primary circular icon='pencil' floated='right' />} dimmer='blurring'>
              <Modal.Header>{item.title}</Modal.Header>
              <Modal.Content image>
                <Image wrapped size='medium' src={item.image} />
                <UpdateItem id={item.id} />
              </Modal.Content>
            </Modal>
          </Card.Content>
        </Card>}
    </Mutation>
  )
}

export default ItemCard
