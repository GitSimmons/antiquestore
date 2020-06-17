import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useState } from "react";
import { Input, Form, Label, Loader } from "semantic-ui-react";

const SINGLE_COLLECTION_QUERY = gql`
  query SINGLE_COLLECTION_QUERY($name: String!) {
    collection(where: { name: $name }) {
      name
      items {
        id
        title
        price
        image
      }
    }
  }
`;

const EDIT_COLLECTION_MUTATION = gql`
  mutation EDIT_COLLECTION_MUTATION($name: String, $items: [ID!]) {
    updateCollection(where: { name: $name }, name: $name, items: $items) {
      items
    }
  }
`;
const Item = ({ item }) => <li>{item.title}</li>;

const UpdateCollection = ({ collection }) => {
  const [newItems, setNewItems] = useState([]);
  const { data, loading, error } = useQuery(SINGLE_COLLECTION_QUERY, {
    variables: {
      name: collection,
    },
  });
  if (loading || error) return null;
  return (
    <div style={{ marginTop: "5rem" }}>
      {data.collection.name}
      <ul>
        {data.collection.items.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  );
};

export { UpdateCollection };
