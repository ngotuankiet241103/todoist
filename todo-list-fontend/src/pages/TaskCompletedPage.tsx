import  { useEffect, useState } from 'react';
import { TaskResponse } from '../components/task/TaskItem';
import requestApi from '../helper/api';
import { DragDropContext } from 'react-beautiful-dnd';
import SubProjectItem from '../components/project/SubProjectItem copy';

type TaskCompletedPage = {
    data: TaskResponse[],
    pagination: {
        page: number
    }
} 
const TaskCompletedPage = () => {
    const [tasks,setTasks] = useState<TaskCompletedPage | null>(null);
    useEffect(() => {
      async function getTaskCompleted() {
        try {
            const response = await requestApi("/tasks/completed","GET");
            if(response.status === 200){
                setTasks(response.data);
                console.log(response.data);
                
            }
        } catch (error) {
            console.log(error);
            
        }
      }
      getTaskCompleted();

    },[])
    const onDragStart = () => {}
    const onDragEnd = () => {}
    return (
        <div className='w-[800px] mx-auto py-4'>
             <DragDropContext
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            >
             {tasks && tasks.data.length && <SubProjectItem code='task-completed' title='Task-completed' isList isSection={false} tasks={tasks.data}></SubProjectItem>}
            </DragDropContext>
            
        </div>
    );
};

export default TaskCompletedPage;