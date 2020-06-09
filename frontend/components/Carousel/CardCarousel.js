import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { useState, useRef, useEffect } from 'react'

const Wrapper = styled.div`
display: flex;
max-width: 100vw;
overflow-x: auto;
&::-webkit-scrollbar {
  -webkit-appearance: none !important;
  display: none !important;
}
`

const CarouselContainer = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
margin: 1px 0px 1px 0px;
transition: ${(props) => props.sliding ? 'none' : 'transform 0.3s ease'};
transform: ${(props) => {
    if (!props.sliding && (props.numItems - props.visibleItems > 0)) return `translateX(calc(-100%/${props.visibleItems}))`
    if (props.direction === 'previous' && (props.numItems - props.visibleItems > 0)) return `translateX(calc(-100%/${props.visibleItems} * 2))`
    return 'translateX(0px)'
  }
};
`
const CardCarousel = ({ title, children, visibleItems = 4, padding }) => {
  const [direction, setDirection] = useState('next')
  const [position, setPosition] = useState(children.length - 1 || 0)
  const [sliding, setSliding] = useState(false)
  const numItems = children.length || 1
  const getOrder = (itemIndex) => {
    if (itemIndex - position < 0) {
      return numItems - Math.abs(itemIndex - position)
    }
    return itemIndex - position
  }
  const deltaPosition = (delta = 1) => {
    setPosition((position + numItems + delta) % numItems)
  }
  const doSliding = () => {
    setSliding(true)
    setTimeout(() => {
      setSliding(false)
    }, 0)
  }
  const navigation = {
    previous: () => {
      setDirection('previous')
      deltaPosition(-1)
      doSliding()
    },
    next: () => {
      setDirection('next')
      deltaPosition(+1)
      doSliding()
    },
    jump: (a) => deltaPosition(a)
  }
  let width
  try {

  if (window) {
    width = window.innerWidth;
    if (width <= 450) {
      visibleItems = 2
    } else if (width <=900) {
      visibleItems = 3
    }
  }
  } catch (e) {
    
  }

  const CarouselSlot = styled.div`
  display: flex;
  min-width: calc(100%/${visibleItems});
  justify-content: center;
  padding: ${(props) => props.padding || '0px 0px 0px 0px'};
  order: ${(props) => props.order};
  `
  const CarouselNavButton = styled.div`
    position: absolute !important;
    top: 50% !important;
    display: block !important;
    z-index: 1 !important;
    transform: translateY(-100%);
    `
  const StyledIcon = styled(Icon)`
    box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 1px !important;
    background-color: white;
    &:active {
      box-shadow: rgba(0, 125, 255, 0.35) 0px 1px 1px 1px !important;;
    }
  `
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Wrapper>
        <CarouselContainer sliding={sliding} direction={direction} numItems={numItems} visibleItems={visibleItems}>
          { children.map((child, index) => {
            return (
              <CarouselSlot
                padding={padding}
                key={index}
                order={getOrder(index)}
              >
                {child }
                <div />
              </CarouselSlot>
            )
          }) }
        </CarouselContainer>
      </Wrapper>

      {(numItems - visibleItems > 0) && <>
        <CarouselNavButton disabled={sliding} style={{ left: '0px'}} onClick={() => navigation.previous()}>
          <StyledIcon circular color='blue' size='large' name='chevron left' aria-label='previous' />
        </CarouselNavButton>
        <CarouselNavButton disabled={sliding} style={{ right: '0px'}} onClick={() => navigation.next()}>
          <StyledIcon circular color='blue' size='large' name='chevron right' aria-label='next' />
        </CarouselNavButton>
      </>
      }

    </div>
  )
}

export { CardCarousel }
