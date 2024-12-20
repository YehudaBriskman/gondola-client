import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import CreationModeMenu from '../../components/creationMode/creationModeMenu/CreationModeMenu'
import AddingModeEnum from '../../utils/addingModeEnum';
import { RootState } from '../../store/store';
import DisplayPoint from '../../components/map/DisplayPoint';
import DisplayPath from '../../components/map/DisplayPath';
import SideBarLayout from '../../layouts/SideBarLayout';
import AddNewTarget from '../../components/creationMode/addNewTarget/AddNewTarget';
import AddPolygon from '../../components/creationMode/addPolygon/AddPolygon';
import AddPath from '../../components/creationMode/addPath/AddPath';
import General from '../../components/creationMode/general/General';
import DisplayPolygon from '../../components/map/DisplayPolygon';
import ShowElements from '../../components/showElements/ShowElements';
import AddLeg from '../../components/creationMode/addLeg/AddLeg';
import AddArc from '../../components/creationMode/addArc/AddArc';
import AddTangentLine from '../../components/creationMode/addTangentLine/AddTAngentLine';
import ReturnHome from '../../components/returnHome/ReturnHome';
import arrowDown from "../../assets/icons/eye&arrow/arrow-down-svgrepo-com.svg"
import { dropTarget } from '../../store/slices/targetsSlice';
import DisplayArc from '../../components/map/DisplayArc';
import { dropArc } from '../../store/slices/arcSlice';
import Accordion from '../../components/accordion/Accordion';
import Loading from '../../components/loading/Loading';
import DisplayLeg from '../../components/map/DisplayLeg';
import { dropLeg } from '../../store/slices/legSlice';
import eyeIcon from "../../assets/icons/eye&arrow/eye-svgrepo-com.svg"
import AddAmt from '../../components/creationMode/addAmt/AddAmt';
import { AmtList } from '../../components/response/amtList/AmtList';
import DisplayAmt from '../../components/map/DisplayAmt';
import { dropTangentLine } from '../../store/slices/tangentLineSlice';
import DisplayTangentLine from '../../components/map/DisplayTangentLine';
import { createArcs } from '../../utils/calcArc';
import { Leg, Target } from '../../gondola_types/navigationElements';



export type progressType = { iterationCount: number, percentage: number } | null
export type SetProgressType = React.Dispatch<React.SetStateAction<progressType | null>>

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

export default function CreationMode() {

    const dispatch = useDispatch()

    const [progress, setProgress] = useState<progressType>(null)
    const [addingMode, setAddingMode] = useState(AddingModeEnum.INITIAL_STATE);
    const [currentPoint, setCurrentPoint] = useState<number>(-1);
    const [currentArc, setCurrentArc] = useState<number>(-1);
    const [currentLeg, setCurrentLeg] = useState<number>(-1);
    const [currentTangentLine, setCurrentTangentLine] = useState<number>(-1);
    const targets = useSelector((state: RootState) => state.targets.targetsHolder);
    const arcs = useSelector((state: RootState) => state.arcs.arcHolder);
    const polygonPoints = useSelector((state: RootState) => state.polygon.polygonHolder);
    const legs = useSelector((e: RootState) => e.legs.legHolder);
    const legsTargets: Target[] = processLegs(legs)
    const tangentsLines = useSelector((e: RootState) => e.tangentLines.tangentsLineHolder);
    const amts = useSelector((state: RootState) => state.amts.amtHolder);
    const entry = useSelector((state: RootState) => state.entryPath.pathsHolder);
    const exit = useSelector((state: RootState) => state.exitPath.pathsHolder);
    const responseRoute = useSelector((state: RootState) => state.response.responseHolder);

    const editPoint = (index: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setAddingMode(AddingModeEnum.ADD_TARGETS)
        setCurrentPoint(index)
    }
    const editArc = (index: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setAddingMode(AddingModeEnum.ADD_ARC)
        setCurrentArc(index)
    }
    const editLeg = (index: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setAddingMode(AddingModeEnum.ADD_LEG)
        setCurrentLeg(index)
    }
    const editTangentLine = (index: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setAddingMode(AddingModeEnum.ADD_TANGENT_LINE)
        setCurrentTangentLine(index)
    }
    const [targetsView, setTargetsView] = useState(true);
    const [arcsView, setArcsView] = useState(true);
    const [legsView, setLegsView] = useState(true);
    const [tangentsLinesView, setTangentsLinesView] = useState(true);
    const [polygonView, setPolygonView] = useState(true);
    const [entryPointView, setEntryPointView] = useState(true);
    const [exitPointView, setExitPointView] = useState(true);
    const [legsTargetsView, setLegsTargetsView] = useState(true);
    const [amtView, setAmtView] = useState(new Array(amts ? amts.length : 0).fill(false));

    useEffect(() => {
        setAmtView(new Array(amts ? amts.length : 0).fill(false))
    }, [amts.length, amts])

    const setAllAmtView = () => { setAmtView(Array(amtView.length).fill(!isAnyView(amtView))); }

    const isAllView = (view: boolean[]) => {
        return !view.includes(false)
    }

    const isAnyView = (view: boolean[]) => {
        return view.includes(true)
    }

    const deletePoint = (name: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (window.confirm(`are you sure about delete target :${name} ?`)) {
            e.stopPropagation();
            dispatch(dropTarget(name))
        }
    }
    const deleteArc = (arc: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (window.confirm(`are you sure about delete this Arc ?`)) {
            e.stopPropagation();
            dispatch(dropArc(arc))
        }
    }

    const deleteLeg = (leg: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (window.confirm(`are you sure about delete Leg ?`)) {
            e.stopPropagation();
            dispatch(dropLeg(leg))
        }
    }

    const deleteTangentLine = (TangentLine: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (window.confirm(`are you sure about delete TangentLine ?`)) {
            e.stopPropagation();
            dispatch(dropTangentLine(TangentLine))
        }
    }

    let viewArcs
    if (arcs && legs && tangentsLines)
        viewArcs = createArcs(legs, arcs, tangentsLines)

    return (
        <>
            <SideBarLayout>
                {addingMode === AddingModeEnum.INITIAL_STATE && <CreationModeMenu progress={progress} setProgress={setProgress} addingMode={addingMode} setAddingMode={setAddingMode} />}
                {addingMode === AddingModeEnum.ADD_TARGETS && <AddNewTarget setCurrentIndex={setCurrentPoint} index={currentPoint} setAddingMode={setAddingMode} />}
                {addingMode === AddingModeEnum.ADD_POLYGON && <AddPolygon setAddingMode={setAddingMode} />}
                {addingMode === AddingModeEnum.ADD_ENTRY && <AddPath path="entry" setAddingMode={setAddingMode} />}
                {addingMode === AddingModeEnum.ADD_EXIT && <AddPath path="exit" setAddingMode={setAddingMode} />}
                {addingMode === AddingModeEnum.GENERAL && <General setAddingMode={setAddingMode} />}
                {addingMode === AddingModeEnum.ADD_LEG && <AddLeg setCurrentIndex={setCurrentLeg} setAddingMode={setAddingMode} index={currentLeg} />}
                {addingMode === AddingModeEnum.ADD_ARC && <AddArc setCurrentIndex={setCurrentArc} index={currentArc} setAddingMode={setAddingMode} />}
                {addingMode === AddingModeEnum.ADD_TANGENT_LINE && <AddTangentLine setCurrentIndex={setCurrentTangentLine} setAddingMode={setAddingMode} index={currentTangentLine} />}
                {addingMode === AddingModeEnum.ADD_AMT && <AddAmt setAddingMode={setAddingMode} amtView={amtView} setAmtView={setAmtView} />}
                {addingMode === AddingModeEnum.AMT_LIST && <AmtList setAddingMode={setAddingMode} amtView={amtView} setAmtView={setAmtView} mode='req' />}

                {(((Array.isArray(arcs) && arcs.length !== 0) ||
                    (Array.isArray(targets) && targets.length !== 0) ||
                    (Array.isArray(polygonPoints) && polygonPoints.length !== 0) ||
                    (Array.isArray(amts) && amts.length !== 0) ||
                    (exit && typeof exit === 'object' && Object.keys(exit).length !== 0)) ||
                    (entry && typeof entry === 'object' && Object.keys(entry).length !== 0)) &&
                    <Accordion
                        title='View Elements'
                        src={eyeIcon}
                        src2={arrowDown}
                        alt='View Elements'
                        children={
                            <ShowElements
                                legsTargetsView={{ value: legsTargetsView, onChange: () => setLegsTargetsView(legsTargetsView => !legsTargetsView) }}
                                targetsView={{ value: targetsView, onChange: () => setTargetsView(targetsView => !targetsView) }}
                                polygonView={{ value: polygonView, onChange: () => setPolygonView(polygonView => !polygonView) }}
                                entryPointView={{ value: entryPointView, onChange: () => setEntryPointView(entryPointView => !entryPointView) }}
                                exitPointView={{ value: exitPointView, onChange: () => setExitPointView(exitPointView => !exitPointView) }}
                                arcsView={{ value: arcsView, onChange: () => setArcsView(arcsView => !arcsView) }}
                                legsView={{ value: legsView, onChange: () => setLegsView(legsView => !legsView) }}
                                tangentLineView={{ value: tangentsLinesView, onChange: () => setTangentsLinesView(tangentsLinesView => !tangentsLinesView) }}
                                amtsView={{ value: amtView, onChange: setAllAmtView }}
                                legsTargets={legsTargets}
                                targets={targets}
                                polygon={polygonPoints}
                                entry={entry}
                                exit={exit}
                                arcs={arcs}
                                legs={legs}
                                tangentLine={tangentsLines}
                                amts={amts}
                            />
                        }
                    />
                }


                <ReturnHome clearData={true} />
            </SideBarLayout >
            {
                progress !== null &&
                < div style={{ position: "relative", height: "100vh", width: "100%" }}>
                    <Loading />
                </div >
            }

            {polygonView && <DisplayPolygon polygonPoints={polygonPoints} />}
            {targetsView && targets?.map((target, index) => (
                currentPoint !== index && <DisplayPoint type='req' key={`${index}-${target.name}`} target={target} onEdit={editPoint(index)} onDelete={deletePoint(target.name)} />
            ))}
            {arcsView && viewArcs?.map((arc, i) => (
                currentArc !== i && <DisplayArc type='req' arc={arc} key={i} onEdit={editArc(i)} onDelete={deleteArc(arc.centerPoint.Latitude)} />
            ))}
            {legsView && legs?.map((leg, i) => (
                currentLeg !== i && <DisplayLeg type='req' index={i + 1} leg={leg} key={i} onDelete={deleteLeg(i)} onEdit={editLeg(i)} />
            ))}
            {tangentsLinesView && tangentsLines?.map((tangentLine, i) => (
                currentTangentLine !== i && <DisplayTangentLine type='req' index={i + 1} tangentLine={tangentLine} key={i} onDelete={deleteTangentLine(i)} onEdit={editTangentLine(i)} />
            ))}
            {amts?.map((amt, i) => (
                (isAllView(amtView) || amtView[i]) && <DisplayAmt center={amt.center} radius={amt.radius} show={amtView[i]} key={i} />
            ))}
            {entryPointView && entry ? <DisplayPath type="entry" path={entry} /> : <></>}
            {exitPointView && exit ? <DisplayPath type="exit" path={exit} /> : <></>}
        </>
    )
}
