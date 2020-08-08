// expressモジュールを読み込む
import express from 'express';

import { importSchema } from 'graphql-import';

import { dbconnect } from '@/dbConnect';
import resolvers from '@/resolvers/index';
import models from '@/models/index';
import { verifyJwtToken } from '@/utils/verifyJwtToken';

const { ApolloServer } = require('apollo-server-express');

const typeDefs = importSchema('./typeDefs/schema.graphql');
// TODO 別ファイルに移す

dbconnect();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    return {
      currentUser: verifyJwtToken(token),
      ...models,
    };
  },
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
