import React from 'react'
import { Polyline, Popup } from 'react-leaflet'
import { TangentLine } from '../../gondola_types/navigationElements'
import { ConvertPoint, calcRotation } from '../../utils/general'
import classes from "./map.module.css"
import Button from '../button/Button'
import JSXMarker from '../JSXMarker'
import NavigationIcon from './NavigationIcon'
type TempTangentLine = {
  tangentLine: Partial<TangentLine>,
  type: "temp",
  index?: number,
}

type ResTangentLine = {
  tangentLine: TangentLine
  type: "res",
  index?: number,
}
type ReqTangentLine = {
  tangentLine: TangentLine
  type: "req",
  index?: number,
  onEdit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

type DisplayTangentLineProps = ReqTangentLine | ResTangentLine | TempTangentLine




export default function DisplayLeg(props: DisplayTangentLineProps) {
  const { tangentLine, type, index } = props

  if (!tangentLine || !tangentLine.startPoint || !tangentLine.endPoint) {
    return <></>;
  }

  return <>
    <Polyline positions={ConvertPoint.toLeafletPoint([tangentLine.startPoint, tangentLine.endPoint])} color="green">
      <Popup>
        <div className={classes.title}>
          <span>Tangent Line</span>
          <span> {index}</span>
        </div>
        <div className={classes.popup}>
          <span>startPoint</span>
          <span>{tangentLine.startPoint.Latitude.toFixed(6) + "," + tangentLine.startPoint.Longitude.toFixed(6)}</span>
          <span>endPoint</span>
          <span>{tangentLine.endPoint.Latitude.toFixed(6) + "," + tangentLine.endPoint.Longitude.toFixed(6)}</span>
        </div>
        {type === "req" &&
          <div className={classes.buttonsAria}>
            <Button onClick={props.onEdit}>Edit</Button>
            <Button onClick={props.onDelete}>Delete</Button>
          </div>}
      </Popup>
    </Polyline>
    <JSXMarker position={[tangentLine.endPoint.Latitude, tangentLine.endPoint.Longitude]}>
      <NavigationIcon fill={"black"} style={{ rotate: `${calcRotation(tangentLine.startPoint, tangentLine.endPoint)}deg` }} />
    </JSXMarker>
  </>
}
