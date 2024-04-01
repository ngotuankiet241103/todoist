import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskList from "../components/task/TaskList";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { getListStyle, reorder } from "../utils/dragContext";
import useOpenModal from "../hooks/useOpenModal";

import { useSelector } from "react-redux";
import { state } from "../redux/store";
import { useDispatch } from "react-redux";
import { getTaskByProjectCodeThunk } from "../redux/thunk/taskThunk";
import { SectionItem } from "../components/form/FormProject";
import requestApi, { postMethod } from "../helper/api";
import SubProjectItem from "../components/project/SubProjectItem";
import { updateTask } from "../redux/reducer/taskSlice";
import DetaiTask from "../components/task/DetaiTask";
import AddSection from "../components/task/AddSection";
import useRender from "../hooks/useRender";
import useChangeView from "../hooks/useChangeView";
import BaseWeb from "../components/web/BaseWeb";

async function handleUpdateTask<T>(api: string, data: T) {
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
  const { projectCode } = useParams();
  const dispatch = useDispatch();
  const task = useSelector((state: state) => state.task);
  const isRender = useSelector((state: state) => state.status.isRender);
  const { handleRender } = useRender();
  const { isShow, handleToggleModel } = useOpenModal(false);
  const [sections, setSection] = useState<SectionItem[]>([]);
  const detail = useSelector((state: state) => state.detail);
  const { isShow: showModal, task: taskDetail } = detail;
  const { isShow: isAddSection, handleToggleModel: handleToggleSection } = useOpenModal(false);

  const { state } = useChangeView(projectCode || "");
  useEffect(() => {
    const getTaskByProjectCode = () => {
      dispatch(getTaskByProjectCodeThunk(projectCode));
    };
    const getSecionByProjectCode = async () => {
      try {
        const response = await requestApi(`/sections/${projectCode}`, "GET");
        if (response.status === 200) {
          setSection(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (projectCode) {
      getSecionByProjectCode();
    }
    getTaskByProjectCode();
  }, [projectCode,isRender]);
  useEffect(() => {
    if (sections.length > 0) {
      sections.forEach((section) => {
        dispatch(getTaskByProjectCodeThunk(projectCode, section.code));
      });
    }
  }, [projectCode,isRender,sections]);
  const onDragStart = (event) => {
    console.log(event);

    
  };
  const onDragEnd = async (result) => {
    console.log(result);

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
      const [newItem] = arr.splice(index, 1);
      arr.slice(index, 1);

      const newArr = [...task[desKey], newItem];
      const item = reorder(newArr, newArr.length - 1, result.destination.index);
      dispatch(updateTask({ [key]: arr, [desKey]: item }));

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
    } 
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
  return (
    <>
      <BaseWeb
        page="project"
        label={projectCode || ""}
        isShow={isShow}
        onClick={handleToggleModel}
      >
        <div onClick={handleClick}>
          <div
            className={` mx-auto py-4 h-[100vh] ${state.isList ? "w-[800px]" : "w-full"}`}
          >
            <DragDropContext
              // isDragging={(event) => console.log(event)}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            >
              <div className={`${state.isList ? "" : "grid grid-cols-4 gap-4"} `}>
                <Droppable droppableId={`${projectCode}`}>
                  {(provided, snapshot) => (
                    <>
                      
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        <h2 className="font-semibold mb-2">(No section)</h2>
                        <TaskList
                          isList={state.isList}
                          tasks={task[`${projectCode}`]}
                        ></TaskList>

                        {provided.placeholder}
                      </div>
                    </>
                  )}
                </Droppable>
                
                {sections &&
                  sections.length > 0 &&
                  sections.map((section) => (
                    <SubProjectItem
                      isList={state.isList}
                      code={section.code}
                      key={section.id}
                      title={section.name}
                      tasks={task[`${section.code}`]}
                    ></SubProjectItem>
                  ))}
                  {!state.isList && (
                  <div className="mb-2">
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
