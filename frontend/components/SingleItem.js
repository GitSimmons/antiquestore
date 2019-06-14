import gql from 'graphql-tag'
import { Breadcrumb, Button, Container, Divider, Grid, Header, Icon, Image, Segment } from 'semantic-ui-react'
import { useQuery } from 'react-apollo-hooks'
import { useState } from 'react'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'
import AddToCart from './AddToCart'
import { convertToCurrency } from '../lib/utils'
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
  const [currentImage, setCurrentImage] = useState('0')
  const [inProp, setInProp] = useState(true)

  const StyledImageThumbnail = styled(Image)`
  transition: opacity 0.3s ease;
  opacity: ${props => props.index.toString() === currentImage.toString() ? 1 : 0.6};
  :hover {
    opacity: 1;
  }
  `
  const FadingDiv = styled.div`
  transition: 1s;
  /* Hidden init state */
  opacity: 0;
  &.enter,
  &.entered {
    /* Animate in state */
    opacity: 1;
  };
  &.exited {
    opacity: 0.5;
  };
  &.exiting {
    /* Animate out state */
    opacity: 0;
  };
`

  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, { variables: { id: props.id } })
  if (loading) return null
  if (error) return `Error!: ${error}`

  const handleClick = async (index) => {
    setInProp(false)
    await setTimeout(() => setInProp(true), 0)
    setCurrentImage(index)
  }

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
        <Grid.Column doubling>
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
          <div style={{ backgroundColor: 'ivory', minWidth: '500px', display: 'flex', flexDirection: 'column', placeItems: 'center center', padding: '1rem' }}>
            <div style={{ display: 'flex', placeItems: 'center center', height: '750px' }} >
              <Transition in={inProp} timeout={0}>
                {state =>
                  <FadingDiv className={state} >
                    <Image src={data.item.images[currentImage]} />
                    <div style={{ width: '100%', fontFamily: 'sans-serif', marginTop: '1rem' }}>
                      <a href='https://creativecommons.org/publicdomain/zero/1.0/'><span > <Icon size='large' name='creative commons' />Public Domain </span></a>
                    </div>
                  </FadingDiv>
                }
              </Transition>
            </div>
            <Divider />
            <Image.Group style={{ display: 'flex', wrap: 'no-wrap' }}>
              {data.item.images.map((image, index) => <StyledImageThumbnail key={index} index={index} height='75px' src={image} onClick={() => handleClick(index)} />)}
            </Image.Group>
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  )
}
export default SingleItem
