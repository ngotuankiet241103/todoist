import React, { useRef, useState } from "react";
import FormTask, { Task } from "../form/FormTask";
import { ProjectInfo } from "../../redux/reducer/projectSlice";
import { SectionItem } from "../form/FormProject";
import { showTag } from "../../utils/tag";
import { Label } from "../../redux/reducer/labelSlice";
import TaskTime from "./TaskTime";
import TaskLabelItem from "./TaskLabelItem";
import { useDispatch } from "react-redux";
import { setDetailTask } from "../../redux/reducer/taskDetailSlice";
import { priority } from "../form/FormPriority";
import { bgColorPriority, colorPriority } from "../../constaints/flag";
import { updateMethod } from "../../helper/api";
import useOpenModal from "../../hooks/useOpenModal";

export type TaskResponse = Pick<Task, "title" | "description"> & {
  id: number;
  code: string;
  expiredAt: Date;
  priority: priority;
  project: ProjectInfo;
  section: SectionItem;
  labels: Label[];
};
type TaskItem = {
  task: TaskResponse;
  innerref: (element: HTMLElement | null) => void;
  style: any;
  [key: string]: any;
};
const TaskItem = ({ task, innerref, style, ...props }: TaskItem) => {
  const checkBoxRef = useRef<HTMLDivElement>(null);
  const { isShow, handleToggleModel } = useOpenModal(false);
  const dispatch = useDispatch();
  const [isHover, setHover] = useState(false);
  const handleClickTask = (value: TaskResponse) => {
    const newURL = `/app/task/${task.code}`;
    console.log(value);

    // // Change URL without triggering a render
    history.pushState({}, "", newURL);
    dispatch(setDetailTask(value));
  };
  const handleCompleteTask = async (id: number, cb: () => void) => {
    try {
      const response = await updateMethod("/tasks/completed", { id });
      if (response && response.status === 200) {
        console.log("task completed");
        cb();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckComplete = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    event.stopPropagation();
    const getParent = (e: HTMLElement | null, parentName: string) => {
      while (e && !e.classList.contains(parentName)) {
        e = e.parentElement;
      }
      return e;
    };
    const handleSuccess = () => {
      const element = getParent(checkBoxRef.current, "task-item");
      element?.remove();
    };
    handleCompleteTask(task.id, handleSuccess);
  };
  const onClickEdit =  (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    handleToggleModel();
  }
  return (
    <>
      {!isShow ? (
        <div
          ref={innerref}
          style={style}
          onClick={() => handleClickTask(task)}
          {...props}
          className="flex gap-2 justify-start task-item cursor-pointer py-2 mb-2 border border-transparent border-b-gray-300"
        >
          <div className="py-2">
            <div
              ref={checkBoxRef}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className={`relative w-[18px] h-[18px] rounded-full border-2  border-${
                colorPriority[`${task.priority.level}`]
              }-600 bg-${bgColorPriority[`${task.priority.level}`]} `}
            >
              <div
                onClick={handleCheckComplete}
                className={`absolute top-[-2px]  text-[12px] left-[50%] translate-x-[-50%] text-${
                  colorPriority[`${task.priority.level}`]
                }-400 ${isHover ? "block" : "hidden"}`}
              >
                <i className="fa-solid fa-check"></i>
              </div>
            </div>
          </div>
          <div className="flex-1  ">
            <h2>{task.title}</h2>
            <div className="flex justify-between">
                <p className="text-[14px]">{task?.description}</p>
                <div className="flex gap-2">
                  <span onClick={onClickEdit}><i className="fa-solid fa-pen"></i></span>
                </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-4">
                {task.expiredAt && (
                  <TaskTime date={new Date(task.expiredAt)}></TaskTime>
                )}
                {task.labels &&
                  task.labels.length > 0 &&
                  task.labels.map((label) => (
                    <TaskLabelItem key={label.id} label={label} />
                  ))}
              </div>
              {showTag({ project: task.project, section: task.section })}
            </div>
          </div>
        </div>
      ) : (
        <FormTask task={task} isFixed={false} visibile={true} onclick={handleToggleModel}></FormTask>
      )}
    </>
  );
};

export default TaskItem;
