import React, { useRef, useState } from 'react';
import classes from './accordion.module.css'

type AccordionProps = {
    src: string
    alt?: string
    src2?: string
    checkBox?: boolean
    view?: boolean[];
    setView?: React.Dispatch<React.SetStateAction<boolean[]>>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Accordion({ title, children, src, alt, src2, checkBox, view, setView }: AccordionProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const childRef = useRef<HTMLUListElement>(null)
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        if (childRef.current === null || wrapperRef.current === null) return;

        const headerHeight = (wrapperRef.current.firstChild as HTMLSpanElement).clientHeight;
        const childHeight = open ? 0 : childRef.current.clientHeight;
        wrapperRef.current.style.setProperty("--padding", `${childHeight ? 1 : 0}`)
        wrapperRef.current.style.setProperty("--height", `${headerHeight + childHeight}px`)
        setOpen(!open)
    }

    const setAllView = () => {
        (setView && view) ? setView(Array(view.length).fill(!isAllView(view))) : console.log();
    }

    const isAllView = (view: boolean[]) => {
        return !view.includes(false)
    }

    return (
        <div ref={wrapperRef} className={classes.accordion}>
            <span className={classes.header} onClick={handleClick}>
                <div className={classes.title}>
                    <img src={src} alt={alt} className={classes.image} />
                    {title}
                </div>
                {src2 && <img src={src2} alt={alt} className={`${classes.image} ${open ? classes.rotated : ''}`} />}
            </span>
            <ul ref={childRef} className={`${classes.children}`}>
                {checkBox && <div className={classes.box}>
                    Show All
                    <input className={classes.checkbox} checked={view ? isAllView(view): false} type="checkbox" onChange={setAllView} />
                </div>}
                {children}
            </ul>
        </div>
    )
}
