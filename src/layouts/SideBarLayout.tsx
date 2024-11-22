import React, { useCallback } from 'react'
import classes from "./layout.module.css"
import L from 'leaflet'

export default function SideBarLayout({ children }: { children: React.ReactNode }) {
    const ref = useCallback((element:HTMLDivElement | null) => {
        if(!element) return;
        L.DomEvent.disableClickPropagation(element);
        L.DomEvent.disableScrollPropagation(element);
    }, [])

    return (
        <div ref={ref} className={classes.sidebarLayout}>
            {children}
        </div>
    )
}
