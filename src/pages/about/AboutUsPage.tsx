import classes from "./aboutUsPage.module.css"
import logoDept from '../../assets/icons/Logo_Department/department_Logo.svg';
import { Link } from 'react-router-dom';
import Logo from '../../components/logo/Logo';
import icon from "../../assets/images/home/home-icon.svg"


export default function AboutUsPage() {
    return (
        <div className={classes.containerAboutPage}>
            <Logo className={classes.logo} />
            <div>
                <div className={classes.aboutHeader} draggable>
                    Gondola
                </div>
                <div className={classes.aboutUsText}>
                    <span draggable>The system was developed by</span>
                    <span draggable>'AMLAH Development' Department.</span>
                    <span draggable>Purpose of the system is to plan flight routes.</span>
                </div>
            </div>

            <footer className={classes.footer}>
                <div className={classes.developedBy}>
                    <span draggable>Developed by</span>
                    <div>
                        <img className={classes.logoFooter} src={logoDept} alt="logo"></img>
                    </div>
                </div>
                <Link className={classes.goBack} to={"/"} title="home-icon">
                    <img src={icon} alt="go back" />
                </Link>
            </footer>
        </div>
    )
}
