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

// using some little inline style helpers to make the app look okay
const key = "isToday";
const HomePage = () => {
  const detail = useSelector((state: state) => state.detail);
  const task = useSelector((state: state) => state.task);
  const { isShow: showModal, task: taskDetail } = detail;

  const dispatch = useDispatch();
  const date = new Date();
  const today = formatDate(date);
  
  const {state} = useChangeView(key);
  console.log(state);
  
  const isRender = useSelector((state : state) => state.status.isRender)
  useEffect(() => {
    const getAllTaskToday = () => {
      dispatch(taskThunk(today));
    };
    getAllTaskToday();
  }, [isRender]);
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
  
  return (
    <BaseWeb page="today" label={key} >
      <div >
        <div
          className={` mx-auto py-4 h-[100vh] ${
            !state.isList ? "md:w-full" : "md:w-[800px] px-4"
          }`}
        >
          <h1 className="font-semibold">Today</h1>
          <div className={`${state.isList ? '' : 'grid grid-cols-4'}`}>
            <DragDropContext
              // isDragging={(event) => console.log(event)}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            >
              <Droppable droppableId="droppable-1">
                {(provided, snapshot) => (
                  <>
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {task && <TaskList isList={state.isList} tasks={task[`${today}`]}></TaskList>}
                      {provided.placeholder}
                    </div>
                  </>
                )}
              </Droppable>
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
