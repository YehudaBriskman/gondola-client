import { useForm } from "react-hook-form";
import Input from "../../inputs/Input";
import SaveAndCancel from "../../saveAndCancel/SaveAndCancel";
import classes from "./addAmt.module.css"
import AddingModeEnum from "../../../utils/addingModeEnum";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useMapEvent } from "react-leaflet";
import { getFixedPoint } from "../../../utils/general";
import SidebarHeader from "../../sidebarHeader/SidebarHeader";
import { addAmt } from "../../../store/slices/amtSlice";
import { LeafletPoint } from "../../../gondola_types/navigationElements";
import { addNewAmt } from "../../../utils/amtsCtrl/amtsServices";


type AddNewAmtProps = {
    setAddingMode: React.Dispatch<React.SetStateAction<AddingModeEnum>>;
    amtView: boolean[];
    setAmtView: React.Dispatch<React.SetStateAction<boolean[]>>;
};

function AddAmt({ setAddingMode, amtView, setAmtView }: AddNewAmtProps) {
    const { register, handleSubmit, watch, setValue } = useForm();
    
    const radius = watch("radius")
    const latForm = watch("center.lat")
    const lonForm = watch("center.long")
    const dispatch = useDispatch();
    const [tempPoint, setTempPoint] = useState<LeafletPoint & { radius: number }>();

    useEffect(() => {
        if (isNaN(latForm) || isNaN(lonForm)) {
            return;
        }
        setTempPoint({ radius, lat: latForm, lng: lonForm })
    }, [setTempPoint, latForm, lonForm, radius])

    useEffect(() => {
        setAmtView(new Array(amtView.length).fill(true))
    }, [setAmtView,amtView.length])

    useEffect(() => {
        if (isNaN(latForm) || isNaN(lonForm)) {
            return;
        }
        setTempPoint({ radius, lat: latForm, lng: lonForm })
    }, [setTempPoint, latForm, lonForm, radius])
    
    useEffect(() => {
        setAmtView(new Array(amtView.length).fill(true));
    }, [setAmtView,amtView.length])

     useEffect(() => {
        setTempPoint((prev) => {
            if (!prev) return undefined;
            const { lat, lng } = prev;
            return { lat, lng, radius }
        })
    }, [radius, setTempPoint])
    
    useMapEvent("click", (e) => {
        const { lat, lng } = getFixedPoint(e);
        setValue("center.lat", lat);
        setValue("center.long", lng);
        setTempPoint({ lat, lng, radius });
    })

    useMapEvent("click", (e) => {
        const { lat, lng } = getFixedPoint(e);
        setValue("center.lat", lat);
        setValue("center.long", lng);
        setTempPoint({ lat, lng, radius });
    })

    const returnToAmtList = () => {
        updateList(amtView);
        setAddingMode(AddingModeEnum.AMT_LIST)
    }
    const updateList = (amtView: boolean[]) => {
        const updatedList = new Array(amtView.length).fill(false);
        setAmtView([...updatedList, false]);
    }

    const checkData = (data: any) => {
        if (!(data.center.lat && data.center.long && data.radius)) {
            alert("Enter Data")
            return
        } return data
    }

    const onSubmit = (data: any) => {
        if (tempPoint === undefined) {
            alert("Select Center")
            return;
        }
        const amt = { ...data, center: { lat: tempPoint?.lat, long: tempPoint?.lng } };
        if (window.confirm(`are you sure about add Amt?`)) {
            addNewAmt(amt)
            dispatch(addAmt(checkData(amt)))
        }
        updateList(amtView);
        returnToAmtList();
    }

    const handleReset = () => returnToAmtList();


    return (
        <>
            <SidebarHeader name="Add AMT" />
            <form id='add-amt-form' onReset={handleReset} className={classes.container} onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.halfSize}>
                    <Input type='number' required label='Latitude' {...register("center.lat", { valueAsNumber: true })} />
                    <Input type='number' required label='Longitude' {...register("center.long", { valueAsNumber: true })} />
                </div>
                <div>
                    <Input type='number' required label='radius' {...register("radius", { valueAsNumber: true })} />
                </div>
            </form>

            <SaveAndCancel saveType="submit" cancelType='reset' form='add-amt-form' saveText={"Add Amt"} />
        </>
    )
}
export default AddAmt
