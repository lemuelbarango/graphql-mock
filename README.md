# graphql-mock

A mock GraphQL server that responds based on any GraphQL JSON schema. It can be used when testing a client that queries a GraphQL API.

It uses [the apollo graphql tools library](https://github.com/apollographql/graphql-tools) and [faker.js library](https://github.com/Marak/faker.js), to generate fake responses.

## Usage

``` sh
# run
docker run  -p 4000:4000 lemuelbarango/graphql-mock
```

To use custom GraphQL schema

```sh
docker run  -p 4000:4000 \
-v [PATH_TO_SCHEMA_JSON]:/server/dist/schema.json \
lemuelbarango/graphql-mock

# Also accepts schema URL as an env variable
docker run  -p 4000:4000 \
-e SCHEMA_URL='https://raw.githubusercontent.com/lemuelbarango/graphql-mock/master/src/schema.json' \
lemuelbarango/graphql-mock
```

To override mock values with example `mock.json`

```json
// name.firstName is a property from faker.js
{
  "Person": {
    "name": "name.firstName"
  }
}
```

```sh
docker run  -p 4000:4000 \
-v [PATH_TO_MOCK_JSON]:/server/dist/mock.json \
lemuelbarango/graphql-mock
```

The default Docker `ENTRYPOINT` listens on port `4000` for HTTP
