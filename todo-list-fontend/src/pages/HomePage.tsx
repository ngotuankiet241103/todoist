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

// using some little inline style helpers to make the app look okay

const HomePage = () => {
  const detail = useSelector((state: state) => state.detail);
  const task = useSelector((state: state) => state.task);
  const { isShow: showModal, task: taskDetail } = detail;
  const { isExpand } = useExpandMenu();
  const dispatch = useDispatch();
  console.log(task);
  const date = new Date();
  const today = formatDate(date);
  useEffect(() => {
    const getAllTaskToday = () => {
      dispatch(taskThunk(today));
    };
    getAllTaskToday();
  }, []);
  const onDragStart = (event) => {
    console.log(event);

    // const element = document.querySelector(`#${event.draggableId}`);
    // if (element) {
    //   element.parentElement.classList.add(`border-red-400`);
    //   element.parentElement.classList.add(`bg-gray-400`);
    // }

    /*...*/
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
      //   const index = result.source.index;
      //   const [newItem] = items[key]?.splice([index], 1);
      //   const newArr = [...items[desKey], newItem];
      //   const item = reorder(newArr, newArr.length - 1, result.destination.index);
      //   setItems({
      //     ...items,
      //     [key]: items[key],
      //     [desKey]: item,
      //   });
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
    <div className={` mx-auto py-4 ${isExpand ? "w-full" : "w-[800px]"}`}>
      <h1 className="font-semibold">Today</h1>
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
                {task && <TaskList tasks={task[`${today}`]}></TaskList>}
                {provided.placeholder}
              </div>
            </>
          )}
        </Droppable>
      </DragDropContext>

      {showModal && taskDetail && <DetaiTask task={taskDetail}></DetaiTask>}
    </div>
  );
};

export default HomePage;
