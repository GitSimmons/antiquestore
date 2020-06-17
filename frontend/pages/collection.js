// import ItemGrid from '../components/ItemGrid'
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { ItemGrid } from "../components/ItemGrid";
import Router from "next/router";
import { Breadcrumb } from "semantic-ui-react";
import { perPage } from "../lib/config";
import Pagination from "../components/CollectionPagination";
// Any fields you query here will be passed down to the Item Cards
// ie: if you want a description to appear, add it to the query
const SINGLE_COLLECTION_QUERY = gql`
  query SINGLE_COLLECTION_QUERY(
    $name: String!,
    $first: Int = ${perPage}
    $skip: Int
  ) {
    collection(where: { name: $name }, first: $first, skip: $skip) {
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

// will take collection name from props
const CollectionPage = (props) => {
  const currentPage = props.query.page || 1;
  if (!props.query.collection) {
    return <div>Collection not found</div>;
  }
  const { data, loading, error, refetch } = useQuery(SINGLE_COLLECTION_QUERY, {
    variables: {
      name: props.query.collection,
      first: perPage,
      skip: currentPage * perPage - perPage,
    },
  });
  if (loading) return <div style={{ marginTop: "5rem" }}> loading ... </div>;
  if (error) return <div style={{ marginTop: "5rem" }}> {error.message} </div>;
  if (!data.collection) {
    return <div> Collection not found </div>;
  }
  return (
    <div style={{ marginTop: "5rem" }}>
      <Breadcrumb style={{ padding: "1rem" }}>
        <Breadcrumb.Section link>Collections</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section link>{data.collection.name}</Breadcrumb.Section>
      </Breadcrumb>
      <ItemGrid items={data.collection.items} />
      <Pagination
        page={props.query.page}
        refetch={refetch}
        collection={props.query.collection}
      />
    </div>
  );
};

export default CollectionPage;
