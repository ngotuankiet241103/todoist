import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { reorder } from "../utils/dragContext";
import useOpenModal from "../hooks/useOpenModal";
import { useSelector } from "react-redux";
import { state } from "../redux/store";
import { useDispatch } from "react-redux";
import requestApi, { postMethod } from "../helper/api";
import SubProjectItem from "../components/project/SubProjectItem copy";
import { updateTask } from "../redux/reducer/tasksSlice";
import DetaiTask from "../components/task/DetaiTask";
import AddSection from "../components/task/AddSection";
import useRender from "../hooks/useRender";
import useChangeView from "../hooks/useChangeView";
import BaseWeb from "../components/web/BaseWeb";
import useTasks from "../hooks/useTasks";
import { useEffect, useRef, useState } from "react";
import { updateState } from "../redux/reducer/stateSlice";
import { bgColor, textColor } from "../utils/theme";
import useTheme from "../hooks/useTheme";

export async function handleUpdateTask<T>(api: string, data: T) {
  try {
    const response = await requestApi(api, "PUT", data);
    if (response.status === 200) {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
}
type TaskUpdate = {
  [key: string]: string | number | Date;
};
const ProjectPage = () => {
  const type = "project";
  const { projectCode } = useParams();
  const { state } = useChangeView(projectCode || "");
  const box = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { task, sections, titles } = useTasks(
    type,
    state.group,
    state.filter,
    projectCode
  );
  const priorities = useSelector((state: state) => state.priority);
  const { handleRender } = useRender();
  const { isShow, handleToggleModel } = useOpenModal(false);
  const detail = useSelector((state: state) => state.detail);
  const { isShow: showModal, task: taskDetail } = detail;
  const { isShow: isAddSection, handleToggleModel: handleToggleSection } =
    useOpenModal(false);
  const {theme} = useTheme();
  const onDragStart = (event) => {
    dispatch(updateState({ key: "isDragging", value: true }));
  };
  const onDragEnd = async (result) => {
    console.log(result);
    if (task) {
      // dropped outside the list
      if (!result.destination) {
        return;
      }
      const key: string = result.source.droppableId;
      const desKey: string = result.destination.droppableId;
      console.log(key);

      if (key !== desKey) {
        const index: number = result.source.index;
        const arr = Array.from(task[key]);
        let [newItem] = arr.splice(index, 1);
        arr.slice(index, 1);
        if (state.group == "priority") {
          const priority =
            priorities &&
            priorities.find((priority) => priority.code === desKey);
          if (priority) {
            newItem = {
              ...newItem,
              priority,
            };
          }
        }
        const newArr = [...task[desKey], newItem];
        const item = reorder(
          newArr,
          newArr.length - 1,
          result.destination.index
        );
        dispatch(
          updateTask({
            type,
            value: { [key]: arr, [desKey]: item },
          })
        );
        if (state.group == "default") {
          if (sections.some((section) => section.code === desKey)) {
            const data: TaskUpdate = {
              id: Number(result.draggableId),
              sectionCode: desKey,
            };

            handleUpdateTask(`/tasks/project/section`, data);
          } else if (desKey === projectCode) {
            const data: TaskUpdate = {
              id: Number(result.draggableId),
              projectCode: desKey,
            };
            handleUpdateTask(`/tasks/project`, data);
          }
        } else if (state.group == "priority") {
          const data: TaskUpdate = {
            id: Number(result.draggableId),
            priorityCode: desKey,
          };
          console.log(data);

          handleUpdateTask(`/tasks/priority`, data);
        }
      } else {
        const index: number = result.source.index;
        const arr = Array.from(task[key]);
        const item = reorder(arr, index, result.destination.index);
        console.log(item);

        dispatch(
          updateTask({
            type,
            value: { [key]: item },
          })
        );
      }
    }
    dispatch(updateState({ key: "isDragging", value: false }));
  };
  const handleAddSection = (sectionName: string) => {
    async function addSecction<T>(api: string, data: T) {
      try {
        const response = await postMethod(api, data);
        if (response && response.status === 200) {
          handleToggleSection();
          handleRender();
        }
      } catch (error) {
        console.log(error);
      }
    }
    addSecction(`/sections/${projectCode}`, { name: sectionName });
  };
  const handleClick = () => {
    if (isShow) {
      handleToggleModel();
    }
  };
  const handleToggleModal = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log(e);

    const getParent = (e: HTMLElement, element: string) => {
      while (!e.classList.contains(element)) {
        e = e.parentElement;
      }
      return e;
    };
    const parent = getParent(e.target, "add-section");
    console.log(parent);
    console.warn(parent);
    parent.classList.toggle("h-[30px]")
    parent.classList.toggle("h-[160px]");
    const form: HTMLDivElement = parent.querySelector(".form-section");
    const sectionItem: HTMLDivElement = parent.querySelector(".title-section");
    sectionItem.classList.toggle("section-item");
    form.classList.toggle("hidden");
  };

  const Render = () => {
    console.warn(task);

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
                {state.group == "default" && state.isList && (
                  <div
                    className={`add-section ${
                      isAddSection ? "" : "h-[30px]"
                    } overflow-x-hidden`}
                  >
                    
                      <div
                        onClick={handleToggleModal}
                        className={`relative hidden title-section section-item text-center transition-all ${textColor[theme.color]} cursor-pointer`}
                      > 
                        <div className={`absolute top-[50%] left-[-60px]  translate-y-[-50%] w-[50%] h-[2px] ${bgColor[theme.color]}`}></div>
                        Add section
                        <div className={`absolute top-[50%] right-[-60px]  translate-y-[-50%] w-[50%] h-[2px] ${bgColor[theme.color]}`}></div>

                      </div>
                    
                      <div className="hidden form-section">
                        <AddSection
                          clickCancle={handleToggleModal}
                          clickSubmit={handleAddSection}
                        ></AddSection>
                      </div>
                    
                  </div>
                )}
              </div>
            </>
          ))}
      </>
    );
  };
  return (
    <>
      <BaseWeb page="project" label={projectCode || ""}>
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
                {!state.isList && (
                  <div className="mb-2 flex-1">
                    <div className="add-section h-[100px] overflow-x-hidden">
                      {!isAddSection ? (
                        <h2
                          onClick={handleToggleSection}
                          className="w-full borde border-gray-300 text-gray-400 cursor-pointer hover:text-primary"
                        >
                          Add section
                        </h2>
                      ) : (
                        <AddSection
                          clickCancle={handleToggleSection}
                          clickSubmit={handleAddSection}
                        ></AddSection>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </DragDropContext>
          </div>
          {showModal && taskDetail && <DetaiTask task={taskDetail}></DetaiTask>}
        </div>
      </BaseWeb>
    </>
  );
};

export default ProjectPage;
