import { gql } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'
import { Card, Image, Button } from 'semantic-ui-react'
import Router from 'next/router'
import { ConvertToCurrency } from '../lib/utils'
import Pagination from './Pagination'
import { perPage } from '../lib/config'
import AddToCart from './AddToCart'

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY(
    $skip: Int = 0
    $first: Int = ${perPage}
    ) {
    items(
      orderBy: createdAt_DESC
      first: $first
      skip: $skip
      ) {
      id
      title
      description
      price
      image
    }
  }
`
const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`

const Items = (props) => {
  const page = parseFloat(props.page)
  return (
  <>
    <Query query={ALL_ITEMS_QUERY}
      variables={{ skip: page * perPage - perPage }}>
      {({ loading, error, data, refetch }) => {
        if (loading) return <div> Loading... </div>
        if (error) return <div> Error... </div>
        return (
        <>
          <Pagination page={page} refetch={refetch} />
          <Card.Group centered stackable>
            {data.items.map(
              (item) =>
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
                        <Button negative circular icon='trash' floated='right'
                          onClick={async () => {
                            await deleteItem()
                            refetch()
                          }} />
                        <Button primary circular icon='pencil' floated='right' onClick={() => Router.push(`/edit?id=${item.id}`)} />
                      </Card.Content>
                    </Card>}
                </Mutation>
            )}
          </Card.Group>
          <Pagination page={page} refetch={refetch} />

        </>
        )
      }}
    </Query>
  </>
  )
}

export default Items
