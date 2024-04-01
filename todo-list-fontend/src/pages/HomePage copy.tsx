import { formatDate } from "../utils/formatDate";
import { useDispatch, useSelector } from "react-redux";
import { state } from "../redux/store";
import { DragDropContext } from "react-beautiful-dnd";
import { setTasks } from "../redux/reducer/taskSlice";
import { reorder } from "../utils/dragContext";
import DetaiTask from "../components/task/DetaiTask";
import useOpenModal from "../hooks/useOpenModal";
import BaseWeb from "../components/web/BaseWeb";
import useChangeView from "../hooks/useChangeView";
import SubProjectItem from "../components/project/SubProjectItem copy";
import useTasks from "../hooks/useTasks";
import TaskAdd from "../components/task/TaskAdd";
import FormTask from "../components/form/FormTask";

// using some little inline style helpers to make the app look okay
const key = "isToday";
const HomePage = () => {
  const { state } = useChangeView(key);
  const detail = useSelector((state: state) => state.detail);
  const { task, titles } = useTasks("today", state.group, state.filter);
  const { isShow: showModal, task: taskDetail } = detail;
  const dispatch = useDispatch();
  const date = new Date();
  const today = formatDate(date);
  const { isShow, handleToggleModel } = useOpenModal(false);
  const {isShow: openFormTask,handleToggleModel: toggleFormTask} = useOpenModal(false);
  console.log(state);
  const onDragStart = (event) => {
    console.log(event);
  };
  const onDragEnd = (result) => {
    console.log(result);

    // dropped outside the list
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
          task[`${today}`],
          result.source.index,
          result.destination.index
        );
        console.warn(item);
        
        dispatch(setTasks({ key: today, data: item }));
  
        //   setItems({
        //     ...items,
        //     [key]: item,
        //   });
      }
    }
    // const element = document.querySelector(`#${result.draggableId}`);
    // element.classList.remove("border-red-400");
  };
  const handleClick = () => {
    if (isShow) {
      handleToggleModel();
    }
  };
  const Render = () => {
    console.log(task);

    return (
      <>
        {!task && <h1>Loading...</h1>}
        {task &&
          Object.entries(task).map(([key, value], index) => (
            <>
              <div
                className={`${state.isList ? `box-${key}` : "min-w-[260px]"}`}
              >
                <SubProjectItem
                  isList={state.isList}
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
            !state.isList ? "w-full" : "w-[800px]"
          }`}
        >
          <h1 className="font-semibold">Today</h1>

          <DragDropContext
            // isDragging={(event) => console.log(event)}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            <div className={`${state.isList ? "" : "task-list"}`}>
              <Render></Render>
            </div>
          </DragDropContext>

          {showModal && taskDetail && <DetaiTask task={taskDetail}></DetaiTask>}
          {!task
            && (!openFormTask ? <TaskAdd onclick={() => toggleFormTask()}/>
            :
            (
              <div className={state.isList ? 'w-full' : 'w-[280px]'}>
                 <FormTask
                  isList={state.isList}
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
