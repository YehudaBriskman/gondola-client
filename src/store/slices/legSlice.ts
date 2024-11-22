import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LocalStorageKeys, getInitialStoreState } from "../storeUtils";
import { Leg, LegSchema } from "../../gondola_types/navigationElements";

const legSlice = createSlice({
    name: "leg",
    initialState: {
        legHolder: getInitialStoreState(LocalStorageKeys.LEGS, LegSchema.array())
    },
    reducers: {
        addLeg: (state, action: PayloadAction<Leg>) => {
            state.legHolder.push(action.payload)
        },
        setLegs: (state, action: PayloadAction<Leg | Leg[]>) => {
            state.legHolder = Array.isArray(action.payload) ? action.payload : [action.payload]
        },
        dropLeg: (state, action: PayloadAction<number>) => {
            state.legHolder.splice(action.payload, 1)
        },
        editLeg: (state, action: PayloadAction<{ index: number, leg: Leg }>) => {
            state.legHolder[action.payload.index] = action.payload.leg
        },
        clearLegs: (state) => {
            state.legHolder = []
        }
    }
})

export default legSlice.reducer;
export const { editLeg, dropLeg, clearLegs, addLeg, setLegs } = legSlice.actions