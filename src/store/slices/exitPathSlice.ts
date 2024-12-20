import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getInitialStoreState, LocalStorageKeys } from "../storeUtils";
import { Path, PathSchema } from "../../gondola_types/basicElements";

const exitPathsSlice = createSlice({
    name: "exitPath",
    initialState: {
        pathsHolder: getInitialStoreState(LocalStorageKeys.EXIT_PATH, PathSchema.partial()), // Casting the state
    },
    reducers: {
        setExitPath: (state, action: PayloadAction<{ path: Path }>) => {
            state.pathsHolder = action.payload.path;
        },
        clearExitPath: (state) => {
            state.pathsHolder = {};
        }
    }
});

export default exitPathsSlice.reducer;
export const { setExitPath, clearExitPath } = exitPathsSlice.actions;
