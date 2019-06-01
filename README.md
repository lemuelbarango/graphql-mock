# graphql-mock

A mock GraphQL server that responds based on any GraphQL JSON schema. It can be used when testing a client that queries a GraphQL API.

It uses [the apollo graphql tools library](https://github.com/apollographql/graphql-tools) and [faker.js library](https://github.com/Marak/faker.js), to generate fake responses.

## Usage

``` sh
# run
docker run  -p 4000:4000 lemuelbarango/graphql-mock:latest
```

To use custom GraphQL schema

```sh
docker run  -p 4000:4000 -v [PATH_TO_SCHEMA_JSON]:/server/dist/schema.json lemuelbarango/graphql-mock:latest
```

To override mock values with example `mock.json`

```json
{
  "Person": {
    // name.firstName is a property from faker.js
    "name": "name.firstName"
  }
}
```

```sh
docker run  -p 4000:4000 -v [PATH_TO_MOCK_JSON]:/server/dist/mock.json lemuelbarango/graphql-mock:latest
```

The default Docker `ENTRYPOINT` listens on port `4000` for HTTP
