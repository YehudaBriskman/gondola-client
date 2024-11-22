import { useState } from 'react'
import { Path } from '../../../gondola_types/basicElements';
import { LeafletMouseEvent } from 'leaflet';
import { useMapEvent } from 'react-leaflet';
import DisplayPath from '../../map/DisplayPath';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { clearPath, setPath } from '../../../store/slices/requestRouteSlice';
import { getFixedPoint } from '../../../utils/general';
import AddingModeEnum from '../../../utils/addingModeEnum';
import SaveAndCancel from '../../saveAndCancel/SaveAndCancel';
import SidebarHeader from '../../sidebarHeader/SidebarHeader';


type AddPathProps = {
    path: "entry" | "exit";
    setAddingMode: React.Dispatch<React.SetStateAction<AddingModeEnum>>;

}

const AddPath = ({
    path, setAddingMode,

}: AddPathProps) => {
    const pathPoints = useSelector((e: RootState) => e.requestRoute.routeHolder)[`${path}Path`];
    const dispatch = useDispatch()
    const [temporaryPath, setTemporaryPath] = useState<Partial<Path>>({})

    const onCancel = () => {
        if (window.confirm(`are you sure about delete ${path} path ?`))
            dispatch(clearPath({ type: path }));
        setAddingMode(AddingModeEnum.INITIAL_STATE)
    }

    const onSave = () => {
        const { endPoint, startPoint } = temporaryPath;
        if (endPoint && startPoint) {
            dispatch(setPath({ path: { endPoint, startPoint }, type: path }))
        }
        setAddingMode(AddingModeEnum.INITIAL_STATE)
    }

    const handleMapClick = (e: LeafletMouseEvent) => {
        const { lat, lng } = getFixedPoint(e);
        if (pathPoints) {
            dispatch(clearPath({ type: path }))
            setTemporaryPath({ startPoint: { Latitude:lat, Longitude: lng } })
            return
        }
        if (temporaryPath.startPoint === undefined) {
            setTemporaryPath({ startPoint: { Latitude:lat, Longitude: lng } })
        } else if (temporaryPath.endPoint === undefined) {
            setTemporaryPath(p => ({ ...p, endPoint: { Latitude:lat, Longitude: lng } }))
        } else {
            dispatch(setPath({ path: temporaryPath as Path, type: path }))
            setTemporaryPath({});
        }
    }
    const handleMapMouseMovement = (e: LeafletMouseEvent) => {
        const { lat, lng } = getFixedPoint(e);
        if (temporaryPath.startPoint && pathPoints === undefined) {
            setTemporaryPath(p => ({ ...p, endPoint: { Latitude:lat, Longitude: lng } }))
        }
    }
    useMapEvent("mousemove", handleMapMouseMovement)
    useMapEvent("click", handleMapClick)

    return (
        <>
            <SidebarHeader name={`${path} path`} />
            {temporaryPath.startPoint && temporaryPath.endPoint &&
                <DisplayPath path={{ endPoint: temporaryPath.endPoint, startPoint: temporaryPath.startPoint }} temp />
            }
            <SaveAndCancel onSave={onSave} onCancel={onCancel} />
        </>
    )
}

export default AddPath;
