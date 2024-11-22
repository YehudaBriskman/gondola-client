import classes from "./Loading.module.css"
import React from "react"



const Loading: React.FC = () => {
    return (
        <>
            <div className={classes.loadingContainer}>
                <div className={classes.circleContainer}>
                    <div className={classes.circle} />
                    <div className={classes.circle} />
                    <div className={classes.circle} />
                    <div className={classes.circle} />
                    <div className={classes.circle} />
                </div>
            </div>
        </>
    )
}
export default Loading
