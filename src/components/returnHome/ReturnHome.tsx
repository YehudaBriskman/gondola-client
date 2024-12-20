import classes from './returnHome.module.css'
import { useNavigate } from 'react-router-dom'
import home from '../../assets/icons/iconsSvgHome/home-svgrepo-com.svg'
import SVGComponent from '../SVGComponent'
import { alertPermission } from '../../utils/alerts/alerts'
import { useDispatch } from 'react-redux'
import { clearExitPath } from '../../store/slices/exitPathSlice'
import { clearEntryPath } from '../../store/slices/entryPathSlice'
import { clearArcs } from '../../store/slices/arcSlice'
import { clearLegs } from '../../store/slices/legSlice'
import { clearPolygon } from '../../store/slices/polygonSlice'
import { clearTargets } from '../../store/slices/targetsSlice'
import { clearTangentLines } from '../../store/slices/tangentLineSlice'

type ReturnHomeProps = {
    clearData?: boolean;
}

function ReturnHome({ clearData }: ReturnHomeProps) {

    const navigate = useNavigate()
    const diapatch = useDispatch()

    const deleteAll = async () => {
        const permission = await alertPermission("warning", `are you sure about delete All ?`)
        if (permission) {
            localStorage.clear();
            diapatch(clearArcs())
            diapatch(clearLegs())
            diapatch(clearPolygon())
            diapatch(clearTargets())
            diapatch(clearTangentLines())
            diapatch(clearExitPath())
            diapatch(clearEntryPath())
            navigate("/")
        }
    }

    const returnHome = async () => {
        navigate("/")
    }

    return (
        <div className={`${classes.unitLogoContainer}`} >
            <div data-testid="homeLink" onClick={() => clearData ? deleteAll() : returnHome()}>
                <SVGComponent className={classes.iconHome} src={home} fill="white" />
            </div>
        </div>
    )
}

export default ReturnHome
