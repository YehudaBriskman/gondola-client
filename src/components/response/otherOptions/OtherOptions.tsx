import { useDispatch, useSelector } from "react-redux";
import classes from "./otherOptions.module.css"
import { RootState } from "../../../store/store";
import { alertInput, alertPermission, toastAlert } from "../../../utils/alerts/alerts";
import { clearPolygon, setPolygon } from "../../../store/slices/polygonSlice";
import { clearTargets, setTargets } from "../../../store/slices/targetsSlice";
import { clearPath, setPath } from "../../../store/slices/requestRouteSlice";
import { setGeneral } from "../../../store/slices/generalSlice";
import { clearLegs, setLegs } from "../../../store/slices/legSlice";
import { clearArcs, setArcs } from "../../../store/slices/arcSlice";
import { clearTangentLines, setTangentLines } from "../../../store/slices/tangentLineSlice";
import { useNavigate } from "react-router-dom";
import loadIcon from '../../../assets/icons/curved-arrow-svgrepo-com.svg'
import downloadIcon from '../../../assets/icons/upload-minimalistic-svgrepo-com.svg'
import { downloadFile } from "../../../utils/csv/handleCSVTargets";

export const OtherOptions = () => {

    const route = useSelector((state: RootState) => state.response.responseHolder)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function lodeToCreationMode() {
        const permission = await alertPermission("Wait!", "are you sure? all of the data in the creation mode will be re-writing")

        if (permission) {
            if (route?.flyZone) dispatch(setPolygon(route.flyZone))
            else dispatch(clearPolygon())
            if (route?.targets) dispatch(setTargets(route.targets))
            else dispatch(clearTargets())
            if (route?.entryPath) dispatch(setPath({ path: route.entryPath, type: "entry" }))
            else dispatch(clearPath({ type: "entry" }))
            if (route?.exitPath) dispatch(setPath({ path: route.exitPath, type: "exit" }))
            else dispatch(clearPath({ type: "exit" }))
            if (route?.speed && route.altitude && route.photoDelayAtStart && route.radius && route.windSpeed && route.windDirection) dispatch(setGeneral({
                photoDelayAtStart: route.photoDelayAtStart,
                windDirection: route.windDirection,
                windSpeed: route.windSpeed,
                speed: route.speed,
                radius: route.radius,
                altitude: route.altitude
            }))
            if (route?.legs) dispatch(setLegs(route.legs))
            else dispatch(clearLegs())
            if (route?.arcs) dispatch(setArcs(route.arcs))
            else dispatch(clearArcs())
            if (route?.tangentLines) dispatch(setTangentLines(route.tangentLines))
            else dispatch(clearTangentLines())

            navigate("/create-mode")
        }
        else {
            return
        }
    }

    async function downloadMission() {
        const jsonData = JSON.stringify(route, null, 2)
        const fileName = await alertInput("file-name", "text")
        if (fileName === null) return
        downloadFile(jsonData, "json", fileName)
        toastAlert("Success", "top", 700)
    }


    return (<>
        <div className={classes.listContainer}>
            {route ?
                <>
                    <button
                        onClick={() => lodeToCreationMode()}
                        className={classes.button}>
                        <img className={classes.icon} src={loadIcon} alt="load" />
                        Recreate
                    </button>
                    <button
                        onClick={() => downloadMission()}
                        className={classes.button}>
                        <img className={`${classes.icon} ${classes.upsideDown}`} src={downloadIcon} alt="download" />
                        Download
                    </button>
                </>
                :
                <div className={`${classes.noOtherOpthions}`}>
                    No Options
                </div>
            }
        </div>
    </>
    )
}
