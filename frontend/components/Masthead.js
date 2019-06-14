
import { Button, Icon, Header } from 'semantic-ui-react'
import styled from 'styled-components'

const mastheadObject =
  {
    title: `Chandeliers`,
    description: `Looking for something fancier than an edison bulb, but less fancy than recessed lighting?`,
    credit: `Benjamin Reisner @ Unpslash`,
    a: 'https://unsplash.com/photos/jEfbYpU0IMY',
    src: `https://res.cloudinary.com/acloudforben/image/upload/c_scale,f_auto,w_1980,q_80/v1559858462/auntsadies/chandelier`,
    headerColor: '',
    descColor: ''
  }

const Masthead = () => {
  const CarouselContrastTriangleThing = styled.div`
  left: -45vw;
  top: 0;
  position: absolute;
  height: 100%;
  min-width: 80%;
  background-color: ${mastheadObject.backgroundColor || '#bab9ff'};
  transform: skewX(-25deg);
  opacity: 0.25;
`
  const ImageContainer = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  padding-left: 2rem;
  align-items: center;
  min-height: 650px;
  width: 100vw; 
  background-image: url(${mastheadObject.src});
  background-attachment: fixed;
  background-position: top;
`

  return (
    <div style={{ height: '650px' }}>
      <ImageContainer>
        <CarouselContrastTriangleThing />
        <div>
          <Header as='h1' style={{ maxWidth: '65%', fontSize: '6rem' }} inverted>{mastheadObject.title}
            <Header.Subheader>
              {mastheadObject.description}
            </Header.Subheader>
            <Button color='blue'>View Collection</Button>
          </Header>
        </div>
      </ImageContainer>
    </div>
  )
}

export default Masthead
