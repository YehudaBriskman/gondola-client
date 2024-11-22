import { CircleMarker, Marker, Popup } from "react-leaflet";
import classes from "./map.module.css"
import Button from "../button/Button";
import L from "leaflet"
import { LeafletPoint, Target } from "../../gondola_types/navigationElements";

type TempPoint = {
    type: "temp";
    point: LeafletPoint;
    priority: number
}
type ResPoint = {
    type: "res";
    target: Target
}
type ReqPoint = {
    type: "req";
    target: Target;
    onEdit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    onDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

type DisplayPointProps = ResPoint | ReqPoint | TempPoint


export default function DisplayPoint(props: DisplayPointProps) {
    const colorsByPriority = ["red", "orange", "yellow", "#2bbb2b", "black"] as const;
    const selectedColor = props.type === "temp" ? colorsByPriority[props.priority - 1] : colorsByPriority[props.target.priority - 1];
    const { lat, lng } = props.type === "temp" ? props.point : { lat: props.target.point.Latitude, lng: props.target.point.Longitude };
    const showFill = props.type !== "temp"
    const targetIcon = L.divIcon({
        html: `<svg fill=${selectedColor} width="100%" height="100%" viewBox="-5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#eb0000" stroke-width="0.00032">
        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                <g id="SVGRepo_iconCarrier"> <title>target</title> <path d="M21.56 15.16h-1.56c-0.44-4.2-3.76-7.56-7.96-7.96v-1.56c0-0.48-0.36-0.84-0.84-0.84s-0.84 0.36-0.84 0.84v1.56c-4.2 0.4-7.56 3.76-7.96 7.96h-1.56c-0.48 0-0.84 0.36-0.84 0.84s0.36 0.84 0.84 0.84h1.56c0.4 4.2 3.76 7.56 7.96 7.96v1.56c0 0.48 0.36 0.84 0.84 0.84s0.84-0.36 0.84-0.84v-1.56c4.2-0.4 7.56-3.76 7.96-7.96h1.56c0.48 0 0.84-0.36 0.84-0.84s-0.4-0.84-0.84-0.84zM16.8 16.84h1.48c-0.4 3.28-3 5.88-6.24 6.24v-1.48c0-0.48-0.36-0.84-0.84-0.84s-0.84 0.36-0.84 0.84v1.48c-3.28-0.4-5.88-3-6.24-6.24h1.48c0.48 0 0.84-0.36 0.84-0.84s-0.36-0.84-0.84-0.84h-1.48c0.4-3.28 3-5.88 6.24-6.24v1.48c0 0.48 0.36 0.84 0.84 0.84s0.84-0.36 0.84-0.84v-1.48c3.28 0.4 5.88 3 6.24 6.24h-1.48c-0.48 0-0.84 0.36-0.84 0.84s0.4 0.84 0.84 0.84z"/> </g>
                </svg>`,
        iconSize: [40,40],
        className: classes.targetIcon
    })
    return (
        <>
            {props.type === "temp" && <CircleMarker pathOptions={{ color: selectedColor, fill: showFill, stroke: !showFill }} fillOpacity={1} center={{ lat, lng }} />}
            {props.type !== "temp" && (<Marker icon={targetIcon} position={{ lat, lng }} >
                <Popup position={[lat, lng]}>
                    <h2 className={classes.title}>{props.target.name}</h2>
                    <div className={classes.popup}>
                        <span>Latitude</span>
                        <span>{props.target.point.Latitude.toFixed(6)}</span>
                        <span>Longitude</span>
                        <span>{props.target.point.Longitude.toFixed(6)}</span>
                        <span>Priority</span>
                        <span>{props.target.priority}</span>
                        <span>Quality</span>
                        <span>{props.target.quality}</span>
                        <span>Photo direction</span>
                        <span>{props.target.photoDirection || "Not set"}</span>
                    </div>
                    {props.type === "req" && <div className={classes.buttonsAria}>
                        <Button onClick={props.onEdit}>Edit</Button>
                        <Button onClick={props.onDelete}>Delete</Button>
                    </div>}
                </Popup>
            </Marker>)
            }
        </>
    )
}
