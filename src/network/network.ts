import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { mongoQueries } from './mongo_queries';
import { algoQueries } from './algo_querues';

export const ALGO_SERVER_IP = "172.17.0.2";
export const ALGO_SERVER_PORT = 5003;

export const MONGO_SERVER_IP = '127.0.0.1';
export const MONGO_SERVER_PORT = 5000;

export const MongoClient = new ApolloClient({
    link: new HttpLink({ uri: `http://${MONGO_SERVER_IP}:${MONGO_SERVER_PORT}/graphql` }),
    cache: new InMemoryCache()
})

export const AlgoClient = new ApolloClient({
    link: new HttpLink({ uri: `http://${ALGO_SERVER_IP}:${ALGO_SERVER_PORT}/graphql` }),
    cache: new InMemoryCache()
})

export const Network = {
    mongoQueries: mongoQueries,
    algoQueries: algoQueries
}
