import Items from '../components/Items'
import Masthead from '../components/Masthead'
export default props => (
  <>
    <Masthead />
    <Items page={props.query.page || 1} />
  </>
)
