import { Transition } from 'react-transition-group'
import { Divider, Icon, Image } from 'semantic-ui-react'
import styled from 'styled-components'
import { useState } from 'react'

const ImageCarousel = ({ initialIndex = 0, onSelect = () => {}, children }) => {
  const [currentImage, setCurrentImage] = useState(initialIndex)
  const [inProp, setInProp] = useState(true)

  const StyledImageThumbnail = styled.div`
  padding: .2rem;
  transition: opacity 0.3s ease;
  opacity: ${props => props.index.toString() === currentImage.toString() ? 1 : 0.6};
  :hover {
    opacity: 1;
  }`
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
  const handleClick = async (child, index) => {
    setInProp(false)
    await setTimeout(() => setInProp(true), 0)
    setCurrentImage(index)
    onSelect(child, index)
  }
  if (!children || !children[currentImage]) {
    return (
      <div>Something went wrong...</div>
    )
  }
  return (
    <div style={{ backgroundColor: 'ivory', minWidth: '500px', display: 'flex', flexDirection: 'column', placeItems: 'center center', padding: '1rem' }}>
      <div style={{ display: 'block', placeItems: 'center center', height: '750px' }} >
        <Transition in={inProp} timeout={0}>
          {state =>
            <FadingDiv className={state} >
              <img width='500px' style={{ maxHeight: '650px', objectFit: 'cover' }} src={children[currentImage].props.src} />
              <div style={{ width: '100%', fontFamily: 'sans-serif', marginTop: '1rem' }}>
                <a href='https://creativecommons.org/publicdomain/zero/1.0/'><span >
                  <Icon size='large' name='creative commons' />Public Domain </span></a>
              </div>
            </FadingDiv>
          }
        </Transition>
      </div>
      <Divider />
      <div style={{ display: 'flex', wrap: 'no-wrap', width: '100%', justifyContent: 'center' }}>
        {children.map((child, index) =>
          <StyledImageThumbnail key={index} index={index} onClick={() => handleClick(child, index)}>
            {child}
          </StyledImageThumbnail>
        )}
      </div>
    </div>
  )
}

export { ImageCarousel }
