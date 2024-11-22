import { useSelector } from 'react-redux';
import classes from './generalList.module.css'
import { RootState } from '../../../store/store';
import { General } from '../../../gondola_types/navigationElements';

type Props = { mode: "res" | "req" }


const GeneralList = (props: Props) => {

  const reqResponse = useSelector((state: RootState) => state.general.generalHolder) as General | null
  let windDirection = useSelector((state: RootState) => state.response.responseHolder?.windDirection)
  let speed = useSelector((state: RootState) => state.response.responseHolder?.speed)
  let altitude = useSelector((state: RootState) => state.response.responseHolder?.altitude)
  let windSpeed = useSelector((state: RootState) => state.response.responseHolder?.windSpeed)
  let photoDelayAtStart = useSelector((state: RootState) => state.response.responseHolder?.photoDelayAtStart)
  let radius = useSelector((state: RootState) => state.response.responseHolder?.radius)
  const resResponse = { windDirection, speed, windSpeed, altitude, photoDelayAtStart, radius }
  const response = (props.mode === 'req') ? reqResponse : resResponse

  return (
    <div>
      {response && <>
          <div className={classes.general_line}> <span>Speed:</span><span>{response.speed ? response.speed : 0}</span></div>
        
          <div className={classes.general_line}> <span>Altitude:</span><span>{response.altitude ? response.altitude : 0}</span></div>
        
          <div className={classes.general_line}> <span>Wind Direction:</span><span>{response.windDirection ? response.windDirection : 0}</span></div>
        
          <div className={classes.general_line}> <span>Wind Speed:</span><span>{response.windSpeed ? response.windSpeed : 0}</span></div>
        
          <div className={classes.general_line}> <span>Photo delay in start:</span><span>{response.photoDelayAtStart ? response.photoDelayAtStart : 0}</span></div>
        
          <div className={classes.general_line}> <span>Radius:</span><span>{response.radius ? response.radius : 0}</span></div>
        
      </>}
    </div>
  )
}

export default GeneralList;
