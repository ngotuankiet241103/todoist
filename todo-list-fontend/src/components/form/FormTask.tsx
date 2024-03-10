import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import FormCalendar, { Day } from "./FormCalendar";
import FormPriority, { priority } from "./FormPriority";
import FormProject, { SectionItem } from "./FormProject";
import { ProjectInfo } from "../../redux/reducer/projectSlice";
import requestApi from "../../helper/api";
import { formatDate } from "../../utils/formatDate";
import { setTask } from "../../redux/reducer/taskSlice";
import { useDispatch } from "react-redux";
import OtherForm from "./OtherForm";
import labelThunk from "../../redux/thunk/labelThunk";
import { Label } from "../../redux/reducer/labelSlice";
import { useSelector } from "react-redux";
import { state } from "../../redux/store";
import BoxTitle from "./BoxTitle";
import IconMenu from "../web/IconMenu";
import ButtonList from "../button/ButtonList";
import useTask, { Data } from "../../hooks/useTask";
import { TaskResponse } from "../task/TaskItem";
import { UtilDate } from "../../utils/UtilsDate";
import useRender from "../../hooks/useRender";
type formTask = {
  isFixed?: boolean;
  visibile: boolean;
  onclick: () => void;
  task?: TaskResponse;
};
export type Tag = {
  project?: ProjectInfo;
  section?: SectionItem;
};
export type Task = {
  title: string;
  description?: string;
  projectCode: string;
  sectionCode: string;
  labelCodes: string[];
  priorityCode: string;
  expiredAt: Date | null;
};

const FormTask = ({ isFixed, visibile, onclick, task }: formTask) => {
  const { handleRender } = useRender();
  const inputTaskRef = useRef<HTMLInputElement>(null);
  const inputDesRef = useRef<HTMLInputElement>(null);
  const dateTask = task?.expiredAt
    ? new UtilDate(new Date(task.expiredAt))
    : new UtilDate(new Date());
  const initialValue: Data = {
    date: {
      date: dateTask.getDate(),
      day: dateTask.getDay(),
      mark: dateTask.getMark(),
    },
    priority: task?.priority,
    tag: {
      project: task?.project,
      section: task?.section,
    },
  };
  const { state, setDate, setPriority, setTag, reset } = useTask(initialValue);

  const [isAllow, setAllow] = useState(task?.title);
  const [isToday, setIsToday] = useState(state.date?.mark === "Today");
  const dispathRedux = useDispatch();
  const [isChooseLabel, setChooseLabel] = useState(false);
  const label = useSelector((state: state) => state.label);
  const [labelSelect, setSelected] = useState<Label[]>(task?.labels || []);
  const handleChooseDate = (date: Day) => {
    setDate(date);
  };

  const handleChoosePriority = useCallback((priority: priority) => {
    setPriority(priority);
  }, []);
  const handleChooseTag = (project?: ProjectInfo, section?: SectionItem) => {
    setTag({ project, section });
  };

  const commomCss = ` py-4`;
  function handleOnChange() {
    inputTaskRef.current && inputTaskRef.current?.value
      ? setAllow(true)
      : setAllow(false);
  }
  const handleAddTask = () => {
    if (inputTaskRef.current && inputTaskRef.current.value) {
      const title = inputTaskRef.current && inputTaskRef.current.value;
      const description =
        (inputDesRef.current && inputDesRef.current.value) || "";
      const projectCode = state.tag?.project?.code || "";
      const sectionCode = state.tag?.section?.code || "";
      const labelCodes = labelSelect.map((label) => label.code);
      const priorityCode = state.priority?.code || "";
      const expiredAt = state.date?.date || null;

      const task: Task = {
        title,
        description,
        projectCode,
        sectionCode,
        labelCodes,
        priorityCode,
        expiredAt,
      };
      console.log(task);

      addTask(task);
    }
  };
  const addTask = async (data: Task) => {
    try {
      let response;
      if (task?.id) {
        response = await requestApi(`/tasks/${task.id}`, "PUT", data);
      } else {
        response = await requestApi("/tasks/add", "POST", data);
      }

      if (response.status === 200) {
        if (task?.id) {
          handleRender();
        } else {
          
          data.expiredAt &&
            dispathRedux(
              setTask({ key: formatDate(data.expiredAt), data: response.data })
            );
        }
        reset();
        onclick();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement> | undefined) => {
    if (e?.key === "@") {
      setChooseLabel(true);
    }
  };
  useEffect(() => {
    dispathRedux(labelThunk());
  }, []);
  const handleChooseLabel = (label: Label) => {
    setChooseLabel(false);
    setSelected([...labelSelect, label]);
    renderLabel();
  };
  const renderLabel = () => {
    if (inputTaskRef.current && inputTaskRef.current.value) {
      const value = inputTaskRef.current.value;
      const index = value.indexOf("@");
      console.log(index);
      if (index >= 0) {
        inputTaskRef.current.value = inputTaskRef.current.value.replace(
          "@",
          ""
        );
      }
    }
  };
  return (
    <>
      {visibile && (
        <div
          className={`${
            isFixed
              ? `fixed inset-0 z-[100] flex justify-center items-center`
              : `border border-gray-300 rounded-lg`
          }`}
        >
          <div
            onClick={(e) => e.preventDefault()}
            className={`${
              isFixed
                ? ` w-[600px] z-[100] rounded-lg ${commomCss} bg-white shadow-slate-600 box-task`
                : ` w-full ${commomCss}`
            } relative
            `}
          >
            <div className="px-2">
              <input
                onKeyUp={handleKeyUp}
                onChange={handleOnChange}
                ref={inputTaskRef}
                type="text"
                placeholder="Task Name"
                className="text-[26px] bg-transparent font-semibold outline-none w-full"
                defaultValue={task?.title}
              />
              <input
                type="text"
                ref={inputDesRef}
                placeholder="Description"
                className="w-full outline-none text-[16px] bg-transparent"
                defaultValue={task?.description}
              />
              <div className="flex gap-4 items-center py-3">
                <div>
                  <FormCalendar
                    currentDay={state.date}
                    isToday={isToday}
                    onClick={handleChooseDate}
                    onChange={(value: boolean) => setIsToday(value)}
                  />
                </div>

                <div>
                  <FormPriority
                    priority={state.priority}
                    isDefault={true}
                    onclick={handleChoosePriority}
                  />
                </div>
                {labelSelect.length > 0 && (
                  <LabelListSelect
                    setLabels={setSelected}
                    labels={labelSelect}
                  ></LabelListSelect>
                )}
                <div>
                  <OtherForm onclick={() => setChooseLabel(true)}></OtherForm>
                </div>
              </div>
            </div>
            <div className="border-t-2 px-2 pt-4 flex justify-between">
              <div>
                <FormProject
                  onclick={handleChooseTag}
                  tag={state.tag}
                ></FormProject>
              </div>
              <ButtonList
                isUpdated={!!task}
                isAllow={isAllow}
                clickCancle={() => onclick()}
                clickSubmit={handleAddTask}
              ></ButtonList>
            </div>
            {isChooseLabel && (
              <ListLabel
                onclick={handleChooseLabel}
                labels={
                  labelSelect.length > 0
                    ? filterLabel(label, labelSelect)
                    : label
                }
              ></ListLabel>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export const LabelListSelect = ({
  labels,
  setLabels,
}: {
  labels: Label[];
  setLabels: (data: Label[]) => void;
}) => {
  const handleRemoveLabel = (label: Label) => {
    const newArr = labels.filter((item) => item.id != label.id);
    setLabels(newArr);
  };
  return (
    <>
      {labels.length > 0 &&
        labels.map((label) => (
          <LabelItemSelect
            onClose={handleRemoveLabel}
            label={label}
            key={label.id}
          ></LabelItemSelect>
        ))}
    </>
  );
};
export const LabelItemSelect = ({
  label,
  onClose,
}: {
  label: Label;
  onClose: (label: Label) => void;
}) => {
  return (
    <>
      <BoxTitle className="flex items-center" isBorder={true}>
        <span>{label.name}</span>
        <IconMenu
          className="text-[11px]"
          icon={`fa-solid fa-xmark`}
          onClick={() => onClose(label)}
        ></IconMenu>
      </BoxTitle>
    </>
  );
};
const filterLabel = (labels: Label[], labelSelect: Label[]): Label[] => {
  return labels.filter((label) => !labelSelect.includes(label));
};
const ListLabel = ({
  labels,
  onclick,
}: {
  labels: Label[];
  onclick: (label: Label) => void;
}) => {
  const [selected, setSelected] = useState<Label>(labels[0]);
  const getSelected = (selectedId: number, idLabel: number) =>
    selectedId == idLabel;
  const handleMouseSelect = (label: Label) => {
    setSelected(label);
  };
  const handleClick = () => {
    onclick(selected);
  };
  return (
    <div className="absolute top-[40px] left-0 w-full">
      <div className="w-[95%] mx-auto bg-white box-calen rounded-lg overflow-hidden">
        {labels.length > 0 &&
          labels.map((label) => (
            <LabelItem
              onHover={handleMouseSelect}
              key={label.id}
              label={label}
              isSelected={getSelected(selected.id, label.id)}
              onclick={handleClick}
            ></LabelItem>
          ))}
      </div>
    </div>
  );
};
const LabelItem = ({
  isSelected,
  label,
  onHover,
  onclick,
}: {
  isSelected: boolean;
  label: Label;
  onHover: (label: Label) => void;
  onclick: () => void;
}) => {
  return (
    <div
      className={`${
        isSelected ? "bg-gray-300 " : " "
      } px-2 py-2 flex gap-2 cursor-pointer`}
      onMouseEnter={() => onHover(label)}
      onClick={onclick}
      onKeyUp={(e) => console.log(e)}
    >
      <span>
        <i className="fa-solid fa-tag"></i>
      </span>
      <span>{label.name}</span>
    </div>
  );
};
export default FormTask;
