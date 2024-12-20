
import Button from "../button/Button";
import classes from "./showElements.module.css";
import showIcon from "../../assets/icons/eye&arrow/eye-svgrepo-com.svg";
import disableIcon from '../../assets/icons/eye&arrow/eye-slash-svgrepo-com.svg'
import { useEffect, useState } from "react";
import { Arc, Target, Leg, TangentLine, FlyZone, Amt } from "../../gondola_types/navigationElements";
import { Path } from "../../gondola_types/basicElements";

type ShowElementsProps = {
    targetsView: { value: boolean, onChange: Function };
    arcsView: { value: boolean, onChange: Function };
    polygonView: { value: boolean, onChange: Function };
    entryPointView: { value: boolean, onChange: Function };
    exitPointView: { value: boolean, onChange: Function };
    amtsView: { value: boolean[], onChange: Function };
    legsView: { value: boolean, onChange: Function };
    tangentLineView: { value: boolean, onChange: Function };
    targets: Target[]
    arcs: Arc[]
    legs: Leg[]
    tangentLine: TangentLine[];
    polygon: FlyZone
    entry: Path | undefined | null | Partial<Path>
    exit: Path | undefined | null | Partial<Path>
    amts: Amt[] | undefined;
}

type ElementsData = {
    name: string;
    viewFunction: Function;
    data: Target[] | FlyZone | Path | Leg[] | Arc[] | Amt[] | TangentLine[] | undefined | null | Partial<Path>;
    isVisible: Function;
    elementVisible: boolean;
}

const isAnyView = (view: boolean[]) => {
    return view.includes(true)
}


export default function ShowElements({
    legsView, targetsView, polygonView, entryPointView, exitPointView, amtsView, legs, targets, polygon, entry, exit, amts, arcsView, tangentLineView, tangentLine, arcs
}: ShowElementsProps
) {
    const [targetIsVisible, setTargetVisible] = useState(targetsView.value);
    const [arcIsVisible, setArcVisible] = useState(arcsView.value);
    const [polygonIsVisible, setPolygonVisible] = useState(polygonView.value);
    const [entryPointIsVisible, setEntryPintVisible] = useState(entryPointView.value);
    const [exitPointIsVisible, setExitPointVisible] = useState(exitPointView.value);
    const [amtsIsVisible, setamtsVisible] = useState(isAnyView(amtsView.value))
    const [legsIsVisible, setlegsVisible] = useState(legsView.value)
    const [tangentLineIsVisible, setTangentLineVisible] = useState(tangentLineView.value)

    const setAllAmtView = () => { setamtsVisible(!amtsIsVisible); }


    const elementsData: ElementsData[] = [
        { name: 'Target', viewFunction: targetsView.onChange, data: targets, isVisible: () => setTargetVisible(!targetIsVisible), elementVisible: targetIsVisible },
        { name: 'Arc', viewFunction: arcsView.onChange, data: arcs, isVisible: () => setArcVisible(!arcIsVisible), elementVisible: arcIsVisible },
        { name: 'Polygon', viewFunction: polygonView.onChange, data: polygon, isVisible: () => setPolygonVisible(!polygonIsVisible), elementVisible: polygonIsVisible },
        { name: 'Entry Point', viewFunction: entryPointView.onChange, data: entry, isVisible: () => setEntryPintVisible(!entryPointIsVisible), elementVisible: entryPointIsVisible },
        { name: 'Exit Point', viewFunction: exitPointView.onChange, data: exit, isVisible: () => setExitPointVisible(!exitPointIsVisible), elementVisible: exitPointIsVisible },
        { name: 'Legs', viewFunction: legsView.onChange, data: legs, isVisible: () => setlegsVisible(!legsIsVisible), elementVisible: legsIsVisible },
        { name: 'Tangent Lines', viewFunction: tangentLineView.onChange, data: tangentLine, isVisible: () => setTangentLineVisible(!tangentLineIsVisible), elementVisible: tangentLineIsVisible },
        { name: 'Amts', viewFunction: amtsView.onChange, data: amts, isVisible: setAllAmtView, elementVisible: amtsIsVisible },
    ]

    const handleClick = (element: ElementsData) => {
        element.viewFunction();
        element.isVisible();
    }

    const nonEmptyArray = (element: any) => { return Array.isArray(element.data) && element.data.length !== 0 }
    const nonEmptyObject = (element: any) => { return typeof element.data === 'object' && Object.keys(element.data).length !== 0 }

    useEffect(() => {
        setamtsVisible(isAnyView(amtsView.value))
    }, [amtsView.value])

    return (
        <>
            <div className={classes.showElements}>
                {elementsData.map((element, index) => {
                    if (!(nonEmptyArray(element) || nonEmptyObject(element)))
                        return <span key={index} />
                    return (
                        <div key={index} className={classes.showElement} >
                            {element.name}
                            <Button className={classes.showIcon} onClick={() => handleClick(element)}>
                                {(element.elementVisible) ?
                                    <img src={showIcon} alt="show" loading='lazy' />
                                    :
                                    <img className={classes.hideIcon} src={disableIcon} alt="show" loading='lazy' />
                                }
                            </Button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
