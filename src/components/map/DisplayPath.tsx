import { Polyline, Popup } from "react-leaflet";
import JSXMarker from "../JSXMarker";
import { LatLngExpression } from "leaflet";
import { ENTRY_PATH_COLOR, EXIT_PATH_COLOR, TEMP_PATH_COLOR } from "../../constants/legend";
import { calcRotation } from "../../utils/general";
import NavigationIcon from "./NavigationIcon";
import classes from "./map.module.css";
import { Path } from "../../gondola_types/basicElements";


type DisplayPathProps = {
    path: Path
    mode?: "req" | "res"
} & ({
    temp: true
    type?: undefined
} | {
    type: "entry" | "exit";
    temp?: undefined
})


export default function DisplayPath({ path, type, temp }: DisplayPathProps) {
    const PathLatLong: LatLngExpression[] = [{
        lat: path.startPoint.Latitude || 0,
        lng: path.startPoint.Longitude || 0
    }, {
        lat: path.endPoint.Latitude || 0,
        lng: path.endPoint.Longitude || 0
    }];

    const color = temp ? TEMP_PATH_COLOR : type === "entry" ? ENTRY_PATH_COLOR : EXIT_PATH_COLOR;
    return <>
        <Polyline positions={PathLatLong} color={color} >
            <JSXMarker position={[path.endPoint.Latitude, path.endPoint.Longitude]}>
                <NavigationIcon fill={color} style={{ rotate: `${calcRotation(path.startPoint, path.endPoint)}deg` }} />
            </JSXMarker>
            <Popup>
                <div className={classes.title}>
                    <span>{temp ? `temp` : type} path</span>
                </div>
                <div className={classes.popup}>
                    <span>startPoint</span>
                    <span>{path.startPoint.Latitude.toFixed(6) + "," + path.startPoint.Longitude.toFixed(6)}</span>
                    <span>endPoint</span>
                    <span>{path.endPoint.Latitude.toFixed(6) + "," + path.endPoint.Longitude.toFixed(6)}</span>
                </div>
            </Popup>
        </Polyline>
    </>
}
