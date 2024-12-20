// import React, { useEffect, useMemo, useState } from 'react'
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
import save from "../../../../assets/icons/save-svgrepo-com.svg"
// import send from "../../../../assets/icons/send-01-svgrepo-com.svg"
import SVGComponent from '../../../SVGComponent';
import { ZodAlertList, alertAndExecute, alertFailedRequest, alertInput, alertInvalidData, alertPermission, toastAlert } from '../../../../utils/alerts/alerts';
// import { ConnectLegsInputSchema, ConnectLegsOutputSchema, CreateFullPathInputSchema, CreateLegsInputSchema, CreateLegsOutputSchema, FullPath, FullPathSchema, SaveQueryInput } from '../../../../gondola_types/reqResRoutes';
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
// import { Schema } from 'zod';
// import { Leg } from '../../../../gondola_types/navigationElements';
// import { setLegs } from '../../../../store/slices/legSlice';


type Props = {
    typeMission: Boolean
    setAddingMode: React.Dispatch<React.SetStateAction<AddingModeEnum>>;
    setProgress: SetProgressType;
    progress: progressType
}
const ButtonsMenu = ({ setAddingMode, setProgress, progress }: Props) => {
    const polygon = useSelector((root: RootState) => root.polygon.polygonHolder)
    const targets = useSelector((root: RootState) => root.targets.targetsHolder)
    const legs = useSelector((root: RootState) => root.legs.legHolder)
    const arcs = useSelector((root: RootState) => root.arcs.arcHolder)
    const tangentLines = useSelector((root: RootState) => root.tangentLines.tangentsLineHolder)
    const route = useSelector((root: RootState) => root.requestRoute.routeHolder)
    const general = useSelector((root: RootState) => root.general.generalHolder)
    const typeMission = useSelector((root: RootState) => root.switch.switchHolder)
    // const [request, setRequest] = useState('createLegs')
    // const [smart, setSmart] = useState("smart")


    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const margeLegsTargetInfos = (legs: Leg[], legsWithInfo: Leg[]) => {
    //     const margedLegs = legs.map((leg, index) => ({
    //         ...leg,
    //         targetInfo: legsWithInfo[index]?.targetInfo ? legsWithInfo[index]?.targetInfo : leg?.targetInfo
    //     }))
    //     return margedLegs
    // }


    // /**
    //  * 
    //  * @param res response from query
    //  * @param schema schema to check the response
    //  * @param savingData savingData to marge with the response
    //  * @returns Error alert || Response checking && dispatch
    //  */
    // const checkResponse = async (res: Leg[] | FullPath | undefined | string, schema: any, savingData: SaveQueryInput) => {
    //     if (res !== undefined && typeof (res) !== "string") {
    //         setProgress(null)
    //         const resParsed = schema.safeParse(res)
    //         if (!resParsed.success) {
    //             console.error(resParsed)
    //             alertInvalidData(<ZodAlertList errorList={resParsed.error.errors} />)
    //             return
    //         }
    //         toastAlert("success, trying saving in DB", "top")
    //         setProgress({ iterationCount: 1, percentage: 0 });
    //         const data = {
    //             ...savingData,
    //             legs: schema === (CreateLegsOutputSchema) ? resParsed.data : ((resParsed.data.legs) ? (schema === ConnectLegsOutputSchema) ? margeLegsTargetInfos(resParsed.data.legs, legs) : resParsed.data.legs : savingData.legs),
    //             arcs: resParsed.data?.arcs,
    //             tangentLines: resParsed.data?.tangentLines,
    //             targets: undefined,
    //             source: "ALGORITHM"
    //         }

    //         const parsed = SaveQueryInputSchema.safeParse(data)
    //         if (!parsed.success) {
    //             setProgress(null);
    //             alertInvalidData(<ZodAlertList errorList={parsed.error.errors} />)
    //             return
    //         } else {
    //             const legParsed = CreateLegsOutputSchema.safeParse(parsed.data.legs)
    //             if (legParsed.success) {
    //                 if (schema === CreateLegsOutputSchema) {
    //                     dispatch(setLegs(legParsed.data))
    //                 } else {
    //                     const legs = legParsed.data.slice(1, -1)
    //                     dispatch(setLegs(legs))
    //                 }
    //             }
    //             const saveQuery = await Network.mongoQueries.saveQuery(parsed.data)
    //             setProgress(null);
    //             toastAlert(String(saveQuery), "top")
    //             dispatch(setResponse(parsed.data))
    //             if (schema !== CreateLegsOutputSchema) {
    //                 navigate("/response")
    //             }
    //         }
    //     } else {
    //         alertFailedRequest(typeof (res) === "string" ? res : "Failed Mission")
    //         setProgress(null)
    //     }
    // }

    // /**
    //  * 
    //  * @param data data to send in the query
    //  * @param parseSchema schema to check the data before the query
    //  * @param resSchema schema to check the data that came from the query
    //  * @param query query-function to make request
    //  * @returns Error alert || Response checking && saving
    //  */
    // const requestAlgo = async (data: SaveQueryInput, parseSchema: Schema, resSchema: Schema, query: any) => {
    //     const parsed = parseSchema.safeParse(data)
    //     if (!parsed.success) {
    //         setProgress(null);
    //         alertInvalidData(<ZodAlertList errorList={parsed.error.errors} />)
    //         return
    //     } else {
    //         toastAlert("saving success, start connection to algorithm", "top", 5000)
    //         const algoRes = await query(parsed.data)
    //         checkResponse(algoRes, resSchema, data)
    //     }
    // }



    // const handleSend = async () => {
    //     let missionName
    //     await alertInput("name", "text", "must have (0-30 characters)").then((name) => {
    //         missionName = name
    //     })
    //     if (missionName !== undefined && missionName !== null && String(missionName).length < 30 && missionName !== "") {
    //         try {
    //             let permission = true
    //             const isMissionExist = await mongoQueries.retrieveQuery(missionName)
    //             if (isMissionExist !== null) {
    //                 await alertPermission("Mission already exist", "Do you want to continue and overight the old mission?").then((confirmed: boolean) => {
    //                     permission = confirmed
    //                 })
    //             }
    //             if (permission) {
    //                 const parsedData = SaveQueryInputSchema.safeParse({
    //                     ...route,
    //                     windDirection: general?.windDirection,
    //                     windSpeed: general?.windSpeed,
    //                     altitude: general?.altitude,
    //                     radius: general?.radius,
    //                     speed: general?.speed,
    //                     photoDelayAtStart: general?.photoDelayAtStart,
    //                     legs,
    //                     tangentLines,
    //                     arcs,
    //                     targets,
    //                     flyZone: polygon,
    //                     name: missionName,
    //                     source: "MANUAL"
    //                 })
    //                 if (!parsedData.success) {
    //                     console.error(parsedData.error.errors)
    //                     alertInvalidData(<ZodAlertList errorList={parsedData.error.errors} />)
    //                     return
    //                 }
    //                 try {
    //                     const saveQuery = await mongoQueries.saveQuery(parsedData.data)
    //                     toastAlert(String(saveQuery), "top")
    //                     setProgress({ iterationCount: 1, percentage: 0 });
    //                     try {
    //                         if (request === "createLegs") {
    //                             requestAlgo(parsedData.data, CreateLegsInputSchema, CreateLegsOutputSchema, Network.algoQueries.createLegs)

    //                         } else if (request === "connectLegs") {
    //                             const data = { ...parsedData.data, smartConnection: smart === "smart" ? true : false }
    //                             requestAlgo(data, ConnectLegsInputSchema, FullPathSchema, Network.algoQueries.connectLegs)

    //                         } else {
    //                             const data = { ...parsedData.data, smartConnection: smart === "smart" ? true : false }
    //                             requestAlgo(data, CreateFullPathInputSchema, FullPathSchema, Network.algoQueries.CreateFullPath)
    //                         }
    //                     } catch (error) {
    //                         setProgress(null);
    //                         console.error(error);
    //                         alertFailedRequest("Error", String(error));
    //                         return;
    //                     }
    //                 } catch (error) {
    //                     setProgress(null)
    //                     console.error(error);
    //                     alertFailedRequest("Error", String(error))
    //                     return
    //                 }
    //             }
    //         } catch (error) {
    //             console.error(error);
    //             alertFailedRequest("Error", String(error))
    //             return
    //         }
    //     }
    // }

    const handleSave = async () => {
        let missionName
        await alertInput("name", "text", "must have (0-30 characters)").then((name) => {
            missionName = name
        })
        if (missionName === null || missionName === "") return
        if (String(missionName).length > 30) return
        if (missionName)
            try {
                let permission = true
                const isMissionExist = await mongoQueries.retrieveQuery(missionName)
                if (isMissionExist !== null) {
                    await alertPermission("Mission already exist", "Do you want to continue and overight the old mission?").then((confirmed: boolean) => {
                        permission = confirmed
                    })
                }
                if (permission) {
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
                else return
            }
            catch (error) {
                console.error(error)
                alertFailedRequest("Error", `${error}`)
                return
            }
        else alertInvalidData("Invalid name")
    }

    // useEffect(() => {
    //     if (typeMission)
    //         setRequest("createLegs")
    // }, [typeMission])

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
        switch (typeMission) {
            case true:
                return buttonsManualArr
            case false:
                return buttonsManualArr
            // if (request === "connectLegs") {
            //     return buttonsManualArr.filter((btn) => !["Edit Arc", "Edit Tangent Line", "Amt"].includes(btn.name))
            // } else {
            //     return buttonsManualArr.filter((btn) => !["Edit Leg", "Edit Arc", "Edit Tangent Line", "Amt"].includes(btn.name))
            // }
        }

    }, [typeMission])




    return (<>
        {/* {!typeMission &&
            <div className={classes.creationModeMenu}>
                <div className={classes.formGroup}>
                    <label htmlFor="request">Request</label>
                    <select name='request' onChange={(e) => {
                        setRequest(e.target.value)
                    }}>
                        <option value={"createLegs"} >Create Legs</option>
                        <option value={"connectLegs"} >Connect Legs</option>
                        <option value={"createFullPath"} >Full-Path</option>
                    </select>
                </div>
                {(request === "connectLegs" || request === "createFullPath") &&
                    <div className={classes.formGroup}>
                        <label htmlFor="smart">Options</label>
                        <select name='smart' onChange={(e) => {
                            setSmart(e.target.value)
                        }}>
                            <option value={"smart"} >Smart</option>
                            <option value={"quick"} >Quick</option>
                        </select>
                    </div>
                }
            </div>
        } */}
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
            {/* {typeMission ? ( */}
            <Button title='Send route request' onClick={handleSave} className={classes.buttonSend}>
                <div className={classes.sendAria}>
                    <SVGComponent className={classes.sendIcon} src={save} stroke='#fff' />
                    <span className={classes.buttonTitle}>Save</span>
                </div>
            </Button>
            {/* ) : (
                <Button disabled={progress !== null} title='Save route configuration' onClick={handleSend} className={classes.buttonSend}>
                    <div className={classes.sendAria}>
                        <SVGComponent className={classes.sendIcon} src={send} stroke='#fff' />
                        <span className={classes.buttonTitle}>Send</span>
                    </div>
                </Button>
            )} */}
        </div>
    </>
    )
}

export default ButtonsMenu