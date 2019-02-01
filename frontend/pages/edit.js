import UpdateItem from '../components/UpdateItem'

export default (props) => (
  <>
    <h1>{props.query.id}</h1>
    <UpdateItem id={props.query.id} />
  </>
)
