import React, { useRef, useState } from "react";
import { TaskResponse } from "./TaskItem";
import HeaderTaskDetail from "./HeaderTaskDetail";
import { NavLink } from "react-router-dom";
import { showTag } from "../../utils/tag";
import { useDispatch } from "react-redux";
import { resetDetailTask } from "../../redux/reducer/taskDetailSlice";
import ButtonList from "../button/ButtonList";
import  { updateMethod } from "../../helper/api";
import FormProject, { SectionItem } from "../form/FormProject";
import { useSelector } from "react-redux";
import { state } from "../../redux/store";
import { LabelListSelect, Tag } from "../form/FormTask";
import { ProjectInfo } from "../../redux/reducer/projectSlice";
import FormCalendar, { Day } from "../form/FormCalendar";
import { UtilDate } from "../../utils/UtilsDate";
import FormPriority, { priority } from "../form/FormPriority";
import useTask, { Data } from "../../hooks/useTask";
import useOpenModal from "../../hooks/useOpenModal";
import LabelTaskList from "./LabelTaskList";
import { Label } from "../../redux/reducer/labelSlice";
import { updateState } from "../../redux/reducer/stateSlice";
import useTheme from "../../hooks/useTheme";
import { bgColor, bgMode, hoverMode, sidebarMode } from "../../utils/theme";


const DetaiTask = ({ task }: { task: TaskResponse }) => {
  console.log(task);
  const dateTask = new UtilDate(new Date(task.expiredAt));
  const initialValue: Data = {
    date: {
      date: dateTask.getDate(),
      day: dateTask.getDay(),
      mark: dateTask.getMark(),
    },
    priority: task.priority,
    tag: {
      project: task.project,
      section: task.section,
    },
  };
  const { state, setDate, setPriority, setTag } = useTask(initialValue);
  const project = useSelector((state: state) => state.project);
  const infoTaskRef = useRef<HTMLDivElement>(null);
  const titleTaskRef = useRef<HTMLInputElement>(null);
  const desTaskRef = useRef<HTMLInputElement>(null);
  const [isAllow, setAllow] = useState(true);
  const [isEdit, setEdit] = useState(false);
  const [currentTask, setTask] = useState<TaskResponse>(task);
  const [isToday, setToday] = useState(state.date?.mark === "Today");
  const [labelSelect, setSelected] = useState(task.labels);
  const {isShow,handleToggleModel} = useOpenModal(false);
  const isRender = useSelector((state : state) => state.status.isRender);
  const dispatchRedux = useDispatch();
  const {theme} = useTheme();
  const handleCloseTask = async () => {
    history.back();
    console.warn(labelSelect);
    
    if(labelSelect.length < 1){
      const data : {[key:string]: number|string[]} = {
        id: currentTask.id,
        labelCodes: []
      }
      await updateTask("/tasks/label",data)
    }
    
    dispatchRedux(updateState({key: 'isRender',value: !isRender}))
    dispatchRedux(resetDetailTask());
  };
  const handleMoveProject = () => {
    dispatchRedux(resetDetailTask());
  };
  const handleEditInfo = () => {
    if (infoTaskRef.current) {
      setEdit(true);
    }
  };
  async function updateTask<T>(url: string,data:T){
    try {
      const response = await updateMethod(url,data);
      console.warn(response);
      
      if (response &&  response.status === 200) {
        setTask(response.data);
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleUpdateTask = () => {
    console.log(titleTaskRef.current);

    if (titleTaskRef.current && desTaskRef.current) {
      const title = titleTaskRef.current.value;
      const description = desTaskRef.current ? desTaskRef.current.value : "";
      const data: { [key: string]: string | number } = {
        id: currentTask.id,
        title,
        description,
      };
      updateTask("/tasks/info", data);
      setEdit(false);
    }
  };
  const handleChoosePriority = (priority: priority) => {
    setPriority(priority);
    const data: { [key: string]: string | number | undefined } = {
      id: currentTask.id,
      priorityCode: priority.code,
    };
    updateTask("/tasks/priority", data);
  };
  const handleTitleInput = () => {
    if (titleTaskRef.current) {
      if (!titleTaskRef.current.value) {
        setAllow(false);
        return;
      } else {
        setAllow(true);
      }
    }
  };
  const handleChooseProject = (
    project?: ProjectInfo,
    section?: SectionItem
  ) => {
    const tag: Tag = { project, section };
    setTag(tag);
    const data: { [key: string]: string | number | undefined } = {
      id: currentTask.id,
      projectCode: project?.code,
      sectionCode: section?.code,
    };
    updateTask("/tasks/project", data);
  };
  const handleChooseDate = (date: Day) => {
    setDate(date);
    const data: { [key: string]: number | null | Date } = {
      id: currentTask.id,
      expiredAt: date.date,
    };
    updateTask("/tasks/expired-at", data);
  };

  const handleCheckLabel = (label: Label,index: number,isExist: boolean) => {
    console.log(isExist);
    if(isExist){
      let newArr: Label[] ;
      if(labelSelect.length > 1){
        labelSelect.splice(index,1);
        newArr = labelSelect;
        
      }
      else{
        newArr = [];
      }
      setSelected(newArr);
      
      
      
    }
    else{
      setSelected([...labelSelect,label]);
    }
  }
  const onBlurBox = () => {
    if(isShow){
      const data : {[key:string]: number|string[]} = {
        id: currentTask.id,
        labelCodes: labelSelect.map(label => label.code)
      }
      updateTask("/tasks/label",data)
      handleToggleModel();
    }
  }
 
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-task " onClick={onBlurBox}>
      <div className={`w-[800px] h-[600px] ${sidebarMode[theme.mode]()} rounded-lg py-4 px-3`}>
        <div className="flex justify-between">
          <NavLink
            onClick={handleMoveProject}
            to={`/app/project/${task.project.code}`}
          >
            {state.tag && showTag(state.tag)}
          </NavLink>
          <HeaderTaskDetail onClick={handleCloseTask}></HeaderTaskDetail>
        </div>
        <div className="flex justify-between">
          <div className=" flex items-start gap-2">
            <div>
              <input type="radio" />
            </div>
            <div
              className={`w-[500px] boder-2 border-gray-400 px-2 py-2 rounded-lg ${
                isEdit ? "border" : "border-none"
              }`}
              ref={infoTaskRef}
              onClick={!isEdit ? handleEditInfo : undefined}
            >
              {!isEdit ? (
                <>
                  <div className="outline-none">{currentTask.title}</div>
                  <div className="outline-none">{currentTask.description}</div>
                </>
              ) : (
                <>
                  <input
                    onChange={handleTitleInput}
                    ref={titleTaskRef}
                    type="text"
                    placeholder="Task Name"
                    className="text-[26px] bg-transparent font-semibold outline-none w-full"
                    defaultValue={currentTask.title}
                  />
                  <input
                    type="text"
                    ref={desTaskRef}
                    placeholder="Description"
                    className="w-full outline-none text-[16px] bg-transparent"
                    defaultValue={currentTask?.description}
                  />
                  <div className="flex justify-end">
                    <ButtonList
                      isList={true}
                      isAllow={isAllow}
                      clickCancle={() => setEdit(false)}
                      clickSubmit={handleUpdateTask}
                    ></ButtonList>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <BaseMoreInfo label="Project">
              <FormProject
                onclick={handleChooseProject}
                tag={state.tag}
                isInbox={currentTask.project.id === project.inbox?.id}
              />
            </BaseMoreInfo>
            <BaseMoreInfo label="Due date">
              <FormCalendar
                currentDay={state.date}
                onChange={(value: boolean) => setToday(value)}
                onClick={handleChooseDate}
                isToday={isToday}
              />
            </BaseMoreInfo>
            <BaseMoreInfo label="Priority">
              <FormPriority
               isList={true}
                onclick={handleChoosePriority}
                priority={state.priority}
                isDefault={false}
              />
            </BaseMoreInfo>
            <BaseMoreInfo>
              <TileTask className=" relative mb-2 text-[16px]  ">
                <div onClick={() => handleToggleModel()} className={`px-2 text-[16px] flex justify-between rounded-lg ${hoverMode[theme.mode]()} cursor-pointer`}>
                  <span>Label</span>
                  <span>
                    <i className="fa-solid fa-plus"></i>
                  </span>
                </div>
                {isShow && <LabelTaskList onClick={handleCheckLabel} labelSelect={labelSelect} className={`absolute top-[40px] box-calen py-2 left-0 w-[300px] z-20 ${sidebarMode[theme.mode]()}`}></LabelTaskList>}
              </TileTask>

              <div className="flex gap-2">
                {(!isShow && labelSelect.length > 0) && (
                  
                  <LabelListSelect
                    setLabels={setSelected}
                    labels={labelSelect}
                  ></LabelListSelect>
                  
                )}
              </div>
            </BaseMoreInfo>
          </div>
        </div>
      </div>
    </div>
  );
};

const BaseMoreInfo = ({
  label,
  className,
  children,
}: {
  label?: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`border border-transparent border-b-gray-300 px-2  py-3 ${className}`}
    >
      {label && <TileTask>{label}</TileTask>}
      {children}
    </div>
  );
};
const TileTask = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={`text-[16px] font-normal ${className} mb-2`}>
      {children}
    </div>
  );
};
export default DetaiTask;
