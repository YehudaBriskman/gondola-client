import { useSelector } from "react-redux";
import classes from "./tangentLinesList.module.css"
import { RootState } from "../../../store/store";
import { useMap } from "react-leaflet";
import { ConvertPoint } from "../../../utils/general";
import { TangentLine } from "../../../gondola_types/navigationElements";
import { Path } from "../../../gondola_types/basicElements";

type Props = {
  mode: "req" | "res"
}

export const TangentLines = (props: Props) => {
  const mode = props.mode
  const response = useSelector((state: RootState) => state.response.responseHolder?.tangentLines)
  const request = useSelector((state: RootState) => state.tangentLines.tangentsLineHolder)
  const map = useMap()

  const getMiddlePoint = ({ startPoint, endPoint }: Path) => {
    const midLat = (startPoint.Latitude + endPoint.Latitude) / 2
    const midLong = (startPoint.Longitude + endPoint.Longitude) / 2
    return {Latitude:midLat, Longitude:midLong}
  }



  return (
    <>
      {mode === "res" ?

        <div>
          {response && response.length !== 0 ?
            <>
              {response.map((tangentLine:TangentLine,i:number) => (
                <div key={i} className={classes.tangentLine} onClick={() => {
                  map.flyTo( ConvertPoint.toLeafletPoint(getMiddlePoint(tangentLine)), undefined, { animate: true, duration: 2, })
                }}>
                  <span>loc:</span><span>{tangentLine.startPoint.Latitude.toFixed(3)} - {tangentLine.startPoint.Longitude.toFixed(3)}</span>
                </div>
              ))}
            </>
            :
            <div className={classes.noTangentLines}> No TangentLines</div>
          }
        </div>
        :
        <div>
          {request && request.length !== 0 ?
            <>
              {request.map((tangentLine:TangentLine,i:number) => (
                <div key={i} className={classes.tangentLine} onClick={() => {
                  map.flyTo( ConvertPoint.toLeafletPoint(getMiddlePoint(tangentLine)), undefined, { animate: true, duration: 2, })
                }}>
                  <span>loc:</span><span>{tangentLine.startPoint.Latitude.toFixed(3)} - {tangentLine.startPoint.Longitude.toFixed(3)}</span>
                </div>
              ))}
            </>
            :
            <div className={classes.noTangentLines}> No TangentLines</div>
          }
        </div>
      }
    </>
  )
}
