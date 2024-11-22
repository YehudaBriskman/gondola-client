import getArcPoints, { getPointOnCircle, getAnglesDif } from "../calcArc";
import L from "leaflet";

describe("calcArc utils testing", () => {
    describe("getArcPoints function test", () => {
        test("valid values for getArcPoints function", () => {
            expect(() => getArcPoints(undefined as any, undefined as any, undefined as any, undefined as any, undefined)).toThrow(TypeError);
            expect(() => getArcPoints({ center: { lat: 1, lng: 3 } } as any, 1, 2, 3 as any, true)).not.toThrow(TypeError);
        })

        test("return value of getArcPoints", () => {
            expect(getPointOnCircle(0, 0, 100, 0)).toEqual(L.latLng([100, 0]))
            expect(getPointOnCircle(0, 0, 100, 90)).toEqual(L.latLng([0, 100]))
            expect(getPointOnCircle(0, 0, 100, 180)).toEqual(L.latLng([-100, 0]))
            expect(getPointOnCircle(0, 0, 100, 270)).toEqual(L.latLng([-0, -100]))
        })
    })
    describe("getAnglesDif function test", () => {
        test("valid values for getAnglesDif function", () => {
            expect(() => getAnglesDif(0, 90, true)).not.toThrow(TypeError);
        })

        test("return value of getAnglesDif", () => {
            expect(getAnglesDif(0, 180)).toEqual(180)
            expect(getAnglesDif(90, 90)).toEqual(0)
            expect(getAnglesDif(180, 180)).toEqual(0)
            expect(getAnglesDif(0, 90)).toEqual(90)
            expect(getAnglesDif(30, 80)).toEqual(50)
            expect(getAnglesDif(30, 20)).toEqual(350)
            expect(getAnglesDif(360, 20)).toEqual(20)
        })
    })
})
