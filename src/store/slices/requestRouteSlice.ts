import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getInitialStoreState, LocalStorageKeys } from "../storeUtils";
import { FlightSettings, SaveQueryInputSchema } from "../../gondola_types/reqResRoutes";
import { Path } from "../../gondola_types/basicElements";



const requestRouteSlice = createSlice({
    name: "requestRoute",
    initialState: {
        routeHolder: getInitialStoreState(LocalStorageKeys.REQUEST_ROUTE, SaveQueryInputSchema.partial())
    },
    reducers: {
        setPath: (state, action: PayloadAction<{ type: "entry" | "exit", path: Path }>) => {
            const selected = `${action.payload.type}Path` as const;
            state.routeHolder[selected] = action.payload.path;
        },
        clearPath: (state, action: PayloadAction<{ type: "entry" | "exit" }>) => {
            const selected = `${action.payload.type}Path` as const;
            state.routeHolder[selected] = undefined;
        },
        clearAll: (state) => {
            state.routeHolder = {};
        },
        setGeneralData: (state, action: PayloadAction<FlightSettings>) => {
            state.routeHolder = { ...state.routeHolder, ...action.payload }
        },

    }
})

export default requestRouteSlice.reducer;
export const { setPath, clearPath, clearAll, setGeneralData } = requestRouteSlice.actions;
