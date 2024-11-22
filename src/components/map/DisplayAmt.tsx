import { Circle, } from "react-leaflet";
import { Point } from "../../gondola_types/basicElements";

type Amt = {
    center: Point;
    radius: number;
    show: boolean;
};

export default function DisplayAmt(amt: Amt) {

    const colors = ["#000", "#444", "#116", "#611", "#161", "#155", "#551", "#355", "#515", "#147"] as const

    const { center, radius, show } = amt;
    const randomIndex = parseInt(radius.toString()[radius.toString().length - 1])
    const colorindex = randomIndex % colors.length
    const color = colors[colorindex];

    return (
        <>
            {show && <Circle
                center={[center.Latitude, center.Longitude]}
                radius={radius / 1000}
                pathOptions={{
                    color,
                    fillOpacity: 0.1
                }}
            />}
        </>
    )
}

