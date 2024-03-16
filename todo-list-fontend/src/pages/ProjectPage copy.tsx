
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
import useProjectPage  from "../hooks/useProjectPage";


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
  const type = "project";
  const { projectCode } = useParams();
  const { state } = useChangeView(projectCode || "");
  console.log(state);
  
  const dispatch = useDispatch();
  const { task, sections, titles } = useProjectPage(type,state.group,state.filter,projectCode);
  const isRender = useSelector((state: state) => state.status.isRender);
  const { handleRender } = useRender();
  const { isShow, handleToggleModel } = useOpenModal(false);

  const detail = useSelector((state: state) => state.detail);
  const { isShow: showModal, task: taskDetail } = detail;
  const { isShow: isAddSection, handleToggleModel: handleToggleSection } =
    useOpenModal(false);

  
  // useEffect(() => {
  //   const getTaskByProjectCode = () => {
  //     dispatch(getTaskByProjectCodeThunk(projectCode));
  //   };
  //   const getSecionByProjectCode = async () => {
  //     try {
  //       const response = await requestApi(`/sections/${projectCode}`, "GET");
  //       if (response.status === 200) {
  //         setSection(response.data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   if (projectCode) {
  //     getSecionByProjectCode();
  //   }
  //   getTaskByProjectCode();
  // }, [projectCode,isRender]);
  // useEffect(() => {
  //   if (sections.length > 0) {
  //     sections.forEach((section) => {
  //       dispatch(getTaskByProjectCodeThunk(projectCode, section.code));
  //     });
  //   }
  // }, [projectCode,isRender,sections]);
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
    }
    else{
      const index: number = result.source.index;
      const arr = Array.from(task[key]);
      const item = reorder(arr, index, result.destination.index);
      console.log(item);
      
      dispatch(
        updateTask({
          type,
          value: { [key]: item},
        })
      );
    }

    // const element = document.querySelector(`#${result.draggableId}`);
    // element.classList.remove("border-red-400");
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
  const handleToggleModal = (e: React.MouseEvent<HTMLElement,MouseEvent>) => {
    console.log(e);
    
    const getParent = (e: HTMLElement,element: string)=> {
      while(!e.classList.contains(element)){
        
        e = e.parentElement;
      }
      return e;
    }
    const parent =getParent(e.target,"add-section");
    console.log(parent);
    
    parent.classList.toggle("h-[160px]")
    const form : HTMLDivElement = parent.querySelector('.form-section');
    const sectionItem  : HTMLDivElement= parent.querySelector('.title-section');
    sectionItem.classList.toggle("section-item");
    form.classList.toggle("hidden");
    
  }
  
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
              {state.group=="default" && state.isList && (
                  <div className={`add-section ${isAddSection ? '' : 'h-[30px]'} overflow-x-hidden`}>
                   
                      <div
                        onClick={handleToggleModal}
                        className="hidden title-section section-item text-center transition-all text-red-600 cursor-pointer"
                      >
                        Add section
                      </div>
                      <div className="hidden form-section">
                        <AddSection
                          clickCancle={handleToggleModal}
                          clickSubmit={handleAddSection}
                        ></AddSection>
                      </div>
                  </div>
                )}
            </>
          ))}
      </>
    );
  };
  return (
    <>
      <BaseWeb
        page="project"
        label={projectCode || ""}
      >
        <div onClick={handleClick}>
          <div
            className={` mx-auto py-4 h-[100vh] ${
              state.isList ? "w-[800px]" : "w-full"
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
