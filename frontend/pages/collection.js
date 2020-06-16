// import ItemGrid from '../components/ItemGrid'
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const SINGLE_COLLECTION_QUERY = gql`
  query SINGLE_COLLECTION_QUERY($name: String!) {
    collection(where: { name: $name }) {
      items {
        title
      }
    }
  }
`;

// will take collection name from props
const CollectionPage = props => {
  const { data, loading, error } = useQuery(SINGLE_COLLECTION_QUERY, {
    variables: {
      name: props.query.collection,
    },
  });
  if (loading) return <div> loading ... </div>;
  if (error) return <div> {error.message} </div>;
  return (
    <div style={{ marginTop: "5rem" }}>
      {props.collection}
      {data  && data.collection.items.map(({title}) => <p>{title}</p>)}
    </div>
  );
};

export default CollectionPage;
