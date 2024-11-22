import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LocalStorageKeys, getInitialStoreState } from "../storeUtils";
import { Amt, AmtSchema } from "../../gondola_types/navigationElements";




const amtSlice = createSlice({
    name: "amt",
    initialState: {
        amtHolder: getInitialStoreState(LocalStorageKeys.AMTS, AmtSchema.array()),
    },
    reducers: {
        setAmts: (state, action: PayloadAction<Amt[]>) => {
            state.amtHolder = action.payload;
        },
        addAmt: (state, action: PayloadAction<Amt>) => {
            state.amtHolder?.push(action.payload)
        },
    }
})

export default amtSlice.reducer;
export const { addAmt, setAmts } = amtSlice.actions;

