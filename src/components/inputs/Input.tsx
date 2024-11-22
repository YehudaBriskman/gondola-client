import React, { ForwardedRef, useState } from 'react'
import classes from "./input.module.css"
import { COORDINATE_PRECISION } from '../../constants';


type InputProps = {
  type: "text" | "number" | "checkbox"
  variant?: "noPadding";
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ variant, label, className, name, placeholder, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const [resolvedClassNames, setResolvedClassNames] = useState(() => (
    [classes.input, className].join(" "))
  );
  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = props.type === "number" ? {
    step: 1 / 10 ** COORDINATE_PRECISION,
    onFocus: e => e.target.select()
  } : {};
  const handleBlur = () => {
    setResolvedClassNames(p => !p.includes(classes.blurred) ? p + ` ${classes.blurred}` : p)
  }

  return (
    <div className={`${classes.inputContainer} ${variant === "noPadding" ? classes.noPadding : ''}`}>
      {name && <label htmlFor={name}>{label ?? name}</label>}
      <input
        className={resolvedClassNames}
        ref={ref}
        id={name}
        name={name}
        placeholder={placeholder || label || name}
        onBlurCapture={handleBlur}
        {...inputProps}
        {...props}
      />
    </div>
  )
}

export default React.forwardRef(Input);
