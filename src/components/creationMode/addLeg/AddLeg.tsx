import React, { useEffect, useState } from 'react'
import SaveAndCancel from '../../saveAndCancel/SaveAndCancel'
import SidebarHeader from '../../sidebarHeader/SidebarHeader'
import AddingModeEnum from '../../../utils/addingModeEnum';
import { useForm } from 'react-hook-form';
import { Leg, Target, TargetInfo } from '../../../gondola_types/navigationElements';
import { useMapEvent } from 'react-leaflet';
import { getFixedPoint } from '../../../utils/general';
import { useDispatch, useSelector } from 'react-redux';
import DisplayLeg from '../../map/DisplayLeg';
import { RootState } from '../../../store/store';
import { addLeg, editLeg } from '../../../store/slices/legSlice';
import Input from '../../inputs/Input';
import classes from "../addNewTarget/AddNewTarget.module.css"
import { LeafletMouseEvent } from 'leaflet';
import ConnectLegToTarget from '../../connectLegToTarget/ConnectLegToTarget';
import Accordion from '../../accordion/Accordion';
import targetsIcon from "../../../assets/icons/target-2-svgrepo-com (1).svg"
import arrowDown from "../../../assets/icons/eye&arrow/arrow-down-svgrepo-com.svg"
import { alertFailedRequest } from '../../../utils/alerts/alerts';


type Props = {
    setAddingMode: React.Dispatch<React.SetStateAction<AddingModeEnum>>;
    setCurrentIndex?: React.Dispatch<React.SetStateAction<number>>;
    index: number;
}

const AddLeg = ({ setAddingMode, setCurrentIndex, index }: Props) => {

    const legs = useSelector((e: RootState) => e.legs.legHolder);
    const [tempLeg, setTempLeg] = useState<Partial<Leg>>({})
    const [tempTargetInfo, setTempTargetInfo] = useState<TargetInfo[]>([])
    const targets = useSelector((e: RootState) => e.targets.targetsHolder);
    const [mouseMove, setMouseMove] = useState<boolean>(false)
    const [hadEnd, setHadEnd] = useState<boolean>(false)
    const [hadPath, setHadPath] = useState<boolean>(false)
    const previousLeg: Leg | undefined = legs[index]

    const processLegs = (legs: Leg[] | Partial<Leg>[]): Target[] => {
        let targets: any = []
        for (let index = 0; index < legs.length; index++) {
            const smallTargets = getTargetCount(legs[index])
            if (Array.isArray(smallTargets) && smallTargets.length !== 0) {
                targets = [...targets, ...smallTargets]
            }
        }
        return targets
    }

    const getTargetCount = (leg: Leg | Partial<Leg>) => {
        let targets = []
        if (leg.targetInfo) {
            for (let index = 0; index < leg.targetInfo.length; index++) {
                targets.push(leg.targetInfo[index].target)
            }
        }
        return targets
    }

    const addTargetToLeg = (target: Target) => {
        if (!tempLeg.path) {
            alertFailedRequest("No Path For Target")
            return
        }
        const targetInfo = {
            path: tempLeg.path,
            target: target,
        }
        const targetInfos = [...tempTargetInfo, targetInfo]
        setTempTargetInfo(targetInfos)
        setTempLegTargets([...tempLegTargets, target])
        setAvalableTargets(avalableTargets.filter((t) => t !== target))
    }

    const deleteTargetFromLeg = (target: Target) => {
        setAvalableTargets([...avalableTargets, target])
        setTempLegTargets(tempLegTargets.filter((t) => t !== target))
        const updateTargetInfo = tempTargetInfo.filter((t) => (t.target !== target))
        setTempTargetInfo(updateTargetInfo)
    }

    let legsTargets = processLegs(legs)
    const isEqualTarget = (t1: Target, t2: Target) => t1.name === t2.name
    const filterTargets = (targets: Target[], toFilterTargets: Target[]) => {
        return targets.filter(target => !toFilterTargets.some(t => isEqualTarget(t, target)))
    }
    const [avalableTargets, setAvalableTargets] = useState<Target[]>(filterTargets(filterTargets(targets, legsTargets), processLegs([tempLeg])))
    const [tempLegTargets, setTempLegTargets] = useState<Target[]>(processLegs([tempLeg]))


    useEffect(() => {
        setTempLeg(t => ({ ...t, targetInfo: tempTargetInfo }))
        if (tempTargetInfo.length !== 0) {
            setHadPath(true)
        }
    }, [tempTargetInfo])


    const { register, handleSubmit, watch, setValue } = useForm<Leg>({
        defaultValues: previousLeg
    })

    const dispatch = useDispatch()

    const startLatForm = watch("path.startPoint.Latitude")
    const startLongForm = watch("path.startPoint.Longitude")
    const endLatForm = watch("path.endPoint.Latitude")
    const endLongForm = watch("path.endPoint.Longitude")

    useMapEvent("click", (e: LeafletMouseEvent) => {
        if (!hadPath) {
            const { lat, lng } = getFixedPoint(e)
            if (!tempLeg || !tempLeg.path || tempLeg.path?.startPoint === undefined) {
                setTempLeg({
                    path: { startPoint: { Latitude: lat, Longitude: lng }, endPoint: { Latitude: 0, Longitude: 0 } }
                })
                setValue("path.startPoint.Latitude", lat)
                setValue("path.startPoint.Longitude", lng)
                setHadEnd(false)
                setMouseMove(true)
            } else if (tempLeg.path?.startPoint && !hadEnd) {
                const path = { startPoint: tempLeg.path.startPoint, endPoint: { Latitude: lat, Longitude: lng } }
                setTempLeg(tempLeg => ({ ...tempLeg, path: path }))
                setValue("path.endPoint.Latitude", lat)
                setValue("path.endPoint.Longitude", lng)
                setHadEnd(true)
                setMouseMove(false)
            } else if (tempLeg.path.startPoint && hadEnd && tempLeg.path.startPoint.Latitude !== 0 && mouseMove) {
                setMouseMove(false)
                setValue("path.startPoint.Latitude", lat)
                setValue("path.startPoint.Longitude", lng)
                setTempLeg({
                    path: { startPoint: { Latitude: lat, Longitude: lng }, endPoint: { Latitude: 0, Longitude: 0 } }
                })
                setHadEnd(false)
            } else if (tempLeg.path.startPoint && hadEnd && !mouseMove) {
                setValue("path.startPoint.Latitude", lat)
                setValue("path.startPoint.Longitude", lng)
                setTempLeg({
                    path: { startPoint: { Latitude: lat, Longitude: lng }, endPoint: { Latitude: 0, Longitude: 0 } }
                })
                setHadEnd(false)
            }
        }
    })


    useMapEvent("mousemove", (e: LeafletMouseEvent) => {
        if (!hadPath) {
            const { lat, lng } = getFixedPoint(e)
            if (tempLeg.path?.startPoint && !hadEnd) {
                setTempLeg(tempLeg => {
                    const updatedLeg = {
                        ...tempLeg,
                        path: {
                            startPoint: tempLeg.path?.startPoint!,
                            endPoint: { Latitude: lat, Longitude: lng }
                        }
                    }
                    return updatedLeg
                })
                setValue("path.endPoint.Latitude", lat)
                setValue("path.endPoint.Longitude", lng)
            }
        }
    })

    useEffect(() => {
        if (index !== -1) {
            setTempLeg(previousLeg)
        }
        setMouseMove(!mouseMove)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startLatForm, startLongForm])

    const returnToAddingMode = () => {
        setAddingMode(AddingModeEnum.INITIAL_STATE)
        setCurrentIndex?.(-1);
    }

    const onSubmit = (data: Leg) => {
        const temp = {
            path: {
                startPoint: {
                    Latitude: data.path.startPoint.Latitude,
                    Longitude: data.path.startPoint.Longitude
                },
                endPoint: {
                    Latitude: data.path.endPoint.Latitude,
                    Longitude: data.path.endPoint.Longitude
                }
            },
            altitude: 1,
            targetInfo: tempTargetInfo,
        }
        if (index !== -1) {
            if (window.confirm(`are you sure about edit this Leg ?`))

                dispatch(editLeg({ index, leg: temp }))
        } else if (tempLeg.path?.startPoint && tempLeg.path?.endPoint) {

            dispatch(addLeg(temp))
        }
        setTempLeg({})
        returnToAddingMode();
    }

    const handleReset = () => returnToAddingMode();

    useEffect(() => {
        if (isNaN(startLatForm) || isNaN(startLongForm) || isNaN(endLatForm) || isNaN(endLongForm)) {
            return;
        }
    }, [endLatForm, endLongForm, legs, startLatForm, startLongForm, tempLeg])

    return (
        <>
            <SidebarHeader name={`${index === -1 ? 'New' : 'Edit'} Leg`} />
            {tempLeg.path?.startPoint && tempLeg.path?.endPoint && tempLeg.path?.endPoint.Latitude !== 0 && tempLeg.path?.endPoint.Longitude !== 0 && <DisplayLeg leg={tempLeg} type='temp' />}
            <form id='add-leg-form' onReset={handleReset} className={classes.addNewTarget} onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.halfSize}>
                    <Input type='number' required label='start Latitude' {...register("path.startPoint.Latitude", { valueAsNumber: true })} />
                    <Input type='number' required label='start Long' {...register("path.startPoint.Longitude", { valueAsNumber: true })} />
                </div>
                <div className={classes.halfSize}>
                    <Input type='number' required label='end Latitude' {...register("path.endPoint.Latitude", { valueAsNumber: true })} />
                    <Input type='number' required label='end Long' {...register("path.endPoint.Longitude", { valueAsNumber: true })} />
                </div>
                <div className={classes.halfSize}>
                    <Input
                        required
                        type='number'
                        label='Altitude'
                        {...register("altitude")}
                    />
                </div>

            </form>
            {(tempLeg.path?.startPoint && tempLeg.path.endPoint && tempLeg.path?.endPoint.Latitude !== 0 && tempLeg.path?.endPoint.Longitude !== 0 && !mouseMove && targets) &&
                <>
                    {avalableTargets && avalableTargets.length !== 0 &&
                        <Accordion title='Choose Targets' src={targetsIcon} src2={arrowDown} children={<ConnectLegToTarget editConnectionToLeg={addTargetToLeg} targets={avalableTargets} />} />
                    }
                    {tempLegTargets && tempLegTargets.length !== 0 &&
                        <Accordion title='Connected' src={targetsIcon} src2={arrowDown} children={<ConnectLegToTarget editConnectionToLeg={deleteTargetFromLeg} targets={tempLegTargets} />} />
                    }
                </>
            }
            <SaveAndCancel saveType="submit" cancelType='reset' form='add-leg-form' saveText={`${index !== -1 ? "Save" : "Add"} Leg`} />
        </>
    )
}

export default AddLeg
