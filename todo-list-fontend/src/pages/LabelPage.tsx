import { useParams } from "react-router-dom";
import useTasks from "../hooks/useTasks";
import useChangeView from "../hooks/useChangeView";
import SubProjectItem from "../components/project/SubProjectItem copy";
import { useSelector } from "react-redux";
import { state } from "../redux/store";
import BaseWeb from "../components/web/BaseWeb";
import { useRef } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DetaiTask from "../components/task/DetaiTask";

const LabelPage = () => {
  const type = "label";
  const { labelCode } = useParams();
  const { state } = useChangeView(labelCode || "");
  console.warn(state.group);

  const box = useRef<HTMLDivElement>(null);
  const detail = useSelector((state: state) => state.detail);
  const { isShow: showModal, task: taskDetail } = detail;
  // const box = useRef<HTMLDivElement>(null);
  // const dispatch = useDispatch();
  const { task, titles } = useTasks(
    type,
    state.group,
    state.filter,
    "",
    labelCode
  );
  const Render = () => {
    console.warn(task);
    console.warn(titles);

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
  const onDragStart = () => {};
  const onDragEnd = () => {};
  const handleClick = () => {};
  return (
    <>
      <BaseWeb page="label" label={labelCode || ""}>
        <div onClick={handleClick}>
          <div
            ref={box}
            className={` mx-auto py-4 h-[100vh] ${
              state.isList ? "w-[800px]" : ""
            }`}
          >
            <DragDropContext
              // isDragging={(event) => console.log(event)}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            >
              <div className={`${state.isList ? "" : "task-list"}`}>
                <Render></Render>
              </div>
            </DragDropContext>
          </div>
          {showModal && taskDetail && <DetaiTask task={taskDetail}></DetaiTask>}
        </div>
      </BaseWeb>
    </>
  );
};

export default LabelPage;
