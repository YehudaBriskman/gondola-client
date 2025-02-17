import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { mongoQueries } from './mongo_queries';

const isDocker = process.env.REACT_APP_DOCKER === "true"; // בודק אם הסביבה היא דוקר
export const MONGO_SERVER_IP = isDocker ? 'flask-app' : 'localhost';
export const MONGO_SERVER_PORT = 5002;

export const MongoClient = new ApolloClient({
    link: new HttpLink({ uri: `http://${MONGO_SERVER_IP}:${MONGO_SERVER_PORT}/graphql` }),
    cache: new InMemoryCache()
});

export const Network = {
    mongoQueries: mongoQueries
};
