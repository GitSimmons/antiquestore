import SingleItem from '../components/SingleItem'

export default (props) => (
  <div>
    <h1>Single item page</h1>
    <SingleItem id={props.query.id} />
  </div>
)
