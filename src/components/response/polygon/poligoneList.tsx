import { useSelector } from "react-redux";
import classes from "./polygonList.module.css"
import { RootState } from "../../../store/store";
import { useMap } from "react-leaflet";
import { ConvertPoint } from "../../../utils/general";

export const PolygonList = () => {

  const flyzone = useSelector((state: RootState) => state.response.responseHolder?.flyZone)

  const map = useMap();


  return (<>
    <div className={classes.listContainer}>
      {flyzone ?
        <>
          {flyzone?.map((point, i) => (
            <div key={i} className={classes.point} onClick={() => {
              map.flyTo(ConvertPoint.toLeafletPoint(point), undefined, { animate: true, duration: 2, })
            }}>
                <div className={classes.hr} />
                <span>{point.Latitude.toFixed(3)} - {point.Longitude.toFixed(3)}</span>
            </div>
          ))}
        </>
        :
        <div className={classes.noFlyzone}> No Fly zone</div>
      }
    </div>
  </>
  )
}
