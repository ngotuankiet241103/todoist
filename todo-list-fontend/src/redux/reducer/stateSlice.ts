import { createSlice } from "@reduxjs/toolkit";
import storage, { expand_key } from "../../helper/storage";
import { ProjectGroupKey } from "../../hooks/useProjectPage";

export const key = "isRender";
export const isList ="isList";
export const view = "isToday";

export type stateApp = {
    isExpand: boolean
    isRender: boolean,
    [key: string]: {
        isList: boolean
        group: ProjectGroupKey
        filter: Filter
    } | boolean
}
type storageState = {
    [key: string]: boolean
}
export type Filter = {[key in "priorityCode" | "labelCode" ]: string[]}
const initialValue : stateApp= {
    isExpand: storage.get(expand_key),
    isRender: storage.get(key) || false,
    isToday: {
        isList: storage.get<storageState>(view)?.isList || false,
        group: storage.get<{[key:string]: ProjectGroupKey}>(view)?.group || "default",
        filter: storage.get<{[key: string]: Filter}>(view)?.filter || {priorityCode: [""],labelCode:[""]}
    }

    
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