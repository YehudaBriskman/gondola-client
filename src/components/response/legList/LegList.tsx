import { useSelector } from 'react-redux';
import classes from './legList.module.css'
import { useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { RootState } from '../../../store/store';
import { Path } from '../../../gondola_types/basicElements';
import { Leg } from '../../../gondola_types/navigationElements';


type Status = 'success' | 'failed' | 'default' | 'sending'

interface Plane {
  legs: Leg[];
}

interface ResponseData {
  legs?: Leg[]
  planes?: Plane[]
}


const LegList = () => {

  const response = useSelector((state: RootState) => state.response.responseHolder) as ResponseData | null
  const entryPath = useSelector((state: RootState) => state.response.responseHolder?.entryPath) as Path | null
  const exitPath = useSelector((state: RootState) => state.response.responseHolder?.exitPath) as Path | null

  const map = useMap()

  const getMiddlePoint = ({ startPoint, endPoint }: Path) => {
    const midLat = (startPoint.Latitude + endPoint.Latitude) / 2
    const midLong = (startPoint.Longitude + endPoint.Longitude) / 2
    return [midLat, midLong] as LatLngExpression
  }

  const leg_colors: Record<Status, string> = {
    success: "#2bbb2b",
    failed: "red",
    default: "white",
    sending: "#3388ff"
  }

  const getLegStatus = (leg: Leg): Status => {
    return 'sending'
  }

  const planes = response?.planes ? response.planes : (response?.legs && response.legs.length !== 0) ? [{ legs: (response.legs[0].path === entryPath && response.legs[response.legs.length - 1].path === exitPath) ? response.legs.slice(1, -1) : response.legs }] : null
  if (planes?.length === 1) planes.push({ legs: [] })

  return (
    <>
      {(entryPath && exitPath) ?
        <div className={classes.pathes}>
          <div className={classes.path} onClick={() => { map.flyTo(getMiddlePoint(entryPath), undefined, { animate: true, duration: 2, }) }}>
            <span>Entry Path</span>
          </div>
          <div className={classes.path} onClick={() => { map.flyTo(getMiddlePoint(exitPath), undefined, { animate: true, duration: 2, }) }}>
            <span>Exit Path</span>
          </div>
        </div>
        :
        <div className={`${classes.listContainer} ${classes.marginB}`}>
          No Entry/Exit paths
        </div>
      }


      <div className={classes.listContainer}>
        {planes ?
          <>
            {planes.map((plane, i) => (
              <div className={classes.border} key={i} >
                <p className={classes.plane_name}>{`Plane ${i === 0 ? 'A' : 'B'}`}</p>
                {(plane.legs && plane.legs.length > 0) ?
                  plane.legs.map((leg, index) => (
                    <div className={classes.table_content} key={index}
                      onClick={() => {
                        map.flyTo(getMiddlePoint(leg.path), undefined, { animate: true, duration: 2, })
                      }}>
                      <hr className={classes.leg_row} style={{ color: leg_colors[getLegStatus(leg)] }} />
                      {`Leg ${index + 1}`}
                    </div>
                  ))
                  :
                  <div className={classes.table_content}>No Legs</div>
                }
              </div>
            ))}
          </>
          :
          <div>No planes</div>
        }
      </div>
    </>
  )
}

export default LegList;
