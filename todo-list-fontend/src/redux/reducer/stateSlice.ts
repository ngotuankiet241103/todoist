import { createSlice } from "@reduxjs/toolkit";
import storage, { expand_key } from "../../helper/storage";

export const key = "isRender";
export type stateApp = {
    isExpand: boolean
    isRender: boolean,
}
const initialValue : stateApp= {
    isExpand: storage.get(expand_key),
    isRender: storage.get(key) || false
}
const statelSlice = createSlice(
    {
        name: "status",
        initialState: initialValue,
        reducers: {
           updateState: (state,actions) => {
            state = {
                ...state,
                [actions.payload.key] : actions.payload.value
                
            }
            return state;
           }

        }


    }
)
export const {updateState} = statelSlice.actions;
export default statelSlice.reducer;