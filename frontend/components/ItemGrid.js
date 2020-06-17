import ItemCard from "./ItemCard/ItemCard";
import { useUser } from "./User";
import styled from "styled-components";

const StyledGrid = styled.div`
  display: flex;
  max-width: 1280px;
  justify-content: space-around;
  flex-wrap: wrap;
  }
`;

const CarouselSlot = styled.div`
  display: flex;
  width: 200px;
  justify-content: center;
  padding: ${(props) => props.padding || "0px 0px 0px 0px"};
`;

const ItemGrid = ({ items }) => {
  const currentUser = useUser();
  return (
    <StyledGrid>
      {items.map((item) => (
        <CarouselSlot padding="0.5rem 0.5rem" key={item.id}>
          <ItemCard
            item={item}
            permissions={currentUser ? currentUser.permissions : []}
          />
        </CarouselSlot>
      ))}
    </StyledGrid>
  );
};

export { ItemGrid };
