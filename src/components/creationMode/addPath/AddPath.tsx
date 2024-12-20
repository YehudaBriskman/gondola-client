import { useState, useEffect } from 'react'
import { Path } from '../../../gondola_types/basicElements';
import { LeafletMouseEvent } from 'leaflet';
import { useMapEvent } from 'react-leaflet';
import DisplayPath from '../../map/DisplayPath';
import { useDispatch } from 'react-redux';
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
    const dispatch = useDispatch();
    const [temporaryPath, setTemporaryPath] = useState<Partial<Path>>({});
    const [isMouseMovementEnabled, setIsMouseMovementEnabled] = useState(false);

    useEffect(() => {
        console.log('Temporary Path updated:', temporaryPath);
    }, [temporaryPath]);

    const onCancel = () => {
        if (window.confirm(`Are you sure you want to delete the ${path} path?`)) {
            if (path === "entry") {
                dispatch(clearEntryPath());
            } else {
                dispatch(clearExitPath());
            }
        }
        setAddingMode(AddingModeEnum.INITIAL_STATE);
    }

    const onSave = () => {
        console.log("save");

        const { endPoint, startPoint } = temporaryPath;
        if (endPoint && startPoint) {
            if (path === "entry") {
                dispatch(setEntryPath({ path: { endPoint, startPoint } }));
                console.log("entry");

            } else {
                dispatch(setExitPath({ path: { endPoint, startPoint } }));
                console.log("exit");
            }
        }
        setAddingMode(AddingModeEnum.INITIAL_STATE);
    }

    const handleMapClick = (e: LeafletMouseEvent) => {
        const { lat, lng } = getFixedPoint(e);

        if (temporaryPath.startPoint === undefined) {
            setTemporaryPath({ startPoint: { Latitude: lat, Longitude: lng }, endPoint: undefined });
            setIsMouseMovementEnabled(true);
        } else if (isMouseMovementEnabled) {
            setTemporaryPath(p => ({ ...p, endPoint: { Latitude: lat, Longitude: lng } }));
            setIsMouseMovementEnabled(false);
        } else {
            if (path === "entry") {
                dispatch(setEntryPath({ path: temporaryPath as Path }));
            } else {
                dispatch(setExitPath({ path: temporaryPath as Path }));
            }
            setTemporaryPath({});
            setIsMouseMovementEnabled(false);
        }
    }

    const handleMapMouseMovement = (e: LeafletMouseEvent) => {
        if (!isMouseMovementEnabled) return;

        const { lat, lng } = getFixedPoint(e);

        if (temporaryPath.startPoint && isMouseMovementEnabled) {
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
