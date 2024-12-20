import { Dispatch, Middleware, MiddlewareAPI } from "@reduxjs/toolkit"
import { RootDispatch, RootState } from "./store"
import { LocalStorageKeys } from "./storeUtils";

/**
 * Middleware that writs all store data to local storage on change. 
 * function is being executed after each reducer action.
 */
const localStorageMiddleware: Middleware = (store: MiddlewareAPI<Dispatch<RootDispatch>, RootState>) => (next) => (action) => {
    const result = next(action)

    const storeData = store.getState();
    localStorage.setItem(LocalStorageKeys.POLYGON, JSON.stringify(storeData.polygon.polygonHolder));
    localStorage.setItem(LocalStorageKeys.ARCS, JSON.stringify(storeData.arcs.arcHolder));
    localStorage.setItem(LocalStorageKeys.LEGS, JSON.stringify(storeData.legs.legHolder));
    localStorage.setItem(LocalStorageKeys.TANGENT_LINE, JSON.stringify(storeData.tangentLines.tangentsLineHolder));
    localStorage.setItem(LocalStorageKeys.AMTS, JSON.stringify(storeData.amts.amtHolder));
    localStorage.setItem(LocalStorageKeys.ENTRY_PATH, JSON.stringify(storeData.entryPath.pathsHolder));
    localStorage.setItem(LocalStorageKeys.EXIT_PATH, JSON.stringify(storeData.exitPath.pathsHolder));
    localStorage.setItem(LocalStorageKeys.TARGETS, JSON.stringify(storeData.targets.targetsHolder));
    localStorage.setItem(LocalStorageKeys.GENERAL, JSON.stringify(storeData.general.generalHolder));
    if (storeData.response.responseHolder !== null) {
        localStorage.setItem(LocalStorageKeys.RESPONSE, JSON.stringify(storeData.response.responseHolder));
    } else {
        localStorage.removeItem(LocalStorageKeys.RESPONSE)
    }

    return result
}

export default localStorageMiddleware
