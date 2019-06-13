import { useState } from 'react'
import { Button, Icon, Header } from 'semantic-ui-react'
import styled from 'styled-components'

const Carousel = ({ initialStep, images }) => {
  const [step, setStep] = useState(initialStep)
  const { src, title, description, backgroundColor } = images[step]

  const steps = images.length
  const deltaSetStep = (delta = 1) => {
    setStep((step + steps + delta) % steps)
  }
  const navigation = {
    previous: () => deltaSetStep(-1),
    next: () => deltaSetStep(+1),
    jump: (a) => setStep(a)
  }

  const PaddingBottom = styled.div`
    padding-bottom: 650px;
  `
  const CarouselContrastTriangleThing = styled.div`
    left: -45vw;
    top: 0;
    position: absolute;
    height: 100%;
    min-width: 80%;
    width: 500px;
    background-color: ${backgroundColor || '#bab9ff'};
    transform: skewX(-25deg);
    opacity: 0.25;
    
  `
  const ImageContainer = styled.div`
    position: absolute;
    top: 3rem;
    left: 0;
    min-height: 650px;
    width: 100vw; 
    background-image: url(${src});
    background-attachment: fixed;
    background-position: center top;
  `

  const ContentContainer = styled.div`
    position: absolute;
    top: 25%;
    left: 2.5rem;
  `

  return (
    <PaddingBottom>
      <ImageContainer>
        <CarouselContrastTriangleThing />
      </ImageContainer>
      <ContentContainer key={step}>
        <Header as='h1' style={{ maxWidth: '65%', fontSize: '6rem' }} inverted>{title}
          <Header.Subheader>
            {description}
          </Header.Subheader>
          <Button color='blue'>View Collection</Button>
        </Header>
        {/* <Icon color='grey' floated='left' name='chevron left' size='big' onClick={navigation.previous} />
        <Icon color='grey' floated='right' name='chevron right' size='big' onClick={navigation.next} />
        {images.map((image, index) => <Icon color={step === index ? 'black' : 'grey'} key={index} name='circle' onClick={() => navigation.jump(index)} />)} */}
      </ContentContainer>
    </PaddingBottom>
  )
}

export default Carousel
