import { gql } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import { ConvertToCurrency } from '../lib/utils'

const GET_ALL_ITEMS = gql`
  query GetAllItems {
    items {
      id
      title
      description
      price
      image
    }
  }
`
const DELETE_ITEM = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      id
      title
    }
  }
`
const Items = () => (
  <Query query={GET_ALL_ITEMS}>
    {({ loading, error, data }) => {
      if (loading) return <div> Loading... </div>
      if (error) return <div> Error... </div>
      return (
        <>
          <Card.Group centered stackable>
            {data.items.map(
              (item) =>
                <Mutation
                  mutation={DELETE_ITEM}
                  key={item.id}
                  refetchQueries={['GetAllItems']}>
                  {deleteItem =>
                    <Card key={item.id}>
                      {item.image
                        ? <Image src={item.image} />
                        : <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />}
                      <Card.Content>
                        <Card.Header>{item.title}</Card.Header>
                        {item.price && <Card.Meta> <span>{ConvertToCurrency(item.price)}</span></Card.Meta>}
                        {item.description && <Card.Description>{item.description}</Card.Description>}
                      </Card.Content>
                      <Card.Content extra>
                        <Button negative circular icon='trash' floated='right' onClick={() => deleteItem({ variables: { id: item.id } })} />
                      </Card.Content>
                    </Card>}
                </Mutation>
            )}
          </Card.Group>
        </>
      )
    }}
  </Query>
)

export default Items
