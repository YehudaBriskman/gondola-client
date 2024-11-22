import React from 'react'
import { Polyline, Popup } from 'react-leaflet'
import { generateArcPoints } from '../../utils/calcArc'
import { ARC_COLOR } from '../../constants/legend'
import classes from "./map.module.css"
import Button from '../button/Button'

type UpdatedArc = {
  startPoint?: {
    Latitude: number;
    Longitude: number;
  };
  endPoint?: {
    Latitude: number;
    Longitude: number;
  };
  radius: number;
  centerPoint?: {
    Latitude: number;
    Longitude: number;
  };
  clockwise: boolean;
  startAngle: number;
  endAngle: number;
}

type TempArc = {
  arc: UpdatedArc
  type: "temp",
}

type ResArc = {
  arc: UpdatedArc
  type: "res",
}

type ReqArc = {
  arc: UpdatedArc
  type: "req",
  onEdit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

type DisplayArcProps = ReqArc | ResArc | TempArc


export default function DisplayArc(props: DisplayArcProps) {
  if (props.arc.startPoint && props.arc.endPoint) {
    const startPoint = { x: props.arc.startPoint.Latitude, y: props.arc.startPoint.Longitude }
    const endPoint = { x: props.arc.endPoint.Latitude, y: props.arc.endPoint.Longitude }
    const newPositions = generateArcPoints(startPoint, endPoint, props.arc.radius, props.arc.clockwise ? 1 : -1, 100)

    return <Polyline positions={newPositions} pathOptions={{
      color: ARC_COLOR,
      weight: 3
    }} >


      <Popup
        >
        <h2 className={classes.title}>{`Arc`}</h2>
        <div className={classes.popup}>
          <span>start Latitude</span>
          <span>{newPositions[0].lat.toFixed(6)}</span>
          <span>start Longitude</span>
          <span>{newPositions[0].lng.toFixed(6)}</span>
          <span>end Latitude</span>
          <span>{newPositions[newPositions.length - 1].lat.toFixed(6)}</span>
          <span>end Longitude</span>
          <span>{newPositions[newPositions.length - 1].lng.toFixed(6)}</span>
          <span>Radius</span>
          <span>{props.arc.radius}</span>
          <span>Clockwise</span>
          <span>{`${props.arc.clockwise}`}</span>
          <span>Degree Start</span>
          <span>{props.arc.startAngle}</span>
          <span>Degree End</span>
          <span>{props.arc.endAngle}</span>
        </div>
        {props.type === "req" && <div className={classes.buttonsAria}>
          <Button onClick={props.onEdit}>Edit</Button>
          <Button onClick={props.onDelete}>Delete</Button>
        </div>}
      </Popup>
    </Polyline>

  }

  // const positions = memo(() => (
  //   getArcPoints(props.arc.centerPoint, props.arc.startAngle, props.arc.endAngle, props.arc.radius, props.arc.clockwise)
  // ), [props.arc.endAngle, props.arc.startAngle, props.arc.clockwise, props.arc.centerPoint, props.arc.radius])


  return (
    <>
    </>
  )
}
