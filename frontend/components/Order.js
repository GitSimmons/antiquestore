import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Head from 'next/head'
import styled from 'styled-components'
import { Breadcrumb, Grid, Header, Icon, Image, Segment, Table } from 'semantic-ui-react'
import { convertToCurrency } from '../lib/utils'

const StyledOrderItemImage = styled(Image)`
margin: auto;
padding: 0px;
height: 5rem !important;
width: 5rem !important;
object-fit: cover;
`

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      user {
        id
        name
      }
      id
      items {
        title
        description
        image
        price
      }
      total
      charge
    }
  }
`
export default (props) => {
  const singleOrder = useQuery(SINGLE_ORDER_QUERY, { variables: { id: props.id } })
  const { data: { order }, error, loading } = singleOrder
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error! {error.message}</div>
  }
  console.log(order)
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Section link>Your Account</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section link>Your Orders </Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>Order Details</Breadcrumb.Section>
      </Breadcrumb>
      <Header as='h1'>
    Order Details
        <Header.Subheader>
    Ordered on March 10, 2019 | Order ID:  {order.id}
        </Header.Subheader>
      </Header>
      <Segment>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <ul style={{ listStyle: 'none', padding: '0px' }}>
                <li><strong>{order.user.name}</strong></li>
                <li>1234 Fake Street</li>
                <li>Fake city, Province, C4N 4D4</li>
                <li>Canada</li>
              </ul>
            </Grid.Column>
            <Grid.Column>
              <ul style={{ listStyle: 'none', padding: '0px' }}>
                <li><strong>Payment Method</strong></li>
                <li><Icon size='large' name='stripe' color='blue' />Stripe</li>
                <li><strong>Charge ID:</strong> </li>
                <li>{order.charge}</li>
              </ul>  </Grid.Column>
            <Grid.Column>
              <ul style={{ listStyle: 'none', padding: '0px' }}>
                <li><strong>Order Summary</strong></li>
                <li>Item(s) Total: CDN$ 28.10</li>
                <li>Shipping & Handling: CDN$ 0.00</li>
                <li><strong>Grand Total: CDN$ {convertToCurrency(order.total)}</strong></li>
              </ul>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment>
        <Header as='h3'>Delivered uhhh... sometime</Header>
        <Table basic='very' unstackable>
          <Table.Body>
            {order.items.map(item =>
              <Table.Row>
                <Table.Cell ><StyledOrderItemImage circular src={item.image} /></Table.Cell>
                <Table.Cell>
                  <ul style={{ listStyle: 'none', padding: '0px' }}>
                    <li><strong>{item.title}</strong></li>
                    <li>{item.description}</li>
                    <li style={{ color: 'firebrick' }}>CDN: {convertToCurrency(item.price)}</li>
                  </ul>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Segment>
    </div>
  )
}
