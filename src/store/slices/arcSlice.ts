import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LocalStorageKeys, getInitialStoreState } from "../storeUtils";
import { Arc, ArcSchema } from "../../gondola_types/navigationElements";




const arcSlice = createSlice({
    name: "arc",
    initialState: {
        arcHolder: getInitialStoreState(LocalStorageKeys.ARCS, ArcSchema.array()),
    },
    reducers: {
        setArcs: (state, action: PayloadAction<Arc[]>) => {
            state.arcHolder = action.payload
        },
        addArc: (state, action: PayloadAction<Arc>) => {
            state.arcHolder?.push(action.payload)
        },
        editArc: (state, action: PayloadAction<{ index: number; arc: Arc }>) => {
            state.arcHolder[action.payload.index] = action.payload.arc
        },
        clearArcs: (state) => {
            state.arcHolder = []
        },
        popArc: (state, action: PayloadAction<number>) => {
            state.arcHolder.splice(action.payload, 1);
        },
        dropArc: (state, action: PayloadAction<number>) => {
            state.arcHolder = state.arcHolder.filter((_) => action.payload !== _.centerPoint.Latitude)
        },
    }
})

export default arcSlice.reducer;
export const { editArc, clearArcs, popArc, addArc, dropArc, setArcs } = arcSlice.actions;
