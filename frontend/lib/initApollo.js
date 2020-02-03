import ApolloClient from "apollo-client";
import { LOCAL_STATE_QUERY } from "../components/Cart";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import fetch from "isomorphic-unfetch";

let apolloClient = null;

const endpoint = `http://localhost:4445`;

const link = new HttpLink({
  uri: process.env.NODE_ENV === "development" ? endpoint : endpoint, // Server URL (must be absolute)
  credentials: "include", // Additional fetch() options like `credentials` or `headers`
  // Use fetch() polyfill on the server
  fetch: !process.browser && fetch
});
const cache = new InMemoryCache();

function create(initialState) {
  // const middlewareLink = setContext(() => ({
  //   headers: initalState.headers
  // }));

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link,
    cache,
    resolvers: {
      Mutation: {
        toggleCart: async (parent, args, { cache }, info) => {
          const { cartOpen } = await cache.readQuery({
            query: LOCAL_STATE_QUERY
          });
          await cache.writeData({
            data: {
              cartOpen: !cartOpen
            }
          });
          return !cartOpen;
        }
      }
    }
  });
}
cache.writeData({
  data: {
    cartOpen: false
  }
});

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
