import SideBarLayout from '../../layouts/SideBarLayout'
import SidebarHeader from '../../components/sidebarHeader/SidebarHeader'
import ReturnHome from '../../components/returnHome/ReturnHome'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import DisplayArc from '../../components/map/DisplayArc'
import DisplayLeg from '../../components/map/DisplayLeg'
import DisplayTangentLine from '../../components/map/DisplayTangentLine'
import Accordion from '../../components/accordion/Accordion'
import targetsIcon from "../../assets/icons/target-2-svgrepo-com (1).svg"
import generalIcone from '../../assets/icons/creationModeIcons/general.svg'
import LegList from '../../components/response/legList/LegList'
import arrowDown from "../../assets/icons/eye&arrow/arrow-down-svgrepo-com.svg"
import GeneralList from '../../components/response/general/generalList'
import DisplayPolygon from '../../components/map/DisplayPolygon'
import DisplayPath from '../../components/map/DisplayPath'
import arcIcon from '../../assets/icons/curved-arrow-svgrepo-com.svg'
import tangentLineIcon from '../../assets/icons/next-svgrepo-com.svg'
import iconAddTarget from '../../assets/icons/target-2-svgrepo-com.svg'
import polygonIcone from '../../assets/icons/creationModeIcons/polygon-bold-svgrepo-com.svg'
import DisplayPoint from '../../components/map/DisplayPoint'
import { TargetsList } from '../../components/response/targetsList/TargetsList'
import { PolygonList } from '../../components/response/polygon/poligoneList'
import { ArcsList } from '../../components/response/arcList/ArcsList'
import { TangentLines } from '../../components/response/tangentLinesList/TangentLinesList'
import { createArcs } from '../../utils/calcArc'
import { OtherOptions } from '../../components/response/otherOptions/OtherOptions'
import { Path } from '../../gondola_types/basicElements'

export default function Response() {


    const route = useSelector((state: RootState) => state.response.responseHolder)
    const flyZone = useSelector((state: RootState) => state.polygon.polygonHolder)
    const targets = useSelector((state: RootState) => state.targets.targetsHolder)
    const entry = useSelector((state: RootState) => state.response.responseHolder?.entryPath)
    const exit = useSelector((state: RootState) => state.response.responseHolder?.exitPath)
    let arcs
    if (route?.legs && route?.arcs && route?.tangentLines)
        arcs = createArcs(route?.legs, route?.arcs, route?.tangentLines)


    const isSamePathes = (path1: Path, path2: Path) => {
        console.log(JSON.stringify(path1) === JSON.stringify(path2));
        return JSON.stringify(path1) === JSON.stringify(path2)
    }

    // const amts = useSelector((state: RootState) => state.amts.amtHolder);
    // const [amtView, setAmtView] = useState(new Array(amts.length).fill(false));

    return (
        <>

            {route?.targets && route.targets.map((target, i) => <DisplayPoint key={i} type='res' target={target} />)}
            {route?.flyZone ? <DisplayPolygon polygonPoints={route.flyZone} /> : <DisplayPolygon polygonPoints={flyZone} />}
            {route?.entryPath && <DisplayPath type="entry" path={route.entryPath} />}
            {route?.exitPath && <DisplayPath type="exit" path={route.exitPath} />}
            {route?.source === "MANUAL" && targets?.map((target, index) => (<DisplayPoint type='res' key={`${index}-${target.name}`} target={target} />))}

            {/* {amts?.map((amt, i) => (((amtView) || amtView[i]) && <DisplayAmt center={amt.center} radius={amt.radius} show={amtView[i]} key={i} />))} */}
            {arcs?.map((arc, i) => <DisplayArc type='res' arc={arc} key={i} />)}
            {route?.arcs && route.arcs.map((arc, i) => <DisplayArc type='res' arc={arc} key={i} />)}
            {(route?.legs && route?.legs.length > 0 && route?.exitPath && route?.entryPath) ?
                (isSamePathes(route.legs[0].path, route.entryPath) || (entry && exit && isSamePathes(route.legs[0].path, entry))) ?
                    route.legs.map((leg, i) => <DisplayLeg index={i + 1} type="res" leg={leg} key={i} />)
                    :
                    route.legs.map((leg, i) => <DisplayLeg index={i + 1} type="res" leg={leg} key={i} />)
                :
                route?.legs && route.legs.map((leg, i) => <DisplayLeg index={i + 1} type="res" leg={leg} key={i} />)
            }
            {route?.tangentLines && route.tangentLines.map((tan, i) => <DisplayTangentLine type='res' tangentLine={tan} key={i} index={i} />)}

            <SideBarLayout>
                <SidebarHeader name='Gondola' id={route?.name ?? ""} />

                <Accordion title='Fly zone' src={polygonIcone} src2={arrowDown} alt='Fly zone' children={<PolygonList />} />
                <Accordion title='Legs Targets' src={targetsIcon} src2={arrowDown} alt='targets list' children={<TargetsList mode={'res'} />} />
                <Accordion title='Targets' src={targetsIcon} src2={arrowDown} alt='targets list' children={<TargetsList mode={'req'} />} />
                <Accordion title='Legs' src={targetsIcon} src2={arrowDown} alt='legs list' children={<LegList />} />
                {/* <Accordion title='Amts' src={amtIcon} src2={arrowDown} alt='amts list' checkBox={true} view={amtView} setView={setAmtView} children={<AmtList amtView={amtView} setAmtView={setAmtView} mode='res' />} /> */}
                <Accordion title='Arcs' src={arcIcon} src2={arrowDown} alt='arcs' children={<ArcsList mode={'res'} />} />
                <Accordion title='Tangent Lines' src={tangentLineIcon} src2={arrowDown} alt='tangent lines' children={<TangentLines mode={'res'} />} />
                <Accordion title='General' src={generalIcone} src2={arrowDown} alt='general' children={<GeneralList mode={'res'} />} />
                <Accordion title='Other options' src={iconAddTarget} src2={arrowDown} alt='other options' children={<OtherOptions />} />
                <ReturnHome />
            </SideBarLayout>
        </>
    )
}

