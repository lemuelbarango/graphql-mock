import introspectionQueryResult from "./schema.json";
import graphqlHTTP from "express-graphql";
import express from 'express';
import faker from 'faker';
import get from "lodash.get";

import { buildClientSchema, IntrospectionQuery } from "graphql";
import { addMockFunctionsToSchema } from "graphql-tools";

function defineMocks(mocksObj = {}) {
  const transformedObj = {};
  for (const key in mocksObj) {
    transformedObj[key] = () => get(faker, mocksObj[key])();
  }
  return transformedObj;
}

const mocksMap = {
  Int: "random.number",
  Float: "random.float",
  String: "random.word",
  ID: "random.uuid",
  Boolean: "random.boolean"
};
const mocks = defineMocks(mocksMap);
const schemaJson = introspectionQueryResult.hasOwnProperty("data") ? introspectionQueryResult.data : introspectionQueryResult

const schema = buildClientSchema(<IntrospectionQuery>schemaJson);
addMockFunctionsToSchema({ schema, mocks });

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);
app.listen(4000);
console.log("Running a GraphQL mock server at localhost:4000/graphql");
