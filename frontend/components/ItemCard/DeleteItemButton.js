import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const DELETE_ITEM_MUTATION = gql`
mutation DELETE_ITEM_MUTATION($id: ID!) {
  deleteItem(id: $id) {
    id
  }
}
`

const DeleteItemButton = ({ item, refetch }) => {
  const deleteItem = useMutation(DELETE_ITEM_MUTATION,
    {
      refetchQueries: [
        'ALL_ITEMS_QUERY',
        'PAGINATION_QUERY'],
      variables: {
        id: item.id
      }
    }
  )
  return (
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
  )
}

export default DeleteItemButton
