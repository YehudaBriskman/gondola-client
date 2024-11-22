import { useState } from "react";
import { LeafletPoint } from "../../../gondola_types/navigationElements";
import Input from "../../inputs/Input";
import Button from "../../button/Button";
import classes from "./displayPointData.module.css"

type DisplayPointDataProps = {
    point: LeafletPoint;
    onEdit: (lat: number, lng: number) => void;
    onRemove: () => void;
}
export default function DisplayPointData({ point, onEdit, onRemove }: DisplayPointDataProps) {
    const [lat, setLat] = useState(point.lat)
    const [lng, setLng] = useState(point.lng)
    const [edit, setEdit] = useState(false);

    const onEditPoint = () => {
        if(window.confirm(`are you sure about edit this polygon point ?`))
        onEdit(lat, lng);
        setEdit(false);
    }
    const removePoint = () => {
        if(window.confirm(`are you sure about delete this polygon point ?`))
        onRemove()
    }
    const onCancel = () => {
        setLat(point.lat)
        setLng(point.lng)
        setEdit(false)
    }
    return (
        <div className={classes.polygonPoint}>
            {edit ? <>
                <Input type="number" value={lat} onChange={e => setLat(Number(e.currentTarget.value))} />
                <Input type="number" value={lng} onChange={e => setLng(Number(e.currentTarget.value))} />
                <Button data-testid={lat+"c"} variant="standard" onClick={onCancel}>c</Button>
                <Button data-testid={lat+"s"} variant="standard" onClick={onEditPoint}>s</Button>
            </> : <>
                <span><b>Lat:</b> {lat.toFixed(6)}</span>
                <span><b>Lng:</b> {lng.toFixed(6)}</span>
                <Button data-testid={lat+"e"} className={classes.editButton} variant="standard" onClick={() => setEdit(true)}>e</Button>
                <Button data-testid={lat+"r"} className={classes.editButton} variant="standard" onClick={removePoint}>r</Button>
            </>
            }
        </div>
    )
}
