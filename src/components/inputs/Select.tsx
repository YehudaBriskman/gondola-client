import React, { ForwardedRef } from 'react'
import classes from "./input.module.css"

type SelectProps = {
  children?: React.ReactNode;
  label?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>

function Select({ children, label, name, ...props }: SelectProps, ref: ForwardedRef<HTMLSelectElement>) {
  return (
    <div className={classes.selectContainer}>
      {name && <label htmlFor={name}>{label ?? name}</label>}
      <div>
        <select name={name} ref={ref} className={classes.select} {...props}>
          {children}
        </select>
      </div>
    </div>
  )
}
export default React.forwardRef(Select);
