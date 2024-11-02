import { createSlice } from "@reduxjs/toolkit";
import { TaskListResponse } from "../../components/task/TaskList"
import { formatDate } from "../../utils/formatDate";

export type TaskSlice = {
    [key: string]: TaskListResponse 
}
const date = new Date();
const today : string = formatDate(date);
const initialValue : TaskSlice = {
    [today] : []
};
const taskSlice = createSlice(
    {
        name: "task",
        initialState: initialValue,
        reducers: {
            setTasks: (state, actions) => {
              
                state[`${actions.payload.key}`] = [
                    
                    ...actions.payload.data
                ]
                return state;
            },
            setTask: (state, actions) => {
                console.log(state);
                if(state[actions.payload.key]){
                    state[actions.payload.key] = [
                        ...state[actions.payload.key],
                        actions.payload.data
                    ]
                }
                else{
                    state[actions.payload.key] = [
                        actions.payload.data
                    ]
                }
                
                console.log(state);
                
                return state;
            },
            updateTask: (state,actions) => {
                state = {
                   ...state,
                    ...actions.payload
                }
                return state;
            }

        }

    }
)
export const {setTasks,setTask,updateTask} = taskSlice.actions;
export default taskSlice.reducer;

