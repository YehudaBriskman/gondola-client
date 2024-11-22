import { useSelector } from "react-redux";
import classes from "./arcsList.module.css"
import { RootState } from "../../../store/store";
import { useMap } from "react-leaflet";
import { ConvertPoint } from "../../../utils/general";
import { createArcs } from "../../../utils/calcArc";

type Props = {
  mode: "req" | "res"
}

type UpdatedArc = {
  startPoint: {
    Latitude: number;
    Longitude: number;
  };
  endPoint: {
    Latitude: number;
    Longitude: number;
  };
  radius: number;
  centerPoint: {
    Latitude: number;
    Longitude: number;
  };
  clockwise: boolean;
  startAngle: number;
  endAngle: number;
}

export const ArcsList = (props: Props) => {
  const mode = props.mode
  const route = useSelector((state: RootState) => state.response.responseHolder)
  const requestArcs = useSelector((state: RootState) => state.arcs.arcHolder)
  const requestLegs = useSelector((state: RootState) => state.legs.legHolder)
  const requestTangentLines = useSelector((state: RootState) => state.tangentLines.tangentsLineHolder)
  const map = useMap()

  let arcs
  if (route?.legs && route?.arcs && route?.tangentLines && mode === "res")
    arcs = createArcs(route?.legs, route?.arcs, route?.tangentLines)
  else if (requestLegs && requestArcs && requestTangentLines && mode === "req")
    arcs = createArcs(requestLegs, requestArcs, requestTangentLines)

  return (
    <>
      <div>
        {arcs && arcs.length !== 0 ?
          <>
            {arcs.map((arc: UpdatedArc, i: number) => (
              <div key={i} className={classes.arc} onClick={() => {
                map.flyTo(ConvertPoint.toLeafletPoint(arc.centerPoint), undefined, { animate: true, duration: 2, })
              }}>
                <span>loc:</span><span>{arc.centerPoint.Latitude.toFixed(3)} - {arc.centerPoint.Longitude.toFixed(3)}</span>
              </div>
            ))}
          </>
          :
          <div className={classes.noArcs}> No Arcs</div>
        }
      </div>
    </>
  )
}
