import gql from 'graphql-tag'
import { Breadcrumb, Button, Container, Divider, Grid, Header, Icon, Image, Segment } from 'semantic-ui-react'
import { useQuery } from 'react-apollo-hooks'
import AddToCart from './AddToCart'
import { convertToCurrency } from '../lib/utils'
import { ImageCarousel } from './Carousel/ImageCarousel'

const SINGLE_ITEM_QUERY = gql`
  query SingleItem($id: ID!) {
    item(where:{id: $id}) {
      title
      description
      images
      image
      id
      price
    }
  }
`

const SingleItem = props => {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, { variables: { id: props.id } })
  if (loading) return null
  if (error) return `Error!: ${error}`

  const mainImageIndex = data.item.images.indexOf(data.item.image) || 0
  return (
    <Container style={{ paddingBottom: '3rem' }}>
      <Breadcrumb style={{ padding: '1rem 0 1rem 0' }}>
        <Breadcrumb.Section link>Culture</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section link>Medium</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>Item Details</Breadcrumb.Section>
      </Breadcrumb>

      <Grid columns={2} stackable reversed='tablet mobile' doubling >
        <Grid.Column>
          <Segment>
            <Header as='h1'>{data.item.title}
              <span style={{ color: 'grey', fontSize: '1rem', fontFamily: 'sans-serif', fontWeight: '400' }}>1828–38</span>
              <Header.Subheader >Probably decorated by <a href='#'>Thomas Tucker</a></Header.Subheader>
            </Header>
            <Divider />
            <Header as='h3'>Description </Header>
            <p> {data.item.description}</p>
            <ul>
              <li>
                Decorator:Probably decorated by Thomas Tucker (1812–1890)
              </li>
              <li>
                Manufacturer:Tucker Factory (1826–1838)
              </li>
              <li>
                Date:1828–38
              </li>
              <li>
                Geography:Made in Philadelphia, Pennsylvania, United States
              </li>
              <li>
                Culture:American
              </li>
              <li>
                Medium:Porcelain
              </li>
              <li>
                Dimensions:H. 14 1/4 in. (36.2 cm)
              </li>
              <li>
                Classification:Ceramics
              </li>
              <li>
                Price: {convertToCurrency(data.item.price)}
              </li>
            </ul>
            <AddToCart id={data.item.id} item={data.item}>
              <Button primary><Icon name='shopping cart' /> Add to Cart</Button>
            </AddToCart>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <ImageCarousel initialIndex={mainImageIndex}>
            {data.item.images.map((img, index) => <img height='75px' key={index} src={img} />)}
          </ImageCarousel>
        </Grid.Column>
      </Grid>
    </Container>
  )
}
export default SingleItem
