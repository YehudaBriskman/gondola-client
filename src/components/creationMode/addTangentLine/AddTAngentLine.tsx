import React, { useEffect, useState } from 'react'
import SaveAndCancel from '../../saveAndCancel/SaveAndCancel'
import SidebarHeader from '../../sidebarHeader/SidebarHeader'
import AddingModeEnum from '../../../utils/addingModeEnum';
import { useForm } from 'react-hook-form';
import { TangentLine } from '../../../gondola_types/navigationElements';
import { useMapEvent } from 'react-leaflet';
import { getFixedPoint } from '../../../utils/general';
import { useDispatch, useSelector } from 'react-redux';
import DisplayTangentLine from '../../map/DisplayTangentLine';
import { RootState } from '../../../store/store';
import Input from '../../inputs/Input';
import classes from "../addNewTarget/AddNewTarget.module.css"
import { LeafletMouseEvent } from 'leaflet';
import { addTangentLine, editTangentLine } from '../../../store/slices/tangentLineSlice';

type Props = {
    setAddingMode: React.Dispatch<React.SetStateAction<AddingModeEnum>>;
    setCurrentIndex?: React.Dispatch<React.SetStateAction<number>>;
    index: number
}

const AddTangentLine = ({ setAddingMode, setCurrentIndex, index }: Props) => {

    const tangentLines = useSelector((e: RootState) => e.tangentLines.tangentsLineHolder);
    const [tempTangentLine, setTempTangentLine] = useState<Partial<TangentLine>>({})
    const [mouseMove, setMouseMove] = useState<boolean>(false)
    const previousTangentLine: TangentLine | undefined = tangentLines[index]
    const { register, handleSubmit, watch, setValue } = useForm<TangentLine>({
        defaultValues: previousTangentLine
    })

    const dispatch = useDispatch()

    const startLatForm = watch("startPoint.Latitude")
    const startLongForm = watch("startPoint.Longitude")
    const endLatForm = watch("endPoint.Latitude")
    const endLongForm = watch("endPoint.Longitude")

    useMapEvent("click", (e: LeafletMouseEvent) => {
        const { lat, lng } = getFixedPoint(e)
        if (tempTangentLine.startPoint === undefined) {
            setValue("startPoint.Latitude", lat)
            setValue("startPoint.Longitude", lng)
            setTempTangentLine({
                startPoint: { Latitude: lat, Longitude: lng }
            })
        } else if (tempTangentLine.startPoint && tempTangentLine.endPoint === undefined) {
            setTempTangentLine(p => ({ ...p, endPoint: { Latitude: lat, Longitude: lng } }))
            setValue("endPoint.Latitude", lat)
            setValue("endPoint.Longitude", lng)
        } else if (tempTangentLine.startPoint && tempTangentLine.endPoint && mouseMove) {
            setMouseMove(false)
        } else if (tempTangentLine.startPoint && tempTangentLine.endPoint && !mouseMove) {
            setValue("startPoint.Latitude", lat)
            setValue("startPoint.Longitude", lng)
            setTempTangentLine({
                startPoint: { Latitude: lat, Longitude: lng }
            })
        }
    })

    useMapEvent("mousemove", (e: LeafletMouseEvent) => {
        const { lat, lng } = getFixedPoint(e)
        if (tempTangentLine.startPoint && mouseMove) {
            setTempTangentLine(p => ({ ...p, endPoint: { Latitude: lat, Longitude: lng } }))
            setValue("endPoint.Latitude", lat)
            setValue("endPoint.Longitude", lng)
        }
    })
    useEffect(() => {
        if (index !== -1) {
            setTempTangentLine(previousTangentLine)
        }
        setMouseMove(!mouseMove)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startLatForm, startLongForm])
    const returnToAddingMode = () => {
        setAddingMode(AddingModeEnum.INITIAL_STATE)
        setCurrentIndex?.(-1);
    }

    const onSubmit = (data: TangentLine) => {
        if (tempTangentLine === undefined) {
            alert("Select tangentLine")
            return;
        }
        const temp = {
            startPoint: {
                Latitude: data?.startPoint.Latitude || 0,
                Longitude: data?.startPoint?.Longitude || 0
            },
            endPoint: {
                Latitude: data?.endPoint?.Latitude || 0,
                Longitude: data?.endPoint?.Longitude || 0
            },
            type: "TangentLine" as const
        }

        if (index !== -1) {
            if (window.confirm(`are you sure about edit this TangentLine ?`))
                dispatch(editTangentLine({ index, tangentLine: temp }))

        } else if (tempTangentLine.startPoint && tempTangentLine.endPoint) {
            dispatch(addTangentLine(temp))
        }
        setTempTangentLine({})
        returnToAddingMode();
    }

    const handleReset = () => returnToAddingMode();

    useEffect(() => {
        if (isNaN(startLatForm) || isNaN(startLongForm) || isNaN(endLatForm) || isNaN(endLongForm)) {
            return;
        }
    }, [endLatForm, endLongForm, tangentLines, startLatForm, startLongForm, tempTangentLine])

    return (
        <>
            <SidebarHeader name={`${index === -1 ? 'New' : 'Edit'} Leg`} />
            {tempTangentLine.startPoint && tempTangentLine.endPoint && <DisplayTangentLine tangentLine={tempTangentLine} type='temp' />}
            <form id='add-leg-form' onReset={handleReset} className={classes.addNewTarget} onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.halfSize}>
                    <Input type='number' required label='start Latitude' {...register("startPoint.Latitude", { valueAsNumber: true })} />
                    <Input type='number' required label='start Long' {...register("startPoint.Longitude", { valueAsNumber: true })} />
                </div>
                <div className={classes.halfSize}>
                    <Input type='number' required label='end Latitude' {...register("endPoint.Latitude", { valueAsNumber: true })} />
                    <Input type='number' required label='end Long' {...register("endPoint.Longitude", { valueAsNumber: true })} />
                </div>
            </form>
            <SaveAndCancel saveType="submit" cancelType='reset' form='add-leg-form' saveText={`${index !== -1 ? "Save" : "Add"} TangentLine`} />
        </>
    )
}

export default AddTangentLine
