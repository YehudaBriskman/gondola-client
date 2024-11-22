import classes from "./amtList.module.css"
import amtIcon from '../../../assets/icons/earth-grid-of-horizontal-parallel-lines-svgrepo-com (1).svg'
import Button from "../../button/Button";
import AddingModeEnum from "../../../utils/addingModeEnum";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useMap } from "react-leaflet";
import { ConvertPoint } from "../../../utils/general";

type amtsProps = {
    setAddingMode?: React.Dispatch<React.SetStateAction<AddingModeEnum>>;
    amtView: boolean[];
    setAmtView: React.Dispatch<React.SetStateAction<boolean[]>>;
    mode: "req" | "res";
};

export const AmtList = ({ setAddingMode, amtView, setAmtView, mode }: amtsProps) => {
    const amts = useSelector((state: RootState) => state.amts.amtHolder)
    const returnToAddingMode = () => { setAddingMode !== undefined ? setAddingMode(AddingModeEnum.INITIAL_STATE) : console.log(); }
    const openAddAmt = () => { setAddingMode !== undefined ? setAddingMode(AddingModeEnum.ADD_AMT) : console.log(); }
    const toggleAmtView = (i: number) => {
        setAmtView(prev => {
            const newAmtView = [...prev];
            newAmtView[i] = !newAmtView[i];
            return newAmtView;
        });
    }
    const setAllAmtView = () => { setAmtView(Array(amtView.length).fill(!isAllView(amtView))); }
    
    const isAllView = (view: boolean[]) => {
        return !view.includes(false)
    }
    const map = useMap();
    return (
        <>
            {mode === "req" &&
                <div className={classes.amt_header}>
                    <div className={classes.amt_title}>
                        <img src={amtIcon} alt="amt icon"/>
                        <span>Amt List</span>
                    </div>
                    <input className={classes.checkbox} checked={isAllView(amtView)} type="checkbox" onChange={setAllAmtView} />
                </div>
            }
            <div className={classes.list}>
                <div className={`${classes.listContainer} ${mode==='req'&&classes.flow}`}>
                    {amts.length > 0 ? amts.map((amt, i) => (
                        <div key={i} className={classes.amt} >
                            <div className={classes.amtPart}>
                                <input className={classes.checkbox} checked={amtView[i]} type="checkbox" onChange={() => toggleAmtView(i)} />
                            </div>
                            <div className={classes.amtPart} onClick={() => {
                                map.flyTo(ConvertPoint.toLeafletPoint(amt.center), undefined, { animate: true, duration: 2, })
                            }}>
                                <span className={classes.title}>latitude:</span>
                                <div>{amt.center.Latitude}</div>
                                <span className={classes.title}>longtitude:</span>
                                <div>{amt.center.Longitude}</div>
                            </div>
                            <div className={classes.amtPart}>
                                <span className={classes.title}>Radius:</span>
                                <div>{amt.radius}</div>
                            </div>
                        </div>
                    ))
                        :
                        <div className={classes.amt_header}>
                            <span>
                                No Amts
                            </span>
                        </div>
                    }
                </div>
            </div>
            {setAddingMode && <div className={classes.wrapper}>
                <Button data-testid="submit" variant='standard' onClick={openAddAmt}>Add Amt</Button>
                <Button data-testid="reset" variant='standard' onClick={(returnToAddingMode)}>exit</Button>
            </div>}

        </>
    )
}

