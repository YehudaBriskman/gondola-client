import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getInitialStoreState, LocalStorageKeys } from "../storeUtils";
import { Path, PathSchema } from "../../gondola_types/basicElements";

const entryPathsSlice = createSlice({
    name: "entryPath",
    initialState: {
        pathsHolder: getInitialStoreState(LocalStorageKeys.ENTRY_PATH, PathSchema.partial()), // Casting the state
    },
    reducers: {
        setEntryPath: (state, action: PayloadAction<{ path: Path }>) => {
            state.pathsHolder = action.payload.path;
        },
        clearEntryPath: (state) => {
            state.pathsHolder = {};
        }
    }
});

export default entryPathsSlice.reducer;
export const { setEntryPath, clearEntryPath } = entryPathsSlice.actions;
