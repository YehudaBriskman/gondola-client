import React, { useEffect, useState } from 'react'
import SaveAndCancel from '../../saveAndCancel/SaveAndCancel'
import SidebarHeader from '../../sidebarHeader/SidebarHeader'
import AddingModeEnum from '../../../utils/addingModeEnum';
import DisplayArc from '../../map/DisplayArc';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useForm } from 'react-hook-form';
import { useMapEvent } from 'react-leaflet';
import { getFixedPoint } from '../../../utils/general';
import Input from '../../inputs/Input';
import classes from "../addNewTarget/AddNewTarget.module.css"
import { addArc, editArc } from '../../../store/slices/arcSlice';
import { alertFailedRequest } from '../../../utils/alerts/alerts';
import { generateCenterPoint } from '../../../utils/calcArc';
import { z } from 'zod';
import { ArcSchema } from '../../../gondola_types/navigationElements';
import { PointSchema } from '../../../gondola_types/basicElements';

type Props = {
    setAddingMode: React.Dispatch<React.SetStateAction<AddingModeEnum>>;
    setCurrentIndex?: React.Dispatch<React.SetStateAction<number>>;
    index: number
}

const UpdatedArcSchema = ArcSchema.extend({
    startPoint: PointSchema.optional(),
    endPoint: PointSchema.optional()
})

type UpdatedArc = z.infer<typeof UpdatedArcSchema>


const AddArc = ({ setAddingMode, index, setCurrentIndex }: Props) => {
    const arcs = useSelector((root: RootState) => root.arcs.arcHolder)
    const legs = useSelector((root: RootState) => root.legs.legHolder)
    const tangentLines = useSelector((root: RootState) => root.tangentLines.tangentsLineHolder)


    const previousArc: UpdatedArc | undefined = arcs[index] || {
        radius: 0,
        centerPoint: {
            Latitude: 0,
            Longitude: 0
        },
        endPoint: {
            Latitude: 0,
            Longitude: 0
        },
        startPoint: {
            Latitude: 0,
            Longitude: 0
        },
        clockwise: false,
        startAngle: 0,
        endAngle: 0,
    }

    const { register, handleSubmit, watch, setValue } = useForm<UpdatedArc>({
        defaultValues: previousArc
    })

    const radius = watch("radius")
    const clockwise = watch("clockwise")
    const startAngle = watch("startAngle")
    const endAngle = watch("endAngle")
    const latStartForm = watch("startPoint.Latitude")
    const longStartForm = watch("startPoint.Longitude")
    const latCenterForm = watch("centerPoint.Latitude")
    const longCenterForm = watch("centerPoint.Longitude")
    const latEndForm = watch("endPoint.Latitude")
    const longEndForm = watch("endPoint.Longitude")
    const dispatch = useDispatch()

    const [tempArc, setTempArc] = useState<UpdatedArc | undefined>(previousArc)
    const [hasStart, setHasStart] = useState<boolean>(false)
    const [hasEnd, setHasEnd] = useState<boolean>(false)


    useMapEvent("click", (e) => {
        const { lat, lng } = getFixedPoint(e)
        if (!hasStart) {
            setValue("startPoint.Latitude", lat)
            setValue("startPoint.Longitude", lng)
            const temp: UpdatedArc = {
                startPoint: {
                    Latitude: lat,
                    Longitude: lng,
                },
                endPoint: {
                    Latitude: 0,
                    Longitude: 0,
                },
                centerPoint: generateCenterPoint({ Latitude: lat, Longitude: lng }, { Latitude: 0, Longitude: 0 }),
                radius,
                clockwise,
                startAngle,
                endAngle,
            }
            setTempArc(temp)
            setHasEnd(false)
            setHasStart(true)
        } else {
            setValue("endPoint.Latitude", lat)
            setValue("endPoint.Longitude", lng)
            const temp: UpdatedArc = {
                startPoint: {
                    Latitude: tempArc?.startPoint?.Latitude || 0,
                    Longitude: tempArc?.startPoint?.Longitude || 0,
                },
                endPoint: {
                    Latitude: lat,
                    Longitude: lng,
                },
                centerPoint: generateCenterPoint({ Latitude: tempArc?.startPoint?.Latitude || 0, Longitude: tempArc?.startPoint?.Longitude || 0 }, { Latitude: lat, Longitude: lng }),
                radius,
                clockwise,
                startAngle,
                endAngle,
            }
            setTempArc(temp)
            setHasEnd(true)
        }
    })

    const returnToAddingMode = () => {
        setAddingMode(AddingModeEnum.INITIAL_STATE)
        setCurrentIndex?.(-1);
    }

    const onSubmit = (data: UpdatedArc) => {
        if (tempArc === undefined) {
            alert("Select arc")
            return;
        }
        if (!legs || legs.length === 0 || !tangentLines || tangentLines.length === 0) {
            alertFailedRequest("Request denied", "Without Legs or Tangent-Lines, you can't save Arcs")
            return
        }
        if (index !== -1) {
            if (window.confirm(`are you sure about edit this Arc ?`)) {
                const newArc: UpdatedArc = {
                    endAngle: +data.endAngle,
                    startAngle: +data.startAngle,
                    clockwise: data.clockwise,
                    radius: +data.radius,
                    centerPoint: generateCenterPoint({ Latitude: latStartForm, Longitude: longStartForm }, { Latitude: latEndForm, Longitude: longEndForm }),
                }
                dispatch(editArc({ index, arc: newArc }))
            }
        } else {
            const newArc: UpdatedArc = {
                endAngle: +data.endAngle,
                startAngle: +data.startAngle,
                clockwise: data.clockwise,
                radius: +data.radius,
                centerPoint: generateCenterPoint({ Latitude: latStartForm, Longitude: longStartForm }, { Latitude: latEndForm, Longitude: longEndForm }),
            }
            dispatch(addArc(newArc))
        }
        returnToAddingMode();
    }
    const handleReset = () => returnToAddingMode();

    useEffect(() => {
        if (isNaN(latEndForm) || isNaN(longEndForm) || isNaN(latStartForm) || isNaN(longStartForm) || isNaN(latCenterForm) || isNaN(longCenterForm)) {
            return;
        }
        const updateArc: UpdatedArc = {
            endAngle,
            startAngle,
            clockwise,
            startPoint: {
                Latitude: latStartForm,
                Longitude: longStartForm
            },
            endPoint: {
                Latitude: latEndForm,
                Longitude: longEndForm
            },
            centerPoint: generateCenterPoint({ Latitude: latStartForm, Longitude: longStartForm }, { Latitude: latEndForm, Longitude: longEndForm }),
            radius,
        }
        setTempArc(updateArc)
        console.log(updateArc);

    }, [setTempArc, latStartForm, longStartForm, latCenterForm, longCenterForm, latEndForm, longEndForm, endAngle, startAngle, clockwise, radius])
    return (
        <>
            <SidebarHeader name={`${index === -1 ? 'New' : 'Edit'} Arc`} />
            {tempArc && hasEnd && hasStart && <DisplayArc type='temp' arc={tempArc} />}
            <form id='add-arc-form' onReset={handleReset} className={classes.addNewTarget} onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.halfSize}>
                    <Input type='number' required label='start Latitude' {...register("startPoint.Latitude", { valueAsNumber: true })} />
                    <Input type='number' required label='start Long' {...register("startPoint.Longitude", { valueAsNumber: true })} />
                </div>
                <div className={classes.halfSize}>
                    <Input type='number' required label='end Latitude' {...register("endPoint.Latitude", { valueAsNumber: true })} />
                    <Input type='number' required label='end Long' {...register("endPoint.Longitude", { valueAsNumber: true })} />
                </div>
                <div className={classes.halfSize}>
                    <Input type='number' label='Degree Start' min={-360} max={360} {...register("startAngle", { valueAsNumber: true })} />
                    <Input type='number' label='Degree End' min={-360} max={360} {...register("endAngle", { valueAsNumber: true })} />
                    <Input
                        required
                        type='number'
                        label='Radius'
                        {...register("radius", { valueAsNumber: true })}
                    />
                    <Input id='custom-checkbox' className={classes.clockwise} type='checkbox' {...register("clockwise")} />
                </div>
            </form>

            <SaveAndCancel saveType="submit" cancelType='reset'
                form='add-arc-form' saveText={`${index !== -1 ? "Save" : "Add"} Arc`} />
        </>
    )
}

export default AddArc
