import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      id
      email
      name
      permissions
      cart {
        id
        item {
          title
          id
          price
          image
          description
        }
      }
    }
  }
`;

const useUser = () => {
const {data,loading, error}  = useQuery(CURRENT_USER_QUERY)
  if (data) return data.currentUser
}


export { useUser, CURRENT_USER_QUERY };
