import { createSlice } from "@reduxjs/toolkit";

const switchSlice = createSlice({
    name: "switch",
    initialState: {
        switchHolder: false
    },
    reducers: {
        switchToTrue: (state) => {
            state.switchHolder = true
        },
        switchToFalse: (state) => {
            state.switchHolder = false
        },
        switchToUpSideDown: (state) => {
            state.switchHolder = !state.switchHolder
        }
    }
})

export default switchSlice.reducer;
export const { switchToUpSideDown, switchToTrue, switchToFalse } = switchSlice.actions