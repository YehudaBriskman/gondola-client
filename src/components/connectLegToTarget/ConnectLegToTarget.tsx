
import classes from "../../components/response/targetsList/targetList.module.css"
import { Target } from "../../gondola_types/navigationElements";

type Props = {
  editConnectionToLeg: (target: Target) => void,
  targets: Target[]
}

const ConnectLegToTarget = ({ editConnectionToLeg, targets }: Props) => {

  const iconPath = "M21.56 15.16h-1.56c-0.44-4.2-3.76-7.56-7.96-7.96v-1.56c0-0.48-0.36-0.84-0.84-0.84s-0.84 0.36-0.84 0.84v1.56c-4.2 0.4-7.56 3.76-7.96 7.96h-1.56c-0.48 0-0.84 0.36-0.84 0.84s0.36 0.84 0.84 0.84h1.56c0.4 4.2 3.76 7.56 7.96 7.96v1.56c0 0.48 0.36 0.84 0.84 0.84s0.84-0.36 0.84-0.84v-1.56c4.2-0.4 7.56-3.76 7.96-7.96h1.56c0.48 0 0.84-0.36 0.84-0.84s-0.4-0.84-0.84-0.84zM16.8 16.84h1.48c-0.4 3.28-3 5.88-6.24 6.24v-1.48c0-0.48-0.36-0.84-0.84-0.84s-0.84 0.36-0.84 0.84v1.48c-3.28-0.4-5.88-3-6.24-6.24h1.48c0.48 0 0.84-0.36 0.84-0.84s-0.36-0.84-0.84-0.84h-1.48c0.4-3.28 3-5.88 6.24-6.24v1.48c0 0.48 0.36 0.84 0.84 0.84s0.84-0.36 0.84-0.84v-1.48c3.28 0.4 5.88 3 6.24 6.24h-1.48c-0.48 0-0.84 0.36-0.84 0.84s0.4 0.84 0.84 0.84z";
  const colorsByPriority = ["red", "orange", "yellow", "#2bbb2b", "black"];

  return (
    <>

      {targets && targets.length !== 0 ?
        <>
          {targets.map((target: any, i: any) => (
            <div key={i} className={classes.target} onClick={() => {
              editConnectionToLeg(target)
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


    </>
  )
}

export default ConnectLegToTarget