import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getInitialStoreState, LocalStorageKeys } from "../storeUtils";
import { ConvertPoint } from "../../utils/general";
import { Point } from "../../gondola_types/basicElements";
import { FlyZone, FlyZoneSchema, LeafletPoint } from "../../gondola_types/navigationElements";


const polygonSlice = createSlice({
    name: "polygon",
    initialState: {
        polygonHolder: getInitialStoreState(LocalStorageKeys.POLYGON, FlyZoneSchema)
    },
    reducers: {
        addPoint: (state, action: PayloadAction<LeafletPoint | Point>) => {
            const p = ("lng" in action.payload) ? ConvertPoint.fromLeafletPoint(action.payload) : action.payload
            state.polygonHolder.push(p)
        },
        editPoint: (state, { payload: { index, point } }: PayloadAction<{ index: number; point: LeafletPoint | Point }>) => {
            const p = ("lng" in point) ? ConvertPoint.fromLeafletPoint(point) : point
            state.polygonHolder[index] = p;
        },
        removePoint: (state, action: PayloadAction<number>) => {
            state.polygonHolder.splice(action.payload, 1)
        },
        clearPolygon: (state) => {
            state.polygonHolder = [];
        },
        setPolygon: (state, action: PayloadAction<FlyZone>) => {
            state.polygonHolder = action.payload.map(p => ({ ...p, Longitude: p.Longitude }))
        }
    }
})

export default polygonSlice.reducer;
export const { addPoint, editPoint, clearPolygon, removePoint, setPolygon } = polygonSlice.actions;
