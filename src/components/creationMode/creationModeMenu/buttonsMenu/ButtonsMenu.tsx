import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../button/Button'
import classes from "../creationModeMenu.module.css";
import AddingModeEnum from '../../../../utils/addingModeEnum';
import iconAddTarget from '../../../../assets/icons/target-2-svgrepo-com.svg'
import editPolygon from '../../../../assets/icons/creationModeIcons/polygon-bold-svgrepo-com.svg'
import entryPoint from '../../../../assets/icons/creationModeIcons/entryPoint.svg'
import exitPoint from '../../../../assets/icons/creationModeIcons/exitPoint.svg'
import generalIcon from '../../../../assets/icons/creationModeIcons/general.svg'
import history from "../../../../assets/icons/history-svgrepo-com.svg"
import saveIcon from "../../../../assets/icons/save-svgrepo-com.svg"
import SVGComponent from '../../../SVGComponent';
import { ZodAlertList, alertAndExecute, alertFailedRequest, alertInput, alertInvalidData, alertPermission, toastAlert } from '../../../../utils/alerts/alerts';
import { RootState } from '../../../../store/store';
import arcIcon from '../../../../assets/icons/curved-arrow-svgrepo-com.svg'
import legIcon from '../../../../assets/icons/previous-svgrepo-com.svg'
import tangentLineIcon from '../../../../assets/icons/next-svgrepo-com.svg'
import { SetProgressType, progressType } from '../../../../pages/creationMode/CreationMode';
import { Network } from '../../../../network/network';
import { mongoQueries } from '../../../../network/mongo_queries';
import { setResponse } from '../../../../store/slices/responseSlice';
import { SaveQueryInputSchema } from '../../../../gondola_types/reqResRoutes';
import { useMemo } from 'react';


type Props = {
    typeMission: Boolean
    setAddingMode: React.Dispatch<React.SetStateAction<AddingModeEnum>>;
    setProgress: SetProgressType;
    progress: progressType
}
const ButtonsMenu = ({ setAddingMode, setProgress }: Props) => {
    const polygon = useSelector((root: RootState) => root.polygon.polygonHolder)
    const targets = useSelector((root: RootState) => root.targets.targetsHolder)
    const legs = useSelector((root: RootState) => root.legs.legHolder)
    const arcs = useSelector((root: RootState) => root.arcs.arcHolder)
    const tangentLines = useSelector((root: RootState) => root.tangentLines.tangentsLineHolder)
    const route = useSelector((root: RootState) => root.requestRoute.routeHolder)
    const general = useSelector((root: RootState) => root.general.generalHolder)


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSave = async () => {
        let missionName
        await alertInput("name", "text", "must have (0-30 characters)").then((name) => {
            missionName = name
        })
        if (missionName === null || missionName === "" || String(missionName).length > 30) return
        if (missionName)
            try {
                let permission = true
                const isMissionExist = await mongoQueries.retrieveQuery(missionName)
                if (isMissionExist !== null) {
                    await alertPermission("Mission already exist", "Do you want to continue and over-right the old mission?").then((confirmed: boolean) => {
                        permission = confirmed
                    })
                }
                if (!permission) return
                const parsedData = SaveQueryInputSchema.safeParse({
                    ...route,
                    windDirection: general?.windDirection,
                    windSpeed: general?.windSpeed,
                    altitude: general?.altitude,
                    radius: general?.radius,
                    speed: general?.speed,
                    photoDelayAtStart: general?.photoDelayAtStart,
                    legs,
                    tangentLines,
                    arcs,
                    targets,
                    flyZone: polygon,
                    name: missionName,
                    source: "MANUAL"
                })
                if (!parsedData.success) {
                    alertInvalidData(<ZodAlertList errorList={parsedData.error.errors} />)
                    return
                }
                setProgress({ iterationCount: 1, percentage: 0 });
                toastAlert("saving...", "top")
                try {
                    const res = await Network.mongoQueries.saveQuery(parsedData.data)
                    dispatch(setResponse(parsedData.data))
                    await alertAndExecute(
                        () => toastAlert(String(res), "top", 3000),
                        () => navigate('/response')
                    )
                } catch (error) {
                    setProgress(null);
                    console.error(error);
                    alertFailedRequest("Error", `${error}`);
                    return;
                }
            }
            catch (error) {
                console.error(error)
                alertFailedRequest("Error", `${error}`)
                return
            }
        else alertInvalidData("Invalid name")
    }

    const filteredButtons = useMemo(() => {
        const buttonsManualArr = [
            {
                name: "Add Target",
                mode: AddingModeEnum.ADD_TARGETS,
                icon: iconAddTarget,
            },
            {
                name: "Edit Polygon",
                mode: AddingModeEnum.ADD_POLYGON,
                icon: editPolygon,

            },
            {
                name: "Entry Path",
                mode: AddingModeEnum.ADD_ENTRY,
                icon: entryPoint,

            },
            {
                name: "Exit Path",
                mode: AddingModeEnum.ADD_EXIT,
                icon: exitPoint,

            }, {
                name: "Edit Leg",
                mode: AddingModeEnum.ADD_LEG,
                icon: legIcon,

            }, {
                name: "Edit Arc",
                mode: AddingModeEnum.ADD_ARC,
                icon: arcIcon,

            }, {
                name: "Edit Tangent Line",
                mode: AddingModeEnum.ADD_TANGENT_LINE,
                icon: tangentLineIcon,
            }, {
                name: "General",
                mode: AddingModeEnum.GENERAL,
                icon: generalIcon,

            },
        ]
        return buttonsManualArr
    }, [])

    return (<>
        <div className={classes.creationModeMenu}>
            {
                filteredButtons?.map((btn, i) => (
                    <Button
                        className={classes.itemMenu}
                        variant='iconAndText'
                        onClick={() => { setAddingMode(btn.mode) }}
                        key={i}
                    >
                        <img className={classes.svgIcon} src={btn.icon} alt='' />
                        <span>{btn.name}</span>
                    </Button>
                ))

            }
            <Link className={classes.linkHistory} to={"/history"}>
                <SVGComponent className={classes.svgIcon} src={history} fill='#fff' />
                History
            </Link>

        </div>
        <div className={classes.halfSize}>
            <Button title='Send route request' onClick={handleSave} className={classes.buttonSend}>
                <div className={classes.sendAria}>
                    <SVGComponent size='2rem' className={classes.sendIcon} src={saveIcon} stroke='#fff' />
                    <span className={classes.buttonTitle}>Save</span>
                </div>
            </Button>
        </div>
    </>
    )
}

export default ButtonsMenu