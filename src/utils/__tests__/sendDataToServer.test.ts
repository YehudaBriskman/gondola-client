// import axios from "axios";
// import { sendDataToServer } from "../sendDataToServer";
// import { Target } from "../../gondolaTypes/navigationElements";
// import { CreateFullPathRequested, FullPath } from "../../gondolaTypes/reqResRoutes";

// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// describe("sendDataToServer utils testing", () => {
//     const targets: Target[] = [{
//         name: "me",
//         point: {
//             Latitude: 1,
//             Longitude: 2,
//         },
//         priority: 1,
//         quality: 2,
//         photoDirection: undefined,
//     }];
//     const algorithmResponse: FullPath = {
//         legs: [{
//             startPoint: {
//                 Latitude: 1,
//                 Longitude: 2
//             },
//             endPoint: {
//                 Latitude: 15,
//                 Longitude: 3,
//             },
//             altitude: 35,
//             targetInfo: [{
//                 startPoint: {
//                     Latitude: 1,
//                     Longitude: 2,
//                 },
//                 endPoint: {
//                     Latitude: 15,
//                     Longitude: 3,
//                 },
//                 target: {
//                     name: "string",
//                     point: {
//                         Latitude: 2,
//                         Longitude: 1,
//                     },
//                     priority: 3,
//                     quality: 2,
//                     photoDirection: "NORTH",
//                 }
//             }],
//         }],
//         arcs: [],
//         tangentLines: [],
//     };
//     const req: CreateFullPathRequested = {
//         altitude: 20,
//         entryPath: {
//             startPoint: {
//                 Latitude: 1,
//                 Longitude: 2
//             },
//             endPoint: {
//                 Latitude: 15,
//                 Longitude: 3,
//             }
//         },
//         exitPath: {
//             startPoint: {
//                 Latitude: 7,
//                 Longitude: 4
//             },
//             endPoint: {
//                 Latitude: 17,
//                 Longitude: 9,
//             }
//         },
//         flyZone: [{
//             Latitude: 2,
//             Longitude: 6
//         }, {
//             Latitude: 7,
//             Longitude: 8
//         }],
//         photoDelayInStart: 1,
//         radius: 10,
//         speed: 300,
//         targets: targets,
//         windDirection: 5
//     };
//     const mockResponse = {
//         Route: {
//             success: {
//                 status: "success",
//                 data: algorithmResponse
//             }, failed: {
//                 status: "failed",
//                 error: expect.any(Error)
//             }
//         },
//         Target: {
//             success: {
//                 status: "success",
//                 data: targets
//             }, failed: {
//                 status: "failed",
//                 error: expect.any(Error)
//             }
//         }
//     };
//     const fileContent = 'file content';
//     const file = new File([fileContent], 'test.txt', { type: 'text/plain' });

//     test("sendDataToServer function getting valid values", () => {
//         expect(() => sendDataToServer("json-data", req)).not.toThrow(TypeError);
//         expect(() => sendDataToServer("json-data", undefined as any)).not.toThrow(TypeError);
//         expect(() => sendDataToServer("csv-file", file)).not.toThrow(TypeError);
//         expect(() => sendDataToServer("csv-file", undefined as any)).not.toThrow(TypeError);
//     });

//     describe("mockServer", () => {
//         test("should return status success when calling sendDataToServer", async () => {
//             mockedAxios.post.mockResolvedValueOnce({ data: { status: "success", data: mockResponse.Route.success.data } });
//             const result_json = await sendDataToServer("json-data", req);
//             expect(result_json).toEqual(mockResponse.Route.success);

//             mockedAxios.postForm.mockResolvedValueOnce({ data: { status: "success", data: mockResponse.Target.success.data } });
//             const result_csv = await sendDataToServer("csv-file", file);
//             expect(result_csv).toEqual(mockResponse.Target.success);
//         });

//         test("should return status failed when calling sendDataToServer", async () => {
//             mockedAxios.post.mockRejectedValueOnce(new Error("failure"));
//             const result_json_mock = await sendDataToServer("json-data", req);
//             expect(result_json_mock).toEqual(expect.objectContaining(mockResponse.Route.failed));

//             mockedAxios.postForm.mockRejectedValueOnce(new Error("failure"));
//             const result_csv_reject = await sendDataToServer("csv-file", file);
//             expect(result_csv_reject).toEqual(expect.objectContaining(mockResponse.Target.failed));
//         })
//     })
// })
