const express = require('express')
const { connect } = require('mongoose')
const bodyParser = require('body-parser')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginLandingPageProductionDefault } = require('apollo-server-core');
const dotenv = require('dotenv')
dotenv.config()

const db = process.env.MONGOURI ||  'mongodb://localhost:27017/e-commerce'

const connectDb = async () => {
  try {
    await connect(db)
    console.log('DB CONNECTED..');
  } catch (error) {
    console.error('DB CONNECTION ERROR:', error);
  }
}

//middleware
const app = express();
app.use(bodyParser.json());

//schemas y resolvers
const typeDefs = require('./merge/mergeSchema')
const resolvers = require('./merge/mergeResolver')

const PORT = process.env.PORT || 5020

//configuración del servidor de apollo y la conexion con el servidor de express.
async function start(){
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginLandingPageProductionDefault({
        embed: true
      })
    ]
  })
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`e-commerce ready at port: http://localhost:${PORT}/graphql`);
    connectDb();
  })
}

//iniciando servidor
start()



