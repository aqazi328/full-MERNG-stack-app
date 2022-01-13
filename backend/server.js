import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {ApolloServer} from 'apollo-server-express';
import dotenv  from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import cookieParser from 'cookie-parser';
import typeDefs from './gql/typeDefs.js'
import resolvers from './gql/resolvers.js'
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;     

app.use(cors());
app.use(express.json());

let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer();

const uri = process.env.ATLAS_URI;      // gets web address to link to mongoDB backend 
mongoose.connect(uri);

const connection = mongoose.connection;     // make connection to backend once connected successfully 
connection.once('open', ()=>{
    console.log("MongooseDB database connection established successfully");
})

app.listen(port,()=>{
    console.log(`Server is running on port: ${port} ~ http://localhost:${port}`);
});

