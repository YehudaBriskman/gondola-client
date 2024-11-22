import { gql } from "@apollo/client";
import { AlgoClient } from "./network";
import { ConnectLegsInput, CreateFullPathInput, CreateLegsInput } from "./types/algo_types";




const CREATE_FULL_PATH_QUERY = gql`
query CreateFullPath($input:CreateFullPathInput!){
    createFullPath(input:$input){
        legs{
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
            targetInfo{
                target{
                    point{
                        Latitude
                        Longitude
                    }
                    priority
                    quality
                    photoDirection
                    name
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
async function CreateFullPath(input: CreateFullPathInput) {
    console.log("CreateFullPath - input:", input);
    try {
        const response = await AlgoClient.query({
            query: CREATE_FULL_PATH_QUERY,
            variables: {
                input
            }
        })
        console.log("CreateFullPath - response:", response.data.createFullPath);
        return response.data.createFullPath
    } catch (error) {
        console.error("Error, query: [create full path]", error)
    }
}




const CREATE_LEGS_QUERY = gql`
query CreateLegs($input:CreateLegsInput!){
    createLegs(input:$input){
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
        targetInfo{
            target{
                point{
                    Latitude
                    Longitude
                }
                priority
                quality
                name
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
    }
}
`
async function createLegs(input: CreateLegsInput) {
    console.log("createLegs - input:", input);
    try {
        const response = await AlgoClient.query({
            query: CREATE_LEGS_QUERY,
            variables: {
                input
            }
        })
        console.log("createLegs - response:", response.data.createLegs);
        return response.data.createLegs
    } catch (error) {
        console.error("Error, query: [create legs]", error)
    }
}




const CONNECT_LEGS_QUERY = gql`
query ConnectLegs($input:ConnectLegsInput!){
    connectLegs(input:$input){
        legs{
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
            targetInfo{
                target{
                    point{
                        Latitude
                        Longitude
                    }
                    priority
                    quality
                    name
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
async function connectLegs(input: ConnectLegsInput) {
    console.log("connectLegs - input:", input);
    try {
        const response = await AlgoClient.query({
            query: CONNECT_LEGS_QUERY,
            variables: {
                input
            }
        })
        console.log("connectLegs - response:", response.data.connectLegs);
        return response.data.connectLegs
    } catch (error) {
        console.error("Error, query: [connect legs]", error)
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
        const response = await AlgoClient.query({
            query: INTROSPECTION_CHECK
        })
        console.log("introspectionCheck - network-status:", response.networkStatus, `${(response.networkStatus === 7) ? "Success" : "Failed"}`);
        return response.data.__schema
    } catch (error) {
        console.error("Error, query: [introspection-check]", error)
    }
}







export const algoQueries = {
    CreateFullPath: CreateFullPath,
    createLegs: createLegs,
    connectLegs: connectLegs,
    introspectionCheck: introspectionCheck,
}

