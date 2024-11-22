import React from 'react'
import Button from '../button/Button';
import classes from "./saveAndCancel.module.css"

type SaveAndCancelProps = {
    saveText?: string;
    cancelText?: string;
    onSave?: React.MouseEventHandler<HTMLButtonElement>;
    onCancel?: () => void;
    cancelType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
    saveType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
    form?: React.ButtonHTMLAttributes<HTMLButtonElement>["form"];
}
function SaveAndCancel({ cancelText = 'Cancel', onSave, saveText = 'Save', onCancel, cancelType, saveType, form }: SaveAndCancelProps) {
    return (
        <div className={classes.wrapper}>
            <Button data-testid="submit" variant='standard' form={form} type={saveType} onClick={onSave}>{saveText}</Button>
            <Button data-testid="reset" variant='standard' form={form} type={cancelType} onClick={onCancel}>{cancelText}</Button>
        </div>
    )
}


export default SaveAndCancel