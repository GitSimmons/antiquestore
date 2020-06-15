import { Button, Icon, Header } from "semantic-ui-react";
import styled from "styled-components";

const mastheadObject = {
  title: `Lighting`, // Keep this short
  description: `Looking for something fancier than an edison bulb, but cheaper than renovating for recessed lighting?`,
  credit: `Benjamin Reisner @ Unpslash`,
  a: "https://unsplash.com/photos/jEfbYpU0IMY",
  src: `https://res.cloudinary.com/acloudforben/image/upload/c_scale,f_auto,w_1980,q_80/v1559858462/auntsadies/chandelier`,
  headerColor: "",
  descColor: ""
};

const Masthead = () => {
  const CarouselContrastTriangleThing = styled.div`
  `;
  const ImageContainer = styled.div`
    position: relative;
    display: flex;
    padding-left: 2rem;
    align-items: center;
    height: 650px;
    max-height: 100vh;
    overflow: hidden;
    max-width: 1280px;
    background-image: url(${mastheadObject.src});
    background-attachment: fixed;
    background-position: top;

    /* after pseudo element to create the contrastTriangle */

    &::after {
    left: -50%;
    top: 0;
    position: absolute;
    height: 650px;
    max-height: 100vh;
    overflow: hidden;
    min-width: 80%;
    background-color: ${mastheadObject.backgroundColor || `rgba(186,185,255, 0.12)`};
    transform: skewX(-25deg);
    content: '';
    z-index: "0";
    }
    @media (max-width:900px) {
    &::after {
    position:absolute;
    z-index: 1;
    background-color: ${mastheadObject.mobileBackgroundColor || `rgba(036,035,105, 0.75)`};
    left: -150%;
    transform: skewX(-30deg);
    width: 200%;
    }
    }
  `;

  return (
      <ImageContainer>
          <Header
            as="h1"
	    style={{ maxWidth: "33%", fontSize: "6rem"  ,zIndex: 2}}
            inverted
          >
            {mastheadObject.title}
            <Header.Subheader>{mastheadObject.description}
	    
	      <Button color="blue" style={{marginTop: "1rem"}}>View Collection</Button>
	    </Header.Subheader>
          </Header>
      </ImageContainer>
  );
};

export default Masthead;
