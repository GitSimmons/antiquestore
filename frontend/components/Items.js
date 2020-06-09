import gql from "graphql-tag";
import { Card } from "semantic-ui-react";
import Pagination from "./Pagination";
import { perPage } from "../lib/config";
import { useQuery } from "react-apollo-hooks";
import ItemCard from "./ItemCard/ItemCard";
import { CardCarousel } from "./Carousel/CardCarousel";
import User from "./User";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY(
    $skip: Int = 0
    $first: Int = ${perPage}
    ) {
    items(
      orderBy: createdAt_DESC
      first: $first
      skip: $skip
      ) {
      id
      title
      description
      price
      image
    }
  }
`;

const Items = ({ page: pageProp }) => {
  const page = parseFloat(pageProp);
  const { data, error, loading, refetch } = useQuery(ALL_ITEMS_QUERY, {
    variables: {
      skip: page * perPage - perPage
    }
  });
  if (loading) {
    return (
      <CardCarousel>
        {[...Array(perPage)].map((e, index) => (
          <ItemCard key={index} />
        ))}
      </CardCarousel>
    );
  }
  if (error) return <div> Error... </div>;
  return (
    <User>
      {({ data: { currentUser } }) => (
        <div>
          <CardCarousel padding="0px 8px 0px 8px">
            {data.items.map(item => (
              <ItemCard
                permissions={currentUser ? currentUser.permissions : ""}
                item={item}
                key={item.id}
                refetch={refetch}
              />
            ))}
          </CardCarousel>
          <Pagination page={page} refetch={refetch} />
        </div>
      )}
    </User>
  );
};

export default Items;
