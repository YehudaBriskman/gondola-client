import React, { useRef, useState } from "react";
import AddingModeEnum from "../../../utils/addingModeEnum";
import Button from "../../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addPoint, clearPolygon, editPoint, removePoint } from "../../../store/slices/polygonSlice";
import { useMapEvent } from "react-leaflet";
import SidebarHeader from "../../sidebarHeader/SidebarHeader";
import classes from "./addPolygon.module.css"
import { RootState } from "../../../store/store";
import Input from "../../inputs/Input";
import { ConvertPoint, getFixedPoint } from "../../../utils/general";
import SaveAndCancel from "../../saveAndCancel/SaveAndCancel";
import DisplayPointData from "../displayPointData/DisplayPointData";


type AddPolygonProps = {
  setAddingMode: React.Dispatch<React.SetStateAction<AddingModeEnum>>;
}
export default function AddPolygon({
  setAddingMode
}: AddPolygonProps) {
  const polygon = useSelector((e: RootState) => e.polygon.polygonHolder);
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null)
  useMapEvent("click", e => {
    dispatch(addPoint(getFixedPoint(e)))
  });
  const onCancel = () => {
    if(polygon.length > 0)
    if (window.confirm("are you sure want to delete all of this polygon ?"))
      dispatch(clearPolygon());
    setAddingMode(AddingModeEnum.INITIAL_STATE)
  }
  return (<>
    <SidebarHeader name="Edit Polygon" />
    <div className={classes.wrapper}>
      <div ref={ref} className={classes.polygonPoints}>
        {polygon.map((point, index) => (
          <DisplayPointData
            key={index}
            point={ConvertPoint.toLeafletPoint(point)}
            onEdit={(lat, lng) => dispatch(editPoint({ index, point: { lat, lng } }))}
            onRemove={() => dispatch(removePoint(index))}
          />
        ))}
      </div>
      <AddPoint listRef={ref} onAdd={(lat, lng) => dispatch(addPoint({ lat, lng }))} />
    </div>
    <SaveAndCancel
      onSave={() => setAddingMode(AddingModeEnum.INITIAL_STATE)}
      onCancel={onCancel}
    />
  </>
  );
};

function AddPoint({ onAdd, listRef }: { onAdd: (lat: number, lng: number) => void; listRef: React.RefObject<HTMLDivElement> }) {
  const [lat, setLat] = useState<number>(NaN)
  const [lng, setLng] = useState<number>(NaN)
  const handleClick = () => {
    if (!isNaN(lat) && !isNaN(lng)) {
      onAdd(lat, lng)
      setLat(NaN)
      setLng(NaN)
      setTimeout(() => {
        listRef.current?.scrollTo({
          top: listRef.current.scrollHeight
        })
      }, 0);
    }
  }
  return (
    <div className={classes.addPoint}>
      <Input type="number" placeholder="Latitude" value={isNaN(lat) ? ' ' : lat} onChange={e => setLat(parseFloat(e.currentTarget.value))} />
      <Input type="number" placeholder="Longitude" value={isNaN(lng) ? ' ' : lng} onChange={e => setLng(parseFloat(e.currentTarget.value))} />
      <Button variant="standard" onClick={handleClick}>+</Button>
    </div>
  )
}
