import { useSelector } from "react-redux";
import classes from "./targetList.module.css"
import { RootState } from "../../../store/store";
import { useMap } from "react-leaflet";
import { ConvertPoint } from "../../../utils/general";
import { Leg, Target } from "../../../gondola_types/navigationElements";
import { convertTargetsToCSV, downloadFile } from "../../../utils/csv/handleCSVTargets";
import { alertInput } from "../../../utils/alerts/alerts";




type Props = {
  mode: "req" | "res"

}

export const TargetsList = ({ mode, }: Props) => {


  const colorsByPriority = ["red", "orange", "yellow", "#2bbb2b", "black"];
  const response = useSelector((state: RootState) => state.response.responseHolder)
  const request = useSelector((state: RootState) => state.targets.targetsHolder)
  const map = useMap()
  const iconPath = "M21.56 15.16h-1.56c-0.44-4.2-3.76-7.56-7.96-7.96v-1.56c0-0.48-0.36-0.84-0.84-0.84s-0.84 0.36-0.84 0.84v1.56c-4.2 0.4-7.56 3.76-7.96 7.96h-1.56c-0.48 0-0.84 0.36-0.84 0.84s0.36 0.84 0.84 0.84h1.56c0.4 4.2 3.76 7.56 7.96 7.96v1.56c0 0.48 0.36 0.84 0.84 0.84s0.84-0.36 0.84-0.84v-1.56c4.2-0.4 7.56-3.76 7.96-7.96h1.56c0.48 0 0.84-0.36 0.84-0.84s-0.4-0.84-0.84-0.84zM16.8 16.84h1.48c-0.4 3.28-3 5.88-6.24 6.24v-1.48c0-0.48-0.36-0.84-0.84-0.84s-0.84 0.36-0.84 0.84v1.48c-3.28-0.4-5.88-3-6.24-6.24h1.48c0.48 0 0.84-0.36 0.84-0.84s-0.36-0.84-0.84-0.84h-1.48c0.4-3.28 3-5.88 6.24-6.24v1.48c0 0.48 0.36 0.84 0.84 0.84s0.84-0.36 0.84-0.84v-1.48c3.28 0.4 5.88 3 6.24 6.24h-1.48c-0.48 0-0.84 0.36-0.84 0.84s0.4 0.84 0.84 0.84z";

  const processLegs = (response: any): Target[] => {
    let targets: any = []
    if (response?.legs) {
      for (let index = 0; index < response.legs.length; index++) {
        const smallTargets = getTargetCount(response.legs[index])
        if (Array.isArray(smallTargets) && smallTargets.length !== 0) {
          targets = [...targets, ...smallTargets]
        }
      }
    }
    return targets
  }

  const getTargetCount = (leg: Leg) => {
    let targets = []
    if (leg.targetInfo) {
      for (let index = 0; index < leg.targetInfo.length; index++) {
        targets.push(leg.targetInfo[index].target)
      }
    }
    return targets
  }

  const resTargets = processLegs(response)

  const downloadTargets = async () => {
    console.log("DDD");

    const targets = mode === "res" ? resTargets : request
    const csvData = convertTargetsToCSV(targets)
    const fileName = await alertInput("file-name", "text")
    console.log(fileName);

    if (fileName === null) return
    downloadFile(csvData, "csv", fileName)
  }

  return (
    <>
      {mode === "res" ?
        <div>
          {resTargets && resTargets.length !== 0 ?
            <>
              <div className={classes.target} onClick={() => downloadTargets()}>
                <svg className={classes.svgIcon} fill={colorsByPriority[1]} width="2rem" height="2rem" viewBox="-5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path d={iconPath} />
                </svg>
                Download CSV
              </div>

              {resTargets.map((target: Target, i: number) => (

                <div key={i} className={classes.target} onClick={() => {
                  map.flyTo(ConvertPoint.toLeafletPoint(target.point), undefined, { animate: true, duration: 2, })
                }}>
                  <svg className={classes.svgIcon} fill={colorsByPriority[target.priority - 1]} width="2rem" height="2rem" viewBox="-5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d={iconPath} />
                  </svg>
                  {target.name} ({target.point.Latitude.toFixed(2)},{target.point.Longitude.toFixed(2)})
                </div>
              ))}
            </>
            :
            <div className={classes.noTargets}> No Targets</div>
          }
        </div>
        :
        <div>
          {request && request.length !== 0 ?
            <>
              {request.map((target, i) => (
                <div key={i} className={classes.target} onClick={() => {
                  map.flyTo(ConvertPoint.toLeafletPoint(target.point), undefined, { animate: true, duration: 2, })

                }}>
                  <svg className={classes.svgIcon} fill={colorsByPriority[target.priority - 1]} width="2rem" height="2rem" viewBox="-5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d={iconPath} />
                  </svg>
                  {target.name} ({target.point.Latitude.toFixed(2)},{target.point.Longitude.toFixed(2)})
                </div>
              ))}
            </>
            :
            <div className={classes.noTargets}> No Targets</div>
          }
        </div>
      }
    </>
  )
}
