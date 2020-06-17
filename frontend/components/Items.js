import gql from "graphql-tag";
import { Card } from "semantic-ui-react";
import Pagination from "./Pagination";
import { carouselLength } from "../lib/config";
import { useQuery } from "@apollo/react-hooks";
import ItemCard from "./ItemCard/ItemCard";
import { CardCarousel } from "./Carousel/CardCarousel";
import { useUser } from "./User";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY(
    $first: Int = ${carouselLength}
    ) {
    items(
      orderBy: createdAt_DESC
      first: $first
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
  const currentUser = useUser();
  const page = parseFloat(pageProp);
  const { data, error, loading, refetch } = useQuery(ALL_ITEMS_QUERY);
  if (loading) {
    return (
      <CardCarousel padding="0px 8px 0px 8px">
        {[...Array(carouselLength)].map((e, index) => (
          <ItemCard key={index} />
        ))}
      </CardCarousel>
    );
  }
  if (error) return <div> Error... </div>;
  return (
    <div>
      <CardCarousel padding="0px 8px 0px 8px">
        {data.items.map((item) => (
          <ItemCard
            permissions={currentUser && currentUser.permissions}
            item={item}
            key={item.id}
            refetch={refetch}
          />
        ))}
      </CardCarousel>
    </div>
  );
};

export default Items;
