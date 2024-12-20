import { useState } from 'react'
import { Path } from '../../../gondola_types/basicElements';
import { LeafletMouseEvent } from 'leaflet';
import { useMapEvent } from 'react-leaflet';
import DisplayPath from '../../map/DisplayPath';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { clearExitPath, setExitPath } from '../../../store/slices/exitPathSlice';
import { setEntryPath, clearEntryPath } from '../../../store/slices/entryPathSlice';
import { getFixedPoint } from '../../../utils/general';
import AddingModeEnum from '../../../utils/addingModeEnum';
import SaveAndCancel from '../../saveAndCancel/SaveAndCancel';
import SidebarHeader from '../../sidebarHeader/SidebarHeader';

type AddPathProps = {
    path: "entry" | "exit";
    setAddingMode: React.Dispatch<React.SetStateAction<AddingModeEnum>>;
}

const AddPath = ({ path, setAddingMode }: AddPathProps) => {
    const exitPoints = useSelector((e: RootState) => e.exitPath.pathsHolder);
    const entryPoints = useSelector((e: RootState) => e.entryPath.pathsHolder);
    const dispatch = useDispatch();
    const [temporaryPath, setTemporaryPath] = useState<Partial<Path>>({});

    const onCancel = () => {
        if (window.confirm(`Are you sure you want to delete the ${path} path?`)) {
            // בדיקה אם מדובר ב-entry או exit והפעלת הפעולה המתאימה
            if (path === "entry") {
                dispatch(clearEntryPath());
            } else {
                dispatch(clearExitPath());
            }
        }
        setAddingMode(AddingModeEnum.INITIAL_STATE);
    }

    const onSave = () => {
        const { endPoint, startPoint } = temporaryPath;
        if (endPoint && startPoint) {
            // בדיקה אם מדובר ב-entry או exit והפעלת הפעולה המתאימה
            if (path === "entry") {
                dispatch(setEntryPath({ path: { endPoint, startPoint } }));
            } else {
                dispatch(setExitPath({ path: { endPoint, startPoint } }));
            }
        }
        setAddingMode(AddingModeEnum.INITIAL_STATE);
    }

    const handleMapClick = (e: LeafletMouseEvent) => {
        const { lat, lng } = getFixedPoint(e);
        
        // אם יש כבר נתיב (entry או exit), נגיב בהתאם
        if (temporaryPath.startPoint === undefined) {
            setTemporaryPath({ startPoint: { Latitude: lat, Longitude: lng } });
        } else if (temporaryPath.endPoint === undefined) {
            setTemporaryPath(p => ({ ...p, endPoint: { Latitude: lat, Longitude: lng } }));
        } else {
            // שמירה של הנתיב המתואם בהתאם ל-entry או exit
            if (path === "entry") {
                dispatch(setEntryPath({ path: temporaryPath as Path }));
            } else {
                dispatch(setExitPath({ path: temporaryPath as Path }));
            }
            setTemporaryPath({});
        }
    }

    const handleMapMouseMovement = (e: LeafletMouseEvent) => {
        const { lat, lng } = getFixedPoint(e);
        if (temporaryPath.startPoint && temporaryPath.endPoint === undefined) {
            setTemporaryPath(p => ({ ...p, endPoint: { Latitude: lat, Longitude: lng } }));
        }
    }

    useMapEvent("mousemove", handleMapMouseMovement);
    useMapEvent("click", handleMapClick);

    return (
        <>
            <SidebarHeader name={`${path === "entry" ? "Entry" : "Exit"} Path`} />
            {temporaryPath.startPoint && temporaryPath.endPoint &&
                <DisplayPath path={{ endPoint: temporaryPath.endPoint, startPoint: temporaryPath.startPoint }} temp />
            }
            <SaveAndCancel onSave={onSave} onCancel={onCancel} />
        </>
    );
}

export default AddPath;
