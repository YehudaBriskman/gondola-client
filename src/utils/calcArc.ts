import L, { LatLngExpression } from "leaflet"
import { Path, Point } from "../gondola_types/basicElements"
import { Arc, LeafletPoint, Leg, TangentLine } from "../gondola_types/navigationElements"

type ArcPoint = { x: number, y: number }
type Direction = 1 | -1

export function getPointOnCircle(cx: number, cy: number, radius: number, angle: number) {
    const angleRadians = (angle * Math.PI)
    radius /= 100000
    const x = cx + radius * Math.cos(angleRadians)
    const y = cy + radius * Math.sin(angleRadians)
    return L.latLng(x, y)
}

export function getAnglesDif(start: number, end: number, direction: boolean = false) {
    const diff = (end - start + 360) % 360
    return direction ? (360 - diff) % 360 : diff;
}

/**
 * Get arc points
 * @param {boolean} direction arc direction is counter clock wise
 */
export default function getArcPoints(center: Point, start: number, end: number, radius: number, direction: boolean = false) {
    const points: number[] = [];
    const diff = getAnglesDif(start, end, direction)
    const mul = direction ? -1 : 1


    for (let i = 0; i < 1000; i++) {
        const currentAngle = (start - 90) + (diff / (1000)) * i * mul
        points.push(currentAngle);
    }
    return points.map(p => getPointOnCircle(center.Latitude, center.Longitude, radius, -p))
}

export const getMiddlePoint = ({ startPoint, endPoint }: Path) => {
    const midLat = (startPoint.Latitude + endPoint.Latitude) / 2
    const midLong = (startPoint.Longitude + endPoint.Longitude) / 2
    return [midLat, midLong] as LatLngExpression
}

export function createArcs(legs: Leg[], arcs: Arc[], tangentLines: TangentLine[]) {
    let resultArcs = [];
    for (let i = 0; i < arcs.length; i++) {
        let startPoint, endPoint;
        if (i % 2 === 0) {
            startPoint = legs[Math.floor(i / 2)].path.endPoint
            endPoint = tangentLines[Math.floor(i / 2)].startPoint
        } else {
            startPoint = tangentLines[Math.floor(i / 2)].endPoint
            endPoint = legs[Math.floor(i / 2) + 1].path.startPoint
        }
        resultArcs.push({ ...arcs[i], startPoint, endPoint })
    }
    return resultArcs
}

export function generateCenterPoint(
    start: Point,
    end: Point
){
    const centerPoint: Point = {
        Latitude: (start.Latitude + end.Latitude) / 2,
        Longitude: (start.Longitude + end.Longitude) / 2,
    }
    return centerPoint
}

export function generateArcPoints(
    start: ArcPoint,
    end: ArcPoint,
    radius: number,
    direction: Direction,
    numPoints: number,
): LeafletPoint[] {
    const midPoint: ArcPoint = {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2,
    };
    radius /= 100000



    const distanceBetweenPoints = Math.sqrt(
        Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
    );




    let distanceToCenter
    if (Math.pow(radius, 2) > Math.pow(distanceBetweenPoints / 2, 2))
        distanceToCenter = Math.sqrt(
            Math.pow(radius, 2) - Math.pow(distanceBetweenPoints / 2, 2)
        );
    else distanceToCenter = Math.sqrt(
        -Math.pow(radius, 2) + Math.pow(distanceBetweenPoints / 2, 2)
    );

    const angle = Math.atan2(end.y - start.y, end.x - start.x);

    const perpAngle = angle + Math.PI / 2 * direction

    const center: ArcPoint = {
        x: midPoint.x + distanceToCenter * Math.cos(perpAngle),
        y: midPoint.y + distanceToCenter * Math.sin(perpAngle)
    };

    // const center = centerPoint
    const startAngle = Math.atan2(start.y - center.y, start.x - center.x);
    let endAngle = Math.atan2(end.y - center.y, end.x - center.x);

    if (direction === 1 && endAngle <= startAngle) {
        endAngle += 2 * Math.PI
    } else if (direction === -1 && endAngle >= startAngle) {
        endAngle -= 2 * Math.PI
    }

    const points: LeafletPoint[] = [];
    const angleIncrement = (endAngle - startAngle) / (numPoints - 1)

    for (let index = 0; index < numPoints; index++) {
        const angle = startAngle + index * angleIncrement;

        const point = L.latLng(center.x + radius * Math.cos(angle), center.y + radius * Math.sin(angle))
        points.push(
            point
        )
    }
    return points
}