import React from 'react'
import classes from "./button.module.css"


type ButtonProps = { variant?: "standard" | "iconAndText" } & React.ButtonHTMLAttributes<HTMLButtonElement>

function Button({ children, variant , className, ...props }: ButtonProps) {
  const resolvedClassName = [classes.buttonComponent, classes[variant || ''], className].join(" ")
  return (
    <button className={resolvedClassName} {...props} >
      {children}
    </button>
  )
}

export default Button
