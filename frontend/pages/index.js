import { Header } from 'semantic-ui-react'
import Items from '../components/Items'
import Masthead from '../components/Masthead'

export default props => (
  <>
    <Masthead />
    <Header as='h2'>Explore our full collection</Header>
    <Items page={props.query.page || 1} />
  </>
)
