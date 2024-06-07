import { useEffect, useRef, useState } from "react";
import useChangeView from "../hooks/useChangeView";
import { state } from "../redux/store";
import useTasks from "../hooks/useTasks";
import SubProjectItem from "../components/project/SubProjectItem copy";
import { useSelector } from "react-redux";
import BaseWeb from "../components/web/BaseWeb";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DetaiTask from "../components/task/DetaiTask";
import {
  formatDate,
  formatDayComing,
  formatMonthComing,
} from "../utils/formatDate";
import { reorder } from "../utils/dragContext";
import { handleUpdateTask } from "./ProjectPage copy";
import useTheme from "../hooks/useTheme";
import { textColor } from "../utils/theme";
import { ToastContainer } from "react-toastify";
import { TaskResponse } from "../components/task/TaskItem";

const UpcomingTaskPage = () => {
  const key = "upcoming";
  const { state,getGroup,getFilter,getState } = useChangeView(key);
  const detail = useSelector((state: state) => state.detail);
  const { task, titles, upcoming, setUpcoming } = useTasks(
    key,
    getGroup(),
    getFilter()
  );
  const box = useRef<HTMLDivElement>(null);
  const { isShow: showModal, task: taskDetail } = detail;
  const [page, setNextPage] = useState(0);
  const [newTitles, setNewTitles] = useState(Array.from(new Set(titles)) || []);
  const [newTask, setNewTask] = useState(task);
  const [index, setIndex] = useState(0);
  const { theme } = useTheme();
  useEffect(() => {
   
    if (box.current) {
      const element = box.current;
      if (!getState()) {
        element.style.width = `${
          100 * (newTitles ? newTitles.length / 6 : 0)
        }%`;
      } else {
        element.style.width = `100%`;
        element.style.marginLeft = `0px`;
      }
    }
  }, [newTitles,getState]);
  useEffect(() => {
    setNewTask(undefined);
    setNewTitles([]);
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + 18)
    setUpcoming({ from: "", to: formatDate(newDate) });
  }, [state.filter]);
  useEffect(() => {
    if (titles) {
      newTitles
        ? setNewTitles(Array.from(new Set([...newTitles, ...titles])))
        : setNewTitles(Array.from(new Set([...titles])));
    }
  }, [titles]);
  useEffect(() => {
    newTask ? setNewTask({ ...newTask, ...task }) : setNewTask(task);
  }, [task]);
  const next = () => {
    if (box.current) {
      const element = box.current;
      element.style.marginLeft = `${-1200 * (page + 1)}px`;
      setNextPage(page + 1);
      if (page > 0 && page + 1 > (newTitles ? newTitles.length / 6 : 0) / 2) {
        const newDate = new Date(upcoming.to);
        newDate.setDate(newDate.getDate() + 18);
        setUpcoming({ from: upcoming.to, to: formatDate(newDate) });
      }
    }
  };
  const previous = () => {
    if (box.current) {
      const element = box.current;
      element.style.marginLeft = `${-1200 * (page - 1)}px`;
      setNextPage(page - 1);
    }
  };
  const Render = () => {
    console.log(newTask && Object.keys(newTask));

    return (
      <>
        {!newTask && <h1>Loading...</h1>}
        {newTask &&
          Object.entries(newTask).map(([key, value], index) => (
            <>
              <div
                className={`${getState() ? `box-${key}` : "min-w-[260px]"}`}
              >
                <SubProjectItem
                  isUpcoming={key}
                  isSection={false}
                  isList={getState()}
                  code={key}
                  key={index}
                  title={newTitles && newTitles[index]}
                  tasks={value}
                ></SubProjectItem>
              </div>
            </>
          ))}
      </>
    );
  };
  const RenderTitles = () => {
    const arr = newTitles
      ? [...newTitles].splice(index, newTitles.length - index)
      : [];

    return (
      <>
        <div className="overflow-x-hidden">
          <div className="flex justify-start ">
            {arr.length > 0 &&
              arr.map((title, i) => (
                <div
                  className={`cursor-pointer capitalize min-w-[120px] px-2 py-1 hover:bg-gray-300 transition-all rounded-sm ${
                    i === 0 ? `${textColor[theme.color]}` : ""
                  }`}
                >
                  {formatDayComing(new Date(title))}
                </div>
              ))}
          </div>
        </div>
      </>
    );
  };
  const onDragStart = () => {};
  const onDragEnd = (result : DropResult) => {
    if (!result.destination) {
      return;
    }
    if (newTask) {
      const key = result.source.droppableId;
      const desKey = result.destination.droppableId;
      const index: number = result.source.index;
      const desIndex: number = result.destination.index;
      const arr = Array.from(newTask[key]);
      if (key != desKey) {
        if (desKey != "over date") {
          const [newItem] = arr.splice(index, 1);
          arr.slice(index, 1);
          const newDateItem : TaskResponse = {
            ...newItem,
            expiredAt: new Date(desKey),
          }
         
          const newArr = [...newTask[desKey], newDateItem];

          const item = reorder(newArr, newArr.length - 1, desIndex);
          setNewTask({ ...newTask, [key]: arr, [desKey]: item });
          const data = {
            id: newItem.id,
            expiredAt: new Date(desKey),
          };
          handleUpdateTask("/tasks/expired-at", data,"expiredAt");
        }
      } else {
        const item = reorder(arr, index, desIndex);
        console.log(item);

        setNewTask({ ...newTask, [key]: item });
      }
    }
  };
  function handleSrcoll() {
    
    if(box.current){
      const element: HTMLElement = box.current;
      const x = element.offsetLeft;
      const y = element.offsetTop;
      const boxElement = document.elementFromPoint(x, y);
      if (boxElement && boxElement.classList.contains("current-day")) {
        const text = boxElement.textContent;
        const index = newTitles.findIndex((title) => title === text);
        setIndex(index);
        if (index >= newTitles.length / 2) {
          const newDate = new Date(upcoming.to);
          newDate.setDate(newDate.getDate() + 18);
          setUpcoming({ from: upcoming.to, to: formatDate(newDate) });
        }
      }
    }
  }
  return (
    <>
      <BaseWeb page="upcoming" label={key}>
        <div>
          <div
            className={` h-[100vh] ${
              !getState() ? "w-[1200px] overflow-x-hidden" : "w-[800px]"
            }  mx-auto py-4 px-4`}
          >
            <h1 className="font-bold text-[28px] capitalize mb-2">upcoming</h1>
            <h4>{`${
              newTitles &&
              `${formatMonthComing(new Date(newTitles[index + 1]))}`
            }`}</h4>
            {!getState() ? (
              <div className="flex justify-end gap-2 pb-2 border-b-gray-300">
                <div
                  onClick={page > 0 ? () => previous() : undefined}
                  className={`px-2  rounded-sm ${
                    page > 0
                      ? "cursor-pointer bg-gray-100"
                      : "cursor-not-allowed bg-gray-50"
                  }`}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </div>
                <div
                  className="px-2  rounded-sm bg-gray-100 cursor-pointer"
                  onClick={next}
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </div>
            ) : (
              <RenderTitles></RenderTitles>
            )}

            <DragDropContext
              // isDragging={(event) => console.log(event)}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            >
              <div
                className={`  ${
                  getState()
                    ? "h-[100vh] overflow-y-scroll"
                    : ` flex  gap-2 ml-[${-100 * page}%]`
                } `}
                ref={box}
                onScroll={handleSrcoll}
              >
                <Render></Render>
              </div>
            </DragDropContext>

            {showModal && taskDetail && (
              <DetaiTask task={taskDetail}></DetaiTask>
            )}
          </div>
        </div>
      </BaseWeb>
      <ToastContainer />
    </>
  );
};

export default UpcomingTaskPage;
