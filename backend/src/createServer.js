const { GraphQLServer } = require("graphql-yoga");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const db = require("./db");

const typeDefs = "src/schema.graphql";
const resolvers = {
  Query,
  Mutation
};

function createServer() {
  return new GraphQLServer({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  });
}

module.exports = createServer;
