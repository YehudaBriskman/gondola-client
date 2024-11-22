import { configureStore } from "@reduxjs/toolkit";
import polygonSlice from "./slices/polygonSlice";
import targetsSlice from "./slices/targetsSlice"
import requestRouteSlice from "./slices/requestRouteSlice"
import localStorageMiddleware from "./localStorageMiddleware";
import responseSlice from "./slices/responseSlice";
import arcSlice from "./slices/arcSlice";
import switchSlice from "./slices/switchSlice";
import legSlice from "./slices/legSlice";
import amtSlice from "./slices/amtSlice";
import generalSlice from "./slices/generalSlice"
import tangentLineSlice from "./slices/tangentLineSlice";


const store = configureStore({
    reducer: {
        legs:legSlice,
        tangentLines:tangentLineSlice,
        switch: switchSlice,
        arcs:arcSlice,
        polygon: polygonSlice,
        targets: targetsSlice,
        amts: amtSlice,
        requestRoute: requestRouteSlice,
        response: responseSlice,
        general: generalSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = ReturnType<typeof store.dispatch>
export default store;
