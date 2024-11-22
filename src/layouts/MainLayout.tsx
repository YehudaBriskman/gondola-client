import classes from "./layout.module.css"
import Map from '../components/map/Map'

type MainLayoutProps = {
    showMap?: boolean
    children?: React.ReactNode;
}

export default function MainLayout({ children, showMap }: MainLayoutProps) {
    return (
        <>
            {showMap && <Map />}
            <div className={classes.mainLayoutOuter} >
                <div className={classes.mainLayout}>
                    {children}
                </div>
            </div>
        </>
    )
}
