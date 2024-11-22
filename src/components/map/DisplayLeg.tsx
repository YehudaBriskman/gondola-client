import React from 'react'
import { Polyline, Popup } from 'react-leaflet'
import { Leg } from '../../gondola_types/navigationElements'
import { ConvertPoint, calcRotation } from '../../utils/general'
import { LEG_COLOR } from '../../constants/legend'
import DisplayPoint from './DisplayPoint'
import classes from "./map.module.css"
import Button from '../button/Button'
import JSXMarker from '../JSXMarker'
import NavigationIcon from './NavigationIcon'


type TempLeg = {
  leg: Partial<Leg>,
  type: "temp",
  index?: number,
}

type ResLeg = {
  leg: Leg
  type: "res",
  index?: number
}
type ReqLeg = {
  leg: Leg
  type: "req",
  index?: number,
  onEdit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

type DisplayLegProps = ReqLeg | ResLeg | TempLeg

export default function DisplayLeg(props: DisplayLegProps) {
  const { leg, type, index } = props

  if (!leg.path?.startPoint || !leg.path?.endPoint) {
    return <></>;
  }

  return <>
    <Polyline positions={ConvertPoint.toLeafletPoint([leg.path?.startPoint, leg.path?.endPoint])} color={LEG_COLOR} >
      <Popup>
        <div className={classes.title}>
          <span>Leg</span>
          <span> {index}</span>
        </div>
        <div className={classes.popup}>
          <span>Start Point</span>
          <span>{leg.path?.startPoint.Latitude.toFixed(6) + "," + leg.path?.startPoint.Longitude.toFixed(6)}</span>
          <span>End Point</span>
          <span>{leg.path?.endPoint.Latitude.toFixed(6) + "," + leg.path?.endPoint.Longitude.toFixed(6)}</span>
          {leg.targetInfo && leg.targetInfo.length !== 0 &&
            <>
              <span>Targets Amount</span>
              <span>{leg.targetInfo.length}</span>
              <span>Targets</span>
              <span>{leg.targetInfo.map((targetInfo, i) => {
                return <span key={i}>{targetInfo.target.name}{leg.targetInfo?.length && i !== leg.targetInfo?.length - 1 ? ", " : ""}</span>
              })}</span>
            </>
          }
        </div>
        {type === "req" &&
          <div className={classes.buttonsAria}>
            <Button onClick={props.onEdit}>Edit</Button>
            <Button onClick={props.onDelete}>Delete</Button>
          </div>}
      </Popup>
      <JSXMarker position={[leg.path?.endPoint.Latitude, leg.path?.endPoint.Longitude]}>
        <NavigationIcon fill={"black"} style={{ rotate: `${calcRotation(leg.path?.startPoint, leg.path?.endPoint)}deg` }} />
      </JSXMarker>
    </Polyline >




    {(leg.targetInfo && leg.targetInfo.length !== 0) &&
      leg.targetInfo?.map((targetInfo, i) => (
        <React.Fragment key={i}>
          <Polyline positions={ConvertPoint.toLeafletPoint([targetInfo.path.startPoint, targetInfo.path.endPoint])} pathOptions={{
            color: "yellow",
            weight: 3
          }} >

            <Popup>
              <div className={classes.title}>
                <span>Target-Info</span>
                <span> {i + 1}</span>
              </div>
              <div className={classes.popup}>
                <span>Start Point</span>
                <span>{leg.path?.startPoint.Latitude.toFixed(6) + "," + leg.path?.startPoint.Longitude.toFixed(6)}</span>
                <span>End Point</span>
                <span>{leg.path?.endPoint.Latitude.toFixed(6) + "," + leg.path?.endPoint.Longitude.toFixed(6)}</span>
                <span>Target Name</span>
                <span>{targetInfo?.target.name}</span>
                <span>Altitude</span>
                <span>{leg.altitude}</span>
              </div>
              {type === "req" &&
                <div className={classes.buttonsAria}>
                  <Button onClick={props.onEdit}>Edit</Button>
                  <Button onClick={props.onDelete}>Delete</Button>
                </div>
              }
            </Popup>
          </Polyline>
          <DisplayPoint type='res' target={targetInfo.target} />

          <Polyline positions={ConvertPoint.toLeafletPoint([targetInfo.path.startPoint, targetInfo.target.point])} pathOptions={{ color: "#021526", weight: 2, dashArray: '8,8' }} />
          <Polyline positions={ConvertPoint.toLeafletPoint([targetInfo.path.endPoint, targetInfo.target.point])} pathOptions={{ color: "#021526", weight: 2, dashArray: '8,8' }} />

        </React.Fragment>
      ))
    }
  </>
}
