// expressモジュールを読み込む
import express from 'express';

import { importSchema } from 'graphql-import';

import { dbconnect } from './dbConnect';
import resolvers from './resolvers/index';
import models from './models/index';
import { verifyJwtToken } from './utils/verifyJwtToken';

const { ApolloServer } = require('apollo-server-express');

const typeDefs = importSchema('./typeDefs/schema.graphql');

dbconnect();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    return {
      currentUser: await verifyJwtToken(token),
      ...models,
    };
  },
});

const app = express();
server.applyMiddleware({ app });

app.listen(process.env.PORT || 4000, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
