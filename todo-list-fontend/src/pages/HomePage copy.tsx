import { useDispatch, useSelector } from "react-redux";
import { state } from "../redux/store";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { reorder } from "../utils/dragContext";
import DetaiTask from "../components/task/DetaiTask";
import useOpenModal from "../hooks/useOpenModal";
import BaseWeb from "../components/web/BaseWeb";
import useChangeView from "../hooks/useChangeView";
import SubProjectItem from "../components/project/SubProjectItem copy";
import useTasks from "../hooks/useTasks";
import TaskAdd from "../components/task/TaskAdd";
import FormTask from "../components/form/FormTask";
import { updateTask } from "../redux/reducer/tasksSlice";

// using some little inline style helpers to make the app look okay
const key = "isToday";
const HomePage = () => {
  const { getState,getGroup,getFilter } = useChangeView(key);
  const detail = useSelector((state: state) => state.detail);
  const { task, titles } = useTasks("today", getGroup(), getFilter());
  const { isShow: showModal, task: taskDetail } = detail;
  const dispatch = useDispatch();
  const { isShow, handleToggleModel } = useOpenModal(false);
  const {isShow: openFormTask,handleToggleModel: toggleFormTask} = useOpenModal(false);
  const onDragStart = () => {
    
  };
  const onDragEnd = (result : DropResult) => {
    
    if(task){
      if (!result.destination) {
        return;
      }
      const key = result.source.droppableId;
      const desKey = result.destination.droppableId;
      
      if (key !== desKey) {
        return;
      } else {
        
        const item = reorder(
          task[key],
          result.source.index,
          result.destination.index
        );
        console.warn(item);
        
        dispatch(
          updateTask({
            type: "today",
            value: { [key]: item },
          })
        );
      }
    }
   
  };
  const handleClick = () => {
    if (isShow) {
      handleToggleModel();
    }
  };
  const Render = () => {
   
    return (
      <>
        {!task && <h1>Loading...</h1>}
        {task &&
          Object.entries(task).map(([key, value], index) => (
            <>
              <div
                className={`${getState() ? `box-${key}` : `min-w-[260px] max-w-[260px]`}`}
              >
                <SubProjectItem
                  isSection={false}
                  isList={getState()}
                  code={key}
                  key={index}
                  title={titles && titles[index]}
                  tasks={value}
                ></SubProjectItem>
              </div>
            </>
          ))}
      </>
    );
  };
  return (
    <BaseWeb page="today" label={key}>
      <div onClick={handleClick}>
        <div
          className={` mx-auto py-4 h-[100vh] ${
            !getState() ? "w-full" : "md:w-[800px]"
          }`}
        >
          <h1 className="font-semibold">Today</h1>

          <DragDropContext
            // isDragging={(event) => console.log(event)}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            <div className={`${getState() ? "" : "task-list"}`}>
              <Render></Render>
            </div>
          </DragDropContext>

          {showModal && taskDetail && <DetaiTask task={taskDetail}></DetaiTask>}
          {task && Object.keys(task).length < 1 
            && (!openFormTask ? <TaskAdd onclick={() => toggleFormTask()}/>
            :
            (
              <div className={getState() ? 'w-full' : 'w-[280px]'}>
                 <FormTask
                  isList={getState()}
                  isFixed={false}
                  visibile={true}
                  onclick={toggleFormTask}
                ></FormTask>
              </div>
            ))
          }
        </div>
        
      </div>
    </BaseWeb>
  );
};

export default HomePage;
