import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { mongoQueries } from './mongo_queries';

export const MONGO_SERVER_IP = 'flask-app'; // שם השירות מ-docker-compose
export const MONGO_SERVER_PORT = 5002;

export const MongoClient = new ApolloClient({
    link: new HttpLink({ uri: `http://${MONGO_SERVER_IP}:${MONGO_SERVER_PORT}/graphql` }),
    cache: new InMemoryCache()
})

export const Network = {
    mongoQueries: mongoQueries
}
