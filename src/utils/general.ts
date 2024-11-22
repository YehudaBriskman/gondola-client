import { LeafletMouseEvent } from "leaflet"
import { COORDINATE_PRECISION } from "../constants"
import { Path, Point } from "../gondola_types/basicElements";
import { LeafletPoint } from "../gondola_types/navigationElements";

/**
 * Reducing coordinate precision to `1e-COORDINATE_PRECISION`  
 */
export function getFixedPoint(e: LeafletMouseEvent) {
    const lat = Number(e.latlng.lat.toFixed(COORDINATE_PRECISION));
    const lng = Number(e.latlng.lng.toFixed(COORDINATE_PRECISION));
    const alt = e.latlng.alt;
    return { lat, lng, alt }
}

export const calcRotation = (start: Point, end: Point) => {
    const angleRadians = Math.atan2(
        end.Latitude - start.Latitude,
        end.Longitude - start.Longitude
    )
    return 90 - angleRadians * 180 / Math.PI
}

export class ConvertPoint {
    /**
     * Convert point key `lng` to `long`
     */
    static fromLeafletPoint(point: LeafletPoint): Point;
    static fromLeafletPoint(point: LeafletPoint[]): Point[];
    static fromLeafletPoint(point: LeafletPoint | LeafletPoint[]): Point | Point[] {
        if ("lat" in point) {
            return { Latitude: point.lat, Longitude: point.lng }
        }
        return point.map(point => ConvertPoint.fromLeafletPoint(point))
    }

    /**
     * Convert point key `long` to `lng`
     */
    static toLeafletPoint(point: Point): LeafletPoint;
    static toLeafletPoint(point: Point[]): LeafletPoint[];
    static toLeafletPoint(point: Point | Point[]): LeafletPoint | LeafletPoint[] {
        if ("Latitude" in point) {
            return { lat: point.Latitude, lng: point.Longitude }
        }
        return point.map(point => ConvertPoint.toLeafletPoint(point))
    }
}

export function getCurvedLine({ startPoint: { Latitude: lat1, Longitude: lon1 }, endPoint: { Latitude: lat2, Longitude: lon2 } }: Path): LeafletPoint[] {
    const endPoint = {
        lat: lat2, lng : lon2
    }
    function toRadians(degrees: number) {
        return degrees * Math.PI / 180
    }
    function toDegrees(radians: number) {
        return radians * Math.PI / 180
    }
    function harvestingDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
        const R = 6371;
        lat1 = toRadians(lat1)
        lat2 = toRadians(lat2)
        lon1 = toRadians(lon1)
        lon2 = toRadians(lon2)
        const dLat = lat2 - lat1;
        const dLon = lon2 - lon1;
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return R * c;
    }
    const interval = 10

    let points: LeafletPoint[] = []
    let totalDistance = harvestingDistance(lat1, lon1, lat2, lon2);
    let numPoints = Math.floor(totalDistance / interval);

    lat1 = toRadians(lat1);
    lat2 = toRadians(lat2);
    lon1 = toRadians(lon1);
    lon2 = toRadians(lon2);

    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;

    const a = Math.sin(deltaLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;
    const deltaSigma = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    for (let i = 0; i <= numPoints; i++) {
        const fraction = (i * interval) / totalDistance;
        const A = Math.sin((1 - fraction) * deltaSigma) / Math.sin(deltaSigma);
        const B = Math.sin(fraction * deltaSigma) / Math.sin(deltaSigma);

        const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2)
        const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2)
        const z = A * Math.sin(lat1) + B * Math.sin(lat2);
        const lat = Math.atan2(z, Math.sqrt(x * x + y * y))
        const lon = Math.atan2(y, x)
        const d = 3282.80635
        points.push({ lat: toDegrees(lat) * d, lng: toDegrees(lon) * d })
    }

    points.push(endPoint)
    return points
}
