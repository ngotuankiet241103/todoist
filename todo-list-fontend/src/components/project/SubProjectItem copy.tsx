import React, { useEffect, useState } from "react";
import TaskList, { TaskListResponse } from "../task/TaskList";
import { Droppable } from "react-beautiful-dnd";
import { getListStyle } from "../../utils/dragContext";
import { SectionItem } from "../form/FormProject";
import requestApi, { deleteMethod, updateMethod } from "../../helper/api";
import useOpenModal from "../../hooks/useOpenModal";
import AddSection from "../task/AddSection";
import useRender from "../../hooks/useRender";

const SubProjectItem = ({
  title,
  tasks,
  code,
  isList,
  isUpcoming,
  isSection
}: {
  title?: string;
  tasks: TaskListResponse | [];
  code: string;
  isList: boolean;
  isUpcoming?: string
  isSection: boolean
}) => {
  const [section,setSection] = useState<SectionItem>();
  const {isShow,handleToggleModel} = useOpenModal(false);
  const [isAction,setAction] = useState(false);
  const {handleRender} = useRender();
  useEffect(() => {
    const getSection = async () => {
      try {
        const response = await requestApi(`/sections/code/${code}`,"GET");
        console.warn(code);
        
        if(response.status === 200){
          setSection(response.data);
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    if(isSection){
      getSection();
    }
  },[])
  const handleUpdateSection = (name: string) => {
    async function updateSection<T>(url: string,data: T){
      try {
        const response = await updateMethod(url,data);
     
        if(response && response.status === 200){
          handleToggleModel();
          handleRender();
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    const data = {
      id: section?.id,
      name
    }
    updateSection("/sections",data);
  }
  const handleRemoveSection = () => {
    async function removeSection<T>(url: string,data: T){
      try {
        const response = await deleteMethod(url,data);
        if(response && response.status === 200){
          handleToggleModel();
          handleRender();
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    const data = {id: section?.id}
    removeSection("/sections",data);
  }
  
  return (
    <div className="w-full">
      {!isShow ?
      <div className="flex justify-between cursor-pointer" onMouseEnter={() => setAction(true)} onMouseLeave={() => setAction(false)}>
        
        <h2 className="font-semibold mb-2 current-day" >{title}</h2>
        {isSection && section &&  <div className={`gap-2 ${isAction ? 'flex' : 'hidden'} text-[14px]`}>
          <span onClick={handleToggleModel}><i className="fa-solid fa-pen"></i></span>
          <span onClick={handleRemoveSection}><i className="fa-solid fa-trash"></i></span>
        </div>
        }
      </div>
      :
      <AddSection
      section={section}
      clickCancle={handleToggleModel}
      clickSubmit={handleUpdateSection}
      ></AddSection>
      }
      <Droppable droppableId={`${ code}`}>
        {(provided, snapshot) => (
          <>
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <TaskList isUpcoming={isUpcoming || ""} isList={isList} tasks={tasks}></TaskList>
              {provided.placeholder}
            </div>
          </>
        )}
      </Droppable>
    </div>
  );
};

export default SubProjectItem;
