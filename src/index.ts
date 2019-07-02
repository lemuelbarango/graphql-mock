import introspectionQueryResult from "./schema.json";
import mockJSON from "./mock.json";
import graphqlHTTP from "express-graphql";
import express from 'express';
import faker from 'faker';
import get from "lodash.get";
import axios from "axios";

import { buildClientSchema, IntrospectionQuery } from "graphql";
import { addMockFunctionsToSchema } from "graphql-tools";

const defineMocks = (mocksObj = {}) => {
  const transformedObj = {};
  for (const key in mocksObj) {
    const value = mocksObj[key]

    if (typeof value === 'object') {
      transformedObj[key] = () => defineMocks(value)
    } else {
      transformedObj[key] = () => get(faker, value)();
    }
  }
  return transformedObj;
}

const downloadSchema = async () => await axios.get(process.env.SCHEMA_URL).then(response => response.data);
const downloadMockJSON = async () => await axios.get(process.env.MOCK_JSON_URL).then(response => response.data);

(async () => {
  const mocksMap = {
    Int: "random.number",
    Float: "random.float",
    String: "random.word",
    ID: "random.uuid",
    Boolean: "random.boolean",
    ...(process.env.MOCK_JSON_URL ? await downloadMockJSON() : mockJSON)
  };
  const mocks = defineMocks(mocksMap);
  
  const schemaJson = process.env.SCHEMA_URL ? await downloadSchema() : introspectionQueryResult
  const schema = buildClientSchema(<IntrospectionQuery>schemaJson.data);
  addMockFunctionsToSchema({
    schema, mocks,
    preserveResolvers: true
  });

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
})()