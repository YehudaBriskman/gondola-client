import classes from "./switch.module.css"

type Props = {
    typeMission: boolean,
    toggleSwitch: () => void,
}
const Switch = ({ toggleSwitch, typeMission }: Props) => {
    return (
        <div className={classes.switchContainer} onClick={toggleSwitch}>
            <div className={`switch ${typeMission ? classes.switchOn : classes.switchOff}`}>
                <div className={classes.switchCircle}></div>
            </div>
        </div>
    )
}
export default Switch
