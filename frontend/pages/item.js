export default (props) => (
  <div>
    <h1>Single item page</h1>
    {props.query.id && <h1>{props.query.id}</h1>}
  </div>
)
