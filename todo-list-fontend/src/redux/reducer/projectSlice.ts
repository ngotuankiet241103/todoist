import { createSlice } from "@reduxjs/toolkit";

export type ProjectInfo = {
    id: number,
    name: string,
    code: string,
    task_all?: number
}
export type Project = {
    inbox: ProjectInfo | undefined,
    myProject: ProjectInfo[]
}
const initialValue : Project = {
    inbox: undefined,
    myProject: []
};
const projectSlice = createSlice(
    {
        name: "project",
        initialState: initialValue,
        reducers: {
            setProject: (state, actions) => {
        
                state = {
                    ...state,
                    myProject: actions.payload
                }
                return state;
            },
            setInboxProject: (state,actions) => {
                state = {
                    ...state,
                    inbox: actions.payload
                    
                }
                return state;
            }
        }

    }
)
export const {setProject,setInboxProject} = projectSlice.actions;
export default projectSlice.reducer;