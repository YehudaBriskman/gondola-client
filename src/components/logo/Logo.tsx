import GondolaLogo from "../../assets/images/logo.jpeg"
import classes from "./logo.module.css"

export default function Logo({ className, ...props }: React.HTMLAttributes<HTMLImageElement>) {
    return <img className={`${classes.logo} ${className}`} src={GondolaLogo} alt="Gondola" {...props} />
}
