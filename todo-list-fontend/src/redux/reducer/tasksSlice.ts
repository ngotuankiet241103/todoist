import { createSlice } from "@reduxjs/toolkit";
import { TaskListResponse } from "../../components/task/TaskList"
import { act } from "react-dom/test-utils";


export type TasksSlice = {
    today?: {
        [key: string]: TaskListResponse | []
    }
    project?: {
        [key: string]: TaskListResponse | []
    }
}
// const date = new Date();
// const today : string = formatDate(date);

const initialValue : TasksSlice = {};
const tasksSlice = createSlice(
    {
        name: "tasks",
        initialState: initialValue,
        reducers: {
            setTasks: (state, actions) => {
                
                state = {
                    [actions.payload.key]: {
                        ...actions.payload.data
                    }
                    
                }
                console.log(state);
                
                return state;
            },
            updateTask: (state,actions) => {
                
                const currentData = state[actions.payload.type];
                state = {
                    ...state,
                    [actions.payload.type]: {
                        
                        ...currentData,
                        ...actions.payload.value
                        
                    }
                    
                    
                }
               
                console.log(state);
                
                return state;
            }
            

        }

    }
)
export const {setTasks,updateTask} = tasksSlice.actions;
export default tasksSlice.reducer;

