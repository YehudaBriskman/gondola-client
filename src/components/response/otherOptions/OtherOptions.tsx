import { useDispatch, useSelector } from "react-redux";
import classes from "./otherOptions.module.css";
import { RootState } from "../../../store/store";
import { alertInput, alertPermission, toastAlert } from "../../../utils/alerts/alerts";
import { clearPolygon, setPolygon } from "../../../store/slices/polygonSlice";
import { clearTargets, setTargets } from "../../../store/slices/targetsSlice";
import { clearExitPath, setExitPath } from "../../../store/slices/exitPathSlice";
import { clearEntryPath, setEntryPath } from "../../../store/slices/entryPathSlice";
import { setGeneral } from "../../../store/slices/generalSlice";
import { clearLegs, setLegs } from "../../../store/slices/legSlice";
import { clearArcs, setArcs } from "../../../store/slices/arcSlice";
import { clearTangentLines, setTangentLines } from "../../../store/slices/tangentLineSlice";
import { useNavigate } from "react-router-dom";
import loadIcon from '../../../assets/icons/curved-arrow-svgrepo-com.svg';
import downloadIcon from '../../../assets/icons/upload-minimalistic-svgrepo-com.svg';
import { downloadFile } from "../../../utils/csv/handleCSVTargets";

export const OtherOptions = () => {
    const route = useSelector((state: RootState) => state.response.responseHolder);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // פונקציה שמבצעת את כל ההגדרות מחדש במצב יצירה
    const loadRouteData = () => {
        // Polygon data
        route?.flyZone ? dispatch(setPolygon(route.flyZone)) : dispatch(clearPolygon());

        // Targets
        route?.targets ? dispatch(setTargets(route.targets)) : dispatch(clearTargets());

        // Entry path
        route?.entryPath ? dispatch(setEntryPath({ path: route.entryPath })) : dispatch(clearEntryPath());

        // Exit path
        route?.exitPath ? dispatch(setExitPath({ path: route.exitPath })) : dispatch(clearExitPath());

        // General settings (windSpeed, altitude, etc.)
        if (route?.speed && route?.altitude && route?.photoDelayAtStart && route?.radius && route?.windSpeed && route?.windDirection) {
            dispatch(setGeneral({
                photoDelayAtStart: route.photoDelayAtStart,
                windDirection: route.windDirection,
                windSpeed: route.windSpeed,
                speed: route.speed,
                radius: route.radius,
                altitude: route.altitude,
            }));
        }

        // Legs, arcs, and tangent lines
        route?.legs ? dispatch(setLegs(route.legs)) : dispatch(clearLegs());
        route?.arcs ? dispatch(setArcs(route.arcs)) : dispatch(clearArcs());
        route?.tangentLines ? dispatch(setTangentLines(route.tangentLines)) : dispatch(clearTangentLines());
    };

    // פונקציה להורדת המידע כקובץ
    async function downloadMission() {
        const jsonData = JSON.stringify(route, null, 2);
        const fileName = await alertInput("file-name", "text");
        if (fileName === null) return;
        downloadFile(jsonData, "json", fileName);
        toastAlert("Success", "top", 700);
    }

    // פונקציה להודעה והעברת נתונים למצב יצירה
    async function loadToCreationMode() {
        const permission = await alertPermission("Wait!", "Are you sure? All of the data in the creation mode will be re-written.");

        if (permission) {
            loadRouteData();
            navigate("/create-mode");
        }
    }

    return (
        <div className={classes.listContainer}>
            {route ?
                <>
                    <button
                        onClick={loadToCreationMode}
                        className={classes.button}>
                        <img className={classes.icon} src={loadIcon} alt="load" />
                        Recreate
                    </button>
                    <button
                        onClick={downloadMission}
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
    );
};
