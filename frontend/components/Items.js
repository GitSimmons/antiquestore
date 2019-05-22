import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Card } from 'semantic-ui-react'
import Pagination from './Pagination'
import { perPage } from '../lib/config'

import ItemCard from './ItemCard/ItemCard'

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
                <ItemCard item={item} key={item.id} refetch={refetch} />
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
