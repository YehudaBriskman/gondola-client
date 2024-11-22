import classes from './homepage.module.css'
import Logo from '../../components/logo/Logo';
import aboutIcon from '../../assets/images/icons8-info-48.png';
import { Link } from 'react-router-dom';


function Homepage() {
    return (
        <div className={classes.containerHomePage}>
            <div className={classes.aboutIcon}>
                <Link to='/about' className={classes.link}>
                    <img className={classes.iconLink} src={aboutIcon} alt="logo" />
                </Link>
            </div>
            <div className={classes.containerHomePageInner}>
                <Logo className={classes.logoDept} />
                <Link to='/create-mode' className={classes.link}>
                    <span className={classes.header}>Gondola</span>
                </Link>
            </div>
        </div>
    )
}

export default Homepage;
