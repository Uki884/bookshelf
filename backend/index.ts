// expressモジュールを読み込む
import express from 'express';

import { importSchema } from 'graphql-import';

const { ApolloServer } = require('apollo-server-express');

const typeDefs = importSchema('./typeDefs/schema.graphql');

// TODO 別ファイルに移す
const resolvers = {

};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
