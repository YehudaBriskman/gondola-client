import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getInitialStoreState, LocalStorageKeys } from "../storeUtils";
import { Field, FieldSchema } from "../../gondola_types/reqResRoutes";



const responseSlice = createSlice({
    name: "response",
    initialState: {
        responseHolder: getInitialStoreState(LocalStorageKeys.RESPONSE, FieldSchema.nullable())
    },

    reducers: {

        setResponse: (state, action: PayloadAction<Field>) => {
            state.responseHolder = action.payload
        },
        clearResponse: (state) => {
            state.responseHolder = null
        }
    }
})

export default responseSlice.reducer;
export const { setResponse, clearResponse } = responseSlice.actions;
