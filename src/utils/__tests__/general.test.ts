import { COORDINATE_PRECISION } from "../../constants";
import { getFixedPoint, ConvertPoint } from "../general";

describe("general utils testing", () => {
    describe("getFixedPoint function tests", () => {
        test("valid values for getFixedPoint", () => {
            expect(() => getFixedPoint(undefined as any)).toThrow(TypeError);
            expect(() => getFixedPoint(1 as any)).toThrow(TypeError);
            expect(() => getFixedPoint({ latlng: undefined } as any)).toThrow(TypeError);
            expect(() => getFixedPoint({ latlng: { lat: 1, lng: "2" } } as any)).toThrow(TypeError);
            expect(() => getFixedPoint({ latlng: { lat: 1, lng: 2 } } as any)).not.toThrow(Error);
        })
        test("return value of getFixedPoint", () => {
            const testValues: any = { latlng: { lat: 1, lng: 2 } }
            expect(
                getFixedPoint(testValues)
            ).toEqual({ lat: 1, lng: 2 });

            testValues.latlng.alt = 23
            expect(
                getFixedPoint(testValues)
            ).toEqual({ lat: 1, lng: 2, alt: 23 });
            testValues.latlng.alt = undefined

            testValues.latlng.lat = 1.123456789
            expect(
                getFixedPoint(testValues)
            ).toEqual({ lat: Number(testValues.latlng.lat.toFixed(COORDINATE_PRECISION)), lng: 2 });
        })
    })
    describe("fromLeafletPoint function tests", () => {
        test('valid values for fromLeafletPoint', () => {
            expect(() => ConvertPoint.fromLeafletPoint(undefined as any)).toThrow(TypeError);
            expect(() => ConvertPoint.fromLeafletPoint(1 as any)).toThrow(TypeError);
            expect(() => ConvertPoint.fromLeafletPoint({ lat: undefined, lng: undefined } as any)).not.toThrow(TypeError);
            expect(() => ConvertPoint.fromLeafletPoint({ lat: 1, lng: 2 })).not.toThrow(TypeError);

            //arrays values
            expect(() => ConvertPoint.fromLeafletPoint([{}, {}] as any)).toThrow(TypeError);
            expect(() => ConvertPoint.fromLeafletPoint([{ lat: 1, lng: 2 }, undefined] as any)).toThrow(TypeError);
            expect(() => ConvertPoint.fromLeafletPoint([{ lat: 1, lng: 2 }, { lat: 3, lng: 4 }] as any)).not.toThrow(TypeError);
        });

        test('return value of fromLeafletPoint', () => {
            const testValues: any = { lat: 1, lng: 2 };
            const testArrayValues: any = [
                { lat: 1, lng: 2 },
                { lat: 7, lng: 22 },
                { lat: 20, lng: 4 },
            ];
            expect(
                ConvertPoint.fromLeafletPoint(testValues)
            ).toEqual({ lat: 1, long: 2 });

            //arrays values
            expect(
                ConvertPoint.fromLeafletPoint(testArrayValues)
            ).toEqual([
                { lat: 1, long: 2 },
                { lat: 7, long: 22 },
                { lat: 20, long: 4 }
            ]);
        });
    })
    describe("toLeafletPoint function tests", () => {
        test('valid values for toLeafletPoint', () => {
            expect(() => ConvertPoint.toLeafletPoint(undefined as any)).toThrow(TypeError);
            expect(() => ConvertPoint.toLeafletPoint(1 as any)).toThrow(TypeError);
            expect(() => ConvertPoint.toLeafletPoint({ lat: undefined, long: undefined } as any)).not.toThrow(TypeError);
            expect(() => ConvertPoint.toLeafletPoint({ Latitude: 1, Longitude: 2 })).not.toThrow(TypeError);

            //arrays values
            expect(() => ConvertPoint.toLeafletPoint([{}, {}] as any)).toThrow(TypeError);
            expect(() => ConvertPoint.toLeafletPoint([{ lat: 1, long: 2 }, undefined] as any)).toThrow(TypeError);
            expect(() => ConvertPoint.toLeafletPoint([{ lat: 1, long: 2 }, { lat: 3, long: 4 }] as any)).not.toThrow(TypeError);
        });

        test('return value of toLeafletPoint', () => {
            const testValues: any = { lat: 1, long: 2 };
            const testArrayValues: any = [
                { lat: 1, long: 2 },
                { lat: 7, long: 22 },
                { lat: 20, long: 4 },
            ];
            expect(
                ConvertPoint.toLeafletPoint(testValues)
            ).toEqual({ lat: 1, lng: 2 });

            //arrays values
            expect(
                ConvertPoint.toLeafletPoint(testArrayValues)
            ).toEqual([
                { lat: 1, lng: 2 },
                { lat: 7, lng: 22 },
                { lat: 20, lng: 4 }
            ]);
        });
    })
})
