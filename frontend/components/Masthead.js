import Carousel from './Carousel/Carousel'

const images = [
  {
    title: `Chandeliers`,
    description: `Looking for something fancier than an edison bulb, but less fancy than recessed lighting?`,
    credit: `Benjamin Reisner @ Unpslash`,
    a: 'https://unsplash.com/photos/jEfbYpU0IMY',
    src: `https://res.cloudinary.com/acloudforben/image/upload/c_scale,f_auto,w_1980,q_80/v1559858462/auntsadies/chandelier`,
    headerColor: '',
    descColor: ''
  },
  {
    title: `Collectibles`,
    description: `Find the perfect gift that's too valuable for them to throw away.`,
    credit: `Andrej Ivanov`,
    backgroundColor: 'black',
    src: `https://res.cloudinary.com/acloudforben/image/upload/c_scale,f_auto,w_1980,q_80/v1559926068/auntsadies/hero1.jpg`,
    a: 'https://andrejiphotography.com/'
  }
]

const Masthead = ({ children }) => (
  <Carousel images={images} initialStep={0} />
)

export default Masthead
