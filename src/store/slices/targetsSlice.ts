import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getInitialStoreState, LocalStorageKeys } from "../storeUtils";
import { Target, TargetSchema } from "../../gondola_types/navigationElements";


const targetSlice = createSlice({
    name: "target",
    initialState: {
        targetsHolder: getInitialStoreState(LocalStorageKeys.TARGETS, TargetSchema.array())
    },

    reducers: {
        addTarget: (state, action: PayloadAction<Target>) => {
            state.targetsHolder.push(action.payload)
        },
        editTarget: (state, action: PayloadAction<{ index: number; point: Target }>) => {
            state.targetsHolder[action.payload.index] = action.payload.point;
        },
        clearTargets: (state) => {
            state.targetsHolder = [];
        },
        setTargets: (state, action: PayloadAction<Target[]>) => {
            state.targetsHolder = action.payload
        },
        popTarget: (state, action: PayloadAction<number>) => {
            state.targetsHolder.splice(action.payload, 1);
        },
        dropTarget: (state, action: PayloadAction<string>) => {
            state.targetsHolder = state.targetsHolder.filter((_) => action.payload !== _.name)
        }
    }
})

export default targetSlice.reducer;
export const { addTarget, editTarget, clearTargets, setTargets, popTarget, dropTarget } = targetSlice.actions;
