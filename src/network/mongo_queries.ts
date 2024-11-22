import { gql } from "@apollo/client";
import { MongoClient } from "./network";
import { SaveQueryInput } from "./types/mongo_types";




const SAVE_QUERY_MUTATION = gql`
mutation SaveQuery($input:SaveQueryInput!){
    saveQuery(input:$input)
}
`
async function saveQuery(input: SaveQueryInput) {
    console.log("saveQuery - input:", input);
    try {
        const response = await MongoClient.mutate({
            mutation: SAVE_QUERY_MUTATION,
            variables: {
                input
            }
        })
        console.log("saveQuery - response:", response.data.saveQuery)
        return response.data.saveQuery
    } catch (error) {
        console.error("Error saveQuery", error)
    }
}




const RETRIEVE_RECENT_HISTORY = gql`
query RetrieveRecentHistory($limit:Int){
    retrieveRecentHistory(limit:$limit){
        timestamp
        name
        source
    }
}
`
async function retrieveRecentHistory(limit: number) {
    console.log("retrieveRecentHistory - input[LIMIT]:", limit);
    try {
        const response = await MongoClient.query({
            query: RETRIEVE_RECENT_HISTORY,
            variables: {
                limit
            }
        })
        console.log("retrieveRecentHistory - response:", response.data.retrieveRecentHistory)
        return response.data.retrieveRecentHistory
    } catch (error) {
        console.error("Error retrieve History", error)
    }
}




const RETRIEVE_QUERY = gql`
query RetrieveQuery($name:String!){
    retrieveQuery(name:$name){
        timestamp
        name
        source
        radius
        photoDelayAtStart
        windSpeed
        windDirection
        altitude
        speed
        exitPath{
            startPoint{
                Latitude
                Longitude
            }
            endPoint{
                Latitude
                Longitude
            }
        }
        entryPath{
            startPoint{
                Latitude
                Longitude
            }
            endPoint{
                Latitude
                Longitude
            }
        }
        targets{
            name
            point{
                Latitude
                Longitude
            }
            priority
            quality
            photoDirection
        }
        flyZone{
            Latitude
            Longitude
        }
        legs{
            targetInfo{
                target{
                    name
                point{
                    Latitude
                    Longitude
                }
                priority
                quality
                photoDirection
                }
                path{
                    startPoint{
                        Latitude
                        Longitude
                    }
                    endPoint{
                        Latitude
                        Longitude
                    }
                }
            }
            path{
                startPoint{
                    Latitude
                    Longitude
                }
                endPoint{
                    Latitude
                    Longitude
                }
            }
            altitude
        }
        tangentLines{
             startPoint{
                Latitude
                Longitude
            }
            endPoint{
                Latitude
                Longitude
            }
        }
        arcs{
            radius
            centerPoint {
                Latitude
                Longitude
            }
            clockwise
            startAngle
            endAngle
        }

    }
}
`
async function retrieveQuery(name: String) {
    console.log("retrieveQuery - input[NAME]:", name);
    try {
        const response = await MongoClient.query({
            query: RETRIEVE_QUERY,
            variables: {
                name
            }
        })
        console.log("retrieveQuery - response:", response.data.retrieveQuery)
        return response.data.retrieveQuery
    } catch (error) {
        console.error("Error retrieve Query", error)
    }
}




const INTROSPECTION_CHECK = gql`
query IntrospectionCheck{
    __schema{
        queryType{
            name
        }
    }
}
`
async function introspectionCheck() {
    try {
        const response = await MongoClient.query({
            query: INTROSPECTION_CHECK
        })
        console.log("introspectionCheck - network-status:", response.networkStatus, `${(response.networkStatus === 7) ? "Success" : "Failed"}`);
        return response.data.__schema
    } catch (error) {
        console.error("Error, query: [introspection-check]", error)
    }
}


export const mongoQueries = {
    saveQuery: saveQuery,
    retrieveRecentHistory: retrieveRecentHistory,
    retrieveQuery: retrieveQuery,
    introspectionCheck: introspectionCheck,
}

