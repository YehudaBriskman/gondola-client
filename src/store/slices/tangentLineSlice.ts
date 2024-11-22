import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LocalStorageKeys, getInitialStoreState } from "../storeUtils";
import { TangentLine, TangentLineSchema } from "../../gondola_types/navigationElements";

const tangentLineSlice = createSlice({
    name: "tangentLine",
    initialState: {
        tangentsLineHolder: getInitialStoreState(LocalStorageKeys.TANGENTLINE, TangentLineSchema.array())
    },
    reducers: {
        setTangentLines: (state, action: PayloadAction<TangentLine[]>) => {
            state.tangentsLineHolder = action.payload
        },
        addTangentLine: (state, action: PayloadAction<TangentLine>) => {
            state.tangentsLineHolder.push(action.payload)
        },
        dropTangentLine: (state, action: PayloadAction<number>) => {
            state.tangentsLineHolder.splice(action.payload, 1)
        },
        editTangentLine: (state, action: PayloadAction<{ index: number, tangentLine: TangentLine }>) => {
            state.tangentsLineHolder[action.payload.index] = action.payload.tangentLine
        },
        clearTangentLines: (state) => {
            state.tangentsLineHolder = []
        }
    }
})

export default tangentLineSlice.reducer;
export const { editTangentLine, dropTangentLine, clearTangentLines, addTangentLine, setTangentLines } = tangentLineSlice.actions