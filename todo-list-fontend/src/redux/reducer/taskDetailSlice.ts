import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../components/form/FormTask";
import { TaskResponse } from "../../components/task/TaskItem";
export interface TaskDetail {
    isShow: boolean,
    task: TaskResponse | undefined,
    
}
const initialValue : TaskDetail  = {
    isShow: false,
    task: undefined
}
const taskDetailSlice = createSlice(
    {
        name: "task",
        initialState: initialValue,
        reducers: {
            setDetailTask: (state,actions) => {
                state = {
                    isShow: true,
                    task: actions.payload
                }
                return state;
            },
            resetDetailTask: (state) => {
                state = {
                    isShow: false,
                    task: undefined
                }
                return state;
            }

        }


    }
)
export const {setDetailTask,resetDetailTask} = taskDetailSlice.actions;
export default taskDetailSlice.reducer;