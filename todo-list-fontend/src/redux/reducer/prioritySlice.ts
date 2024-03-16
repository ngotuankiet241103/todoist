import { createSlice } from "@reduxjs/toolkit";
import { priority } from "../../components/form/FormPriority";

export type PrioritySlice = priority[]
const initialValue : PrioritySlice  = []
const prioritySlice = createSlice(
    {
        name: "priority",
        initialState: initialValue,
        reducers: {
            setPriority: (state, actions) => {
                console.log(actions);
                
                state = [
                    ...actions.payload
                ]
                return state;
            },
           
        }

    }
)
export const {setPriority} = prioritySlice.actions;
export default prioritySlice.reducer;