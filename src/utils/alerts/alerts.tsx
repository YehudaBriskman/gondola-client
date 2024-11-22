import Swal, { SweetAlertOptions } from "sweetalert2"
import classes from "./alerts.module.css"
import { renderToString } from "react-dom/server"
import { ZodIssue } from "zod"

/**
 * 
 * @param alertBody react body as <div/> | <span/> | <p/> to show as errors - message
 * @param title title for alert, default as "Invalid Data"
 * @returns custom alert
 */

export function alertInvalidData(alertBody: React.ReactNode, title?: string) {
    return Swal.fire({
        title: title ? title : "Invalid Data",
        customClass: classes.alert,
        html: renderToString(alertBody),
        buttonsStyling: true,
        icon: "error",
    })
}

export async function undoAlert() {
    const result = await Swal.fire({
        title: "Are you sure?",
        customClass: classes.alert,
        text: "All your changes will not be saved! ",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        icon: "warning"
    })
    if (result.isConfirmed) {
        Swal.fire({
            customClass: classes.alert,
            title: "Saved!",
            text: '',
            icon: 'success',
        })
    } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info")
    }
}

/**
 * 
 * @param title title for alert
 * @param alertBody  react body as <div/> | <span/> | <p/> to show as errors - message
 * @param options another options for swal-alerts
 * @param timer number for delay, read as ms
 * @returns custom alert
 */

export function alertFailedRequest(title: string, alertBody?: React.ReactNode, options?: SweetAlertOptions, timer?: number) {
    return Swal.fire({
        title: title,
        customClass: classes.alert,
        html: renderToString(alertBody),
        showConfirmButton: false,
        timer: timer ? timer : 60000,
        icon: "error",
        ...options
    })
}

/**
 * 
 * @param title title for alert
 * @param alertBody  react body as <div/> | <span/> | <p/> to show as errors - message
 * @param options another options for swal-alerts
 * @param timer number for delay, read as ms
 * @returns custom alert
 */

export function alertInfo(title: string, alertBody?: React.ReactNode, options?: SweetAlertOptions, timer?: number) {
    return Swal.fire({
        title: title,
        customClass: classes.alert,
        html: renderToString(alertBody),
        showConfirmButton: false,
        timer: timer ? timer : 3000,
        icon: "info",
        ...options
    })
}

/**
 * 
 * @param title title for alert
 * @param alertBody  react body as <div/> | <span/> | <p/> to show as errors - message
 * @param timer number for delay, read as ms
 * @param options another options for swal-alerts
 * @returns custom alert
 */

export function alertSuccess(title: string, alertBody?: React.ReactNode, timer?: number, options?: SweetAlertOptions) {
    return Swal.fire({
        title: title,
        customClass: classes.alert,
        html: renderToString(alertBody),
        showConfirmButton: false,
        timer: timer = 1500,
        icon: "success",
        ...options
    })
}

export function ZodAlertList({ errorList }: { errorList: ZodIssue[] }) {
    return (
        <ul className={classes.alertComponent}>
            {errorList.map((err, i) => (
                <li className={classes.error} key={i}>
                    <span className={classes.errorPath}>{err.path ? err.path.join(".") : "Unkown"}:</span>
                    <span className={classes.errorMessage}>{err.message}</span>
                </li>
            ))}
        </ul>
    )
}

type ToastAlertLoc = "top" | "top-end" | "top-start" | "center" | "center-end" | "center-start" | "bottom" | "bottom-end" | "bottom-start"

/**
 * 
 * @param title title for alert
 * @param location choose location on the screen between "top" | "top-end" | "top-start" | "center" | "center-end" | "center-start" | "bottom" | "bottom-end" | "bottom-start"
 * @param timer number for delay, read as ms
 * @param icon choose icon between "info" | "success" | "error" | "warning"
 * @returns custom alert
 */

export function toastAlert(title: string, location: ToastAlertLoc, timer?: number, icon?: "info" | "success" | "error" | "warning") {
    return Swal.fire({
        toast: true,
        title: title,
        customClass: {
            popup: classes.toast
        },
        position: location,
        timer: timer ? timer : 3000,
        showConfirmButton: false,
        icon: icon ? icon : "info",
        didOpen: () => Swal.showLoading()
    })
}

/**
 * 
 * @param item name of parameter to edit
 * @param type type of parameter, choose between "text" | "checkbox" | "email" | "number" | "date" | "password" | "tel"
 * @returns value for parameter: value | undefined
 */

export async function alertInput(itemName: string, type: "text" | "checkbox" | "email" | "number" | "date" | "password" | "tel", miniTitle?: string) {
    const result = await Swal.fire({
        title: `Enter ${itemName}`,
        text: miniTitle,
        input: type,
        customClass: classes.alert,
        showCancelButton: true,
        confirmButtonText: "Done",
        cancelButtonText: "Cancel",
        icon: "info",
    })
    return result.isConfirmed ? result.value : null
}

/**
 * 
 * @param title title for alert
 * @param message message for alert
 * @param permissionText confirm button text, default as "Continue"
 * @param cancelText cancel button text, default as "Cancel"
 * @returns boolean value
 */

export async function alertPermission(title: string, message: string, permissionText?: string, cancelText?: string) {
    const result = await Swal.fire({
        title: title,
        text: message,
        icon: "warning",
        customClass: classes.alert,
        showCancelButton: true,
        confirmButtonText: permissionText ? permissionText : "Continue",
        cancelButtonText: cancelText ? cancelText : "Cancel",
    })
    return result.isConfirmed
}

/**
 * 
 * @param alert other alert function
 * @param func function to execute when alert is done
 */

export async function alertAndExecute(alert: Function, func: Function) {
    await alert().then(() => func())
}
