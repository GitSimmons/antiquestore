import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useState } from "react";
import { Breadcrumb, Input, Form, Label, Loader } from "semantic-ui-react";

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
  const [addedItems, setAddedItems] = useState([]);
  const [removedItems, setRemovedItems] = useState([]);
  const removeItem = (id) => setRemovedItems((prevItems) => [...prevItems, id]);
  const addItem = (id) => setAddedItems((prevItems) => [...prevItems, id]);
  const { data, loading, error } = useQuery(SINGLE_COLLECTION_QUERY, {
    variables: {
      name: collection,
    },
  });
  const [updateCollection] = useMutation(EDIT_COLLECTION_MUTATION);
  const onSubmit = () => {
    let updatedData = data.items.map((item) => item.id);
    updatedData = updatedData.filter((id) =>
      removedItems.any((removedItemId) => removedItemId == id)
    );
    updatedData = [...updatedData, ...addedItems];
    updateCollection({
      variables: {
        where: {
          name: collection,
        },
        name: collection,
        items: updatedData,
      },
    });
  };
  if (loading || error) return null;
  return (
    <div style={{ marginTop: "5rem" }}>
      <Breadcrumb>
        <Breadcrumb.Section link> Collections </Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section link> {collection} </Breadcrumb.Section>
      </Breadcrumb>

      <ul>
        {data.collection.items.map((item) => (
          <Item item={item} />
        ))}
      </ul>
      <button onClick={onSubmit} type="submit">
        Apply changes
      </button>
    </div>
  );
};

export { UpdateCollection };
