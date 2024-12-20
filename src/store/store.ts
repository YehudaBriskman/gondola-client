import { configureStore } from "@reduxjs/toolkit";
import polygonSlice from "./slices/polygonSlice";
import targetsSlice from "./slices/targetsSlice"
import entryPathSlice from "./slices/entryPathSlice"
import exitPathSlice from "./slices/exitPathSlice"
import localStorageMiddleware from "./localStorageMiddleware";
import responseSlice from "./slices/responseSlice";
import arcSlice from "./slices/arcSlice";
import legSlice from "./slices/legSlice";
import amtSlice from "./slices/amtSlice";
import generalSlice from "./slices/generalSlice"
import tangentLineSlice from "./slices/tangentLineSlice";


const store = configureStore({
    reducer: {
        legs:legSlice,
        tangentLines:tangentLineSlice,
        arcs:arcSlice,
        polygon: polygonSlice,
        targets: targetsSlice,
        amts: amtSlice,
        exitPath: exitPathSlice,
        entryPath: entryPathSlice,
        response: responseSlice,
        general: generalSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = ReturnType<typeof store.dispatch>
export default store;
