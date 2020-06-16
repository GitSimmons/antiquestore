import StripeCheckout from "react-stripe-checkout";
import { useUser } from "./User";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Router from "next/router";

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder(token: $token) {
      id
      total
      charge
      items {
        title
        description
      }
    }
  }
`;

const getTotal = (cart) =>
  cart.reduce((accumulator, currentValue) => {
    if (!currentValue.item) {
      return accumulator;
    }
    return accumulator + currentValue.item.price;
  }, 0);

export default ({ children }) => {
  const currentUser = useUser()
  const createOrder = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: ["CURRENT_USER_QUERY"],
  });

  const onToken = async (token) => {
    await createOrder({
      variables: {
        token: token.id,
      },
    }).catch((err) => {
      alert(err.message);
    });
    // TODO: actually do something with this error message
    Router.push(`/order?id=${token.id}`);
  };
  return (
    <StripeCheckout
      name="Antiques"
      currency="CAD"
      description={`Order of ${currentUser.cart.length} items`}
      email={currentUser.email}
      amount={currentUser && getTotal(currentUser.cart)}
      stripeKey="pk_test_qIHJmLnEeHvvv5Ys78ex0yA500wP2YkOsE"
      token={onToken}
    >
      {children}
    </StripeCheckout>
  );
};
