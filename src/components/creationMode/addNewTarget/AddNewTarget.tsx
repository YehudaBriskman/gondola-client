import classes from './AddNewTarget.module.css'
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import addingModeEnum from "../../../utils/addingModeEnum";
import AddingModeEnum from "../../../utils/addingModeEnum";
import { useDispatch, useSelector } from 'react-redux';
import { addTarget, editTarget } from '../../../store/slices/targetsSlice';
import { useMapEvent } from 'react-leaflet';
import DisplayPoint from '../../map/DisplayPoint';
import Input from '../../inputs/Input';
import Select from '../../inputs/Select';
import SidebarHeader from '../../sidebarHeader/SidebarHeader';
import { getFixedPoint } from '../../../utils/general';
import { RootState } from '../../../store/store';
import { Link } from 'react-router-dom';
import Button from '../../button/Button';
import SaveAndCancel from '../../saveAndCancel/SaveAndCancel';
import uploadIcon from "../../../assets/icons/upload-minimalistic-svgrepo-com.svg"
import { Point } from '../../../gondola_types/basicElements';
import { LeafletPoint, Target } from '../../../gondola_types/navigationElements';

const DEFAULT_VALUE_FOR_QUALITY = 1;
const DEFAULT_VALUE_FOR_PRIORITY = 1;
const DEFAULT_VALUE_FOR_PHOTO_DIRECTION = undefined;
const directionList = [DEFAULT_VALUE_FOR_PHOTO_DIRECTION, "SOUTH", "NORTH", "EAST", "WEST"] as const;

type AddNewTargetProps = {
  setAddingMode: React.Dispatch<React.SetStateAction<AddingModeEnum>>;
  setCurrentIndex?: React.Dispatch<React.SetStateAction<number>>;
  index: number
};

type TargetWithDestructuredPoint = Omit<Target, "point"> & Point;

function AddNewTarget({ setAddingMode, index, setCurrentIndex }: AddNewTargetProps) {
  const targets = useSelector((root: RootState) => root.targets.targetsHolder);
  const previousPoint: Target | undefined = targets[index];
  const { register, handleSubmit, watch, setValue } = useForm<TargetWithDestructuredPoint>({
    defaultValues: previousPoint ? {
      Latitude: previousPoint.point.Latitude,
      Longitude: previousPoint.point.Longitude,
      ...previousPoint,
    } : {
      photoDirection: DEFAULT_VALUE_FOR_PHOTO_DIRECTION,
      priority: DEFAULT_VALUE_FOR_PRIORITY,
      quality: DEFAULT_VALUE_FOR_QUALITY
    }
  });

  const priority = watch("priority")
  const latForm = watch("Latitude")
  const lonForm = watch("Longitude")
  const dispatch = useDispatch();
  const [tempPoint, setTempPoint] = useState<LeafletPoint & { priority: number }>();

  useMapEvent("click", (e) => {
    const { lat, lng } = getFixedPoint(e);
    setValue("Latitude", lat);
    setValue("Longitude", lng);
    setTempPoint({ lat, lng, priority });
  })

  useEffect(() => {
    setTempPoint(prev => {
      if (!prev) return undefined;
      const { lat, lng } = prev;
      return { lat, lng, priority }
    })
  }, [priority, setTempPoint])

  const returnToAddingMode = () => {
    setAddingMode(addingModeEnum.INITIAL_STATE)
    setCurrentIndex?.(-1);
  }

  const onSubmit = (data: TargetWithDestructuredPoint) => {
    if (tempPoint === undefined) {
      alert("Select Point")
      return;
    }
    const target = { ...data, point: { Latitude: tempPoint.lat, Longitude: tempPoint.lng }, photoDirection: data.photoDirection || undefined };
    let list;
    if (!localStorage.getItem('legTarget'))
    {
      list = [target]
    }
    else
      list = [...JSON.parse(localStorage.getItem('legTarget')??""), target]

    localStorage.setItem('legTarget', JSON.stringify(list))
    if (index !== -1) {
      if(window.confirm(`are you sure about edit target :${target.name} ?`))
      dispatch(editTarget({ index, point: target }))
    } else {
      dispatch(addTarget(target))
    }
    returnToAddingMode();
  };

  const handleReset = () => returnToAddingMode();

  useEffect(() => {
    if (isNaN(latForm) || isNaN(lonForm)) {
      return;
    }
    setTempPoint({ priority, lat: latForm, lng: lonForm })
  }, [setTempPoint, latForm, lonForm, priority])
  return (
    <>
      {tempPoint && <DisplayPoint type='temp' point={{ lat: tempPoint.lat, lng: tempPoint.lng }} priority={tempPoint.priority} />}

      <SidebarHeader name={`${index === -1 ? 'New' : 'Edit'} Target`} />
      <div className={classes.csvLinkWrapper}>
        <Button>
          <Link className={classes.csvLink} to={"/upload-csv"}>
            <img src={uploadIcon} alt="Upload icon" />
            <span>Upload from csv file</span>
          </Link>
        </Button>
      </div>
      <form id='add-target-form' onReset={handleReset} className={classes.addNewTarget} onSubmit={handleSubmit(onSubmit)}>
        <Input
          required
          type='text'
          label='Target Name'
          {...register("name")}
        />
        <div className={classes.halfSize}>
          <Select label='Priority' {...register("priority", { valueAsNumber: true })}>
            {Array(5).fill(undefined).map((_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
          </Select>
          <Select label='Quality' {...register("quality", { valueAsNumber: true })} >
            {Array(5).fill(undefined).map((_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
          </Select>
        </div>

        <div className={classes.halfSize}>
          <Input type='number' required label='Latitude' {...register("Latitude", { valueAsNumber: true })} />
          <Input type='number' required label='Longitude' {...register("Longitude", { valueAsNumber: true })} />
        </div>
        <Select label='Photo Direction' {...register("photoDirection")}>
          {directionList.map((direction, i) => <option key={i} value={direction}> {direction}</option>)}
        </Select>
      </form>

      <SaveAndCancel saveType="submit" cancelType='reset' form='add-target-form' saveText={`${index !== -1 ? "Save" : "Add"} target`} />
    </>
  );
}
export default AddNewTarget;
