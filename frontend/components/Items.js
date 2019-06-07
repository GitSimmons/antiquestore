import gql from 'graphql-tag'
import { Card } from 'semantic-ui-react'
import Pagination from './Pagination'
import { perPage } from '../lib/config'
import { useQuery } from 'react-apollo-hooks'
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
  const { data, error, loading, refetch } = useQuery(ALL_ITEMS_QUERY, {
    variables: {
      skip: page * perPage - perPage
    }
  })
  if (loading) {
    return (
      <Card.Group centered stackable>
        {
          [...Array(perPage)].map((e, index) =>
            <ItemCard key={index} />
          )
        }
      </Card.Group>)
  }
  if (error) return <div> Error... </div>
  return (
        <>
          {/* <Pagination page={page} refetch={refetch} /> */}
          <Card.Group centered stackable>
            {data.items.map(
              (item) =>
                <ItemCard item={item} key={item.id} refetch={refetch} />
            )}
          </Card.Group>
          <Pagination page={page} refetch={refetch} />
        </>
  )
}

export default Items
