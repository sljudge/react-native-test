import { GraphQLClient } from "graphql-request";

const requestHeaders = {
  authorization: "Bearer MY_TOKEN",
};

const graphqlRequestClient = new GraphQLClient(
  "https://rickandmortyapi.com/graphql",
  {
    headers: requestHeaders,
  }
);

export default graphqlRequestClient;
