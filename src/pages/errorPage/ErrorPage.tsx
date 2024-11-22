import { Link } from "react-router-dom"
import airport from '../../assets/images/airport.png'
import homepageClasses from '../homepage/homepage.module.css'
import classes from './errorPage.module.css'


export default function ErrorPage() {
    return (
        <div className={classes.containerError}>
            <div className={classes.details}>
                <span className={classes.header}>Flight route is incorrect</span>
                <span className={classes.desc}>Return to the airport to continue</span>
                <span className={classes.errorCode}>404</span>
            </div>

            <Link to='/' className={homepageClasses.link}>
                <img className={homepageClasses.iconLink} src={airport} alt="logo"></img>
                <span className={homepageClasses.linkDesc}>Go home</span>
            </Link>
        </div>
    )
}
