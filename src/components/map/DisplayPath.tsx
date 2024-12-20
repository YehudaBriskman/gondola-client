import { Polyline, Popup } from "react-leaflet";
import JSXMarker from "../JSXMarker";
import { LatLngExpression } from "leaflet";
import { ENTRY_PATH_COLOR, EXIT_PATH_COLOR, TEMP_PATH_COLOR } from "../../constants/legend";
import { calcRotation } from "../../utils/general";
import NavigationIcon from "./NavigationIcon";
import classes from "./map.module.css";
import { Path } from "../../gondola_types/basicElements";

type DisplayPathProps = {
    path: Path | Partial<Path>;
    mode?: "req" | "res";
} & ({
    temp: true;
    type?: undefined;
} | {
    type: "entry" | "exit";
    temp?: undefined;
});

export default function DisplayPath({ path, type, temp }: DisplayPathProps) {
    // Make sure startPoint and endPoint are valid or set default values
    const startPoint = path.startPoint || { Latitude: 0, Longitude: 0 };
    const endPoint = path.endPoint || { Latitude: 0, Longitude: 0 };

    const PathLatLong: LatLngExpression[] = [
        {
            lat: startPoint.Latitude,
            lng: startPoint.Longitude
        },
        {
            lat: endPoint.Latitude,
            lng: endPoint.Longitude
        }
    ];

    // Determine the path color
    const color = temp
        ? TEMP_PATH_COLOR
        : type === "entry"
        ? ENTRY_PATH_COLOR
        : EXIT_PATH_COLOR;

    return (
        <>
            <Polyline positions={PathLatLong} color={color}>
                <JSXMarker position={[endPoint.Latitude, endPoint.Longitude]}>
                    <NavigationIcon
                        fill={color}
                        style={{
                            rotate: `${calcRotation(startPoint, endPoint)}deg`
                        }}
                    />
                </JSXMarker>
                <Popup>
                    <div className={classes.title}>
                        <span>{temp ? `temp` : type} path</span>
                    </div>
                    <div className={classes.popup}>
                        <span>startPoint</span>
                        <span>
                            {startPoint.Latitude.toFixed(6)},{startPoint.Longitude.toFixed(6)}
                        </span>
                        <span>endPoint</span>
                        <span>
                            {endPoint.Latitude.toFixed(6)},{endPoint.Longitude.toFixed(6)}
                        </span>
                    </div>
                </Popup>
            </Polyline>
        </>
    );
}
