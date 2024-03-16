import { useEffect } from "react";
import TaskList from "../components/task/TaskList";
import { formatDate } from "../utils/formatDate";
import { useDispatch, useSelector } from "react-redux";
import { state } from "../redux/store";
import taskThunk from "../redux/thunk/taskThunk";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { setTasks } from "../redux/reducer/taskSlice";
import { getListStyle, reorder } from "../utils/dragContext";
import DetaiTask from "../components/task/DetaiTask";
import useExpandMenu from "../hooks/useExpandMenu";
import useOpenModal from "../hooks/useOpenModal";
import BaseWeb from "../components/web/BaseWeb";
import useChangeView from "../hooks/useChangeView";
import SubProjectItem from "../components/project/SubProjectItem copy";
import useProjectPage from "../hooks/useProjectPage";

// using some little inline style helpers to make the app look okay
const key = "isToday";
const HomePage = () => {
  const {state} = useChangeView(key);
  const detail = useSelector((state: state) => state.detail);
  const {task,titles} = useProjectPage("today",state.group,state.filter);
  const { isShow: showModal, task: taskDetail } = detail;
  const dispatch = useDispatch();
  const date = new Date();
  const today = formatDate(date);
  const { isShow, handleToggleModel } = useOpenModal(false);
  console.log(state);
  const onDragStart = (event) => {
    console.log(event);
  };
  const onDragEnd = (result) => {
    console.log(result);

    // dropped outside the list
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
      dispatch(setTasks({ key: today, data: item }));

      //   setItems({
      //     ...items,
      //     [key]: item,
      //   });
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
              <SubProjectItem
                isList={state.isList}
                code={key}
                key={index}
                title={titles && titles[index]}
                tasks={value}
              ></SubProjectItem>
              
            </>
          ))}
      </>
    );
  };
  return (
    <BaseWeb page="today"  label={key} isShow={isShow} onClick={handleToggleModel}>
      <div onClick={handleClick}>
        <div
          className={` mx-auto py-4 h-[100vh] ${
            !state.isList ? "w-full" : "w-[800px]"
          }`}
        >
          <h1 className="font-semibold">Today</h1>
          <div className={`${state.isList ? '' : 'grid grid-cols-4'}`}>
            <DragDropContext
              // isDragging={(event) => console.log(event)}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            >
               <div className={`${state.isList ? "" : "task-list"}`}>
                  <Render></Render>
               </div>
            </DragDropContext>

            {showModal && taskDetail && (
              <DetaiTask task={taskDetail}></DetaiTask>
            )}
          </div>
        </div>
      </div>
    </BaseWeb>
  );
};

export default HomePage;
