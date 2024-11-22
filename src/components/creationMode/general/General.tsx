import classes from '../addNewTarget/AddNewTarget.module.css'
import React from "react";
import { useForm } from "react-hook-form";
import AddingModeEnum from "../../../utils/addingModeEnum";
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../inputs/Input';
import { RootState } from '../../../store/store';
import SaveAndCancel from '../../saveAndCancel/SaveAndCancel';
import SidebarHeader from '../../sidebarHeader/SidebarHeader';
import { ALTITUDE, RADIUS, SPEED, WIND_DIRECTION, WIND_SPEED } from '../../../utils/generalDefaultValue';
import { setGeneral } from '../../../store/slices/generalSlice';
import { General } from '../../../gondola_types/navigationElements';

type AddNewTargetProps = {
    setAddingMode: React.Dispatch<React.SetStateAction<AddingModeEnum>>;
}

function GeneralData({ setAddingMode }: AddNewTargetProps) {
    const generalData = useSelector((state: RootState) => state.requestRoute.routeHolder)
    const { register, handleSubmit } = useForm<General>({ defaultValues: { ...generalData } });
    const dispatch = useDispatch();
    const onSubmit = (data: General) => {
        dispatch(setGeneral(data));
        setAddingMode(AddingModeEnum.INITIAL_STATE)
    };

    const onReset = () => setAddingMode(AddingModeEnum.INITIAL_STATE);

    return (
        <>
            <SidebarHeader name="General" />
            <form
                id="general-form"
                data-testid="general-form"
                className={classes.addNewTarget}
                onReset={onReset}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    required
                    type='number'
                    min={0}
                    label='Speed'
                    defaultValue={SPEED}
                    {...register("speed", { valueAsNumber: true })}
                />
                <Input
                    required
                    type='number'
                    min={0}
                    label='Altitude'
                    defaultValue={ALTITUDE}
                    {...register("altitude", { valueAsNumber: true })}
                />
                <Input
                    required
                    type='number'
                    min={0}
                    max={360}
                    label='Wind Direction'
                    defaultValue={WIND_DIRECTION}
                    {...register("windDirection", { valueAsNumber: true })}
                />
                <Input
                    required
                    type='number'
                    min={0}
                    label='Wind Speed'
                    defaultValue={WIND_SPEED}
                    {...register("windSpeed", { valueAsNumber: true })}
                />
                <Input
                    required
                    type='number'
                    min={0}
                    label='Radius'
                    defaultValue={RADIUS}
                    {...register("radius", { valueAsNumber: true })}
                />
                <Input
                    required
                    type='number'
                    min={0}
                    defaultValue={0}
                    label='Photo delay in start'
                    {...register("photoDelayAtStart", { valueAsNumber: true })}
                />
            </form>
            <SaveAndCancel form='general-form' saveType='submit' cancelType='reset' />
        </>
    );
}

export default GeneralData;
