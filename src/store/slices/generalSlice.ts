import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LocalStorageKeys, getInitialStoreState } from "../storeUtils";
import { General, GeneralSchema } from "../../gondola_types/navigationElements";

const generalSlice = createSlice({
    name: "general",
    initialState: {
        generalHolder: getInitialStoreState(LocalStorageKeys.GENERAL, GeneralSchema || []),
    },
    reducers: {
        setGeneral: (state, action: PayloadAction<General>) => {
            state.generalHolder = action.payload;
        },
        // clearGeneral: (state) => {
        //     state.generalHolder = []
        // }
    }
})

export default generalSlice.reducer;
export const { setGeneral } = generalSlice.actions;

