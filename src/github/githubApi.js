const { isNil } = require("lodash");
const graphql = require("graphql-request");

module.exports = (key, query) => {
  if (isNil(key)) {
    throw new Error("GITHUB_API_KEY not supplied");
  }

  const client = new graphql.GraphQLClient("https://api.github.com/graphql", {
    headers: {
      Authorization: `Bearer ${key}`
    }
  });

  return client.request(query);
};
