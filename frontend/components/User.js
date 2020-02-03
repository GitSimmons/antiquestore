import gql from "graphql-tag";
import { Query } from "react-apollo";

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

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => {
      return <>{props.children(payload)}</>;
    }}
  </Query>
);

export default User;
export { CURRENT_USER_QUERY };
