import { createSlice } from "@reduxjs/toolkit";
import { SectionItem } from "../../components/form/FormProject";

export type Label = {
    [Property in keyof SectionItem]: SectionItem[Property]
}
export type LabelSlice = Label[] | []
const initialValue : Label[] = []
const labelSlice = createSlice(
    {
        name: "label",
        initialState: initialValue,
        reducers: {
            setLabel: (state, actions) => {
        
                state = [
                    ...actions.payload
                ]
                return state;
            },
            updateLabel: (state,actions) => {
                state =[
                    actions.payload,
                    ...state
                    
                ]
                return state;
            }
           
        }

    }
)
export const {setLabel,updateLabel} = labelSlice.actions;
export default labelSlice.reducer;