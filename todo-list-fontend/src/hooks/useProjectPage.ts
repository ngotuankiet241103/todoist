import React, { useEffect, useState } from "react";
import { TaskListResponse } from "../components/task/TaskList";
import { useSelector } from "react-redux";
import { state } from "../redux/store";
import requestApi from "../helper/api";
import { LabelSlice } from "../redux/reducer/labelSlice";
import { SectionItem } from "../components/form/FormProject";
import { priority } from "../components/form/FormPriority";
import { useDispatch } from "react-redux";
import { TasksSlice, setTasks } from "../redux/reducer/tasksSlice";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { Filter } from "../redux/reducer/stateSlice";

const useProjectPage = (
  type: "project" | "today",
  group: group,
  filter?: Filter,
  projectCode?: string

) => {
  console.log(useParams());

  const task = useSelector((state: state) => state.tasks[`${type}`]);
  const label = useSelector((state: state) => state.label);
  const priority = useSelector((state: state) => state.priority);
  const [sections, setSection] = useState<SectionItem[]>([]);
  const [titles, setTitle] = useState<string[]>();
  const dispatch = useDispatch();
  console.log(filter);
  
  useEffect(() => {
    const handleUpdateTask = (taskO: Task) => {
      const data: ProjectCommon = taskO.getTask(group);
      setTitle(taskO.getTitle(group));
      dispatch(setTasks({ key: type, data }));
    };
    const handleTask = async () => {
      try {
        if (type == "project") {
          const converArrToStr = (values: string[]) => {
            return values ? values.length > 0 && values.map((value,index,arr) => index === arr.length -1 ? value : `${value},`).join('') : "";
          }
          console.log(converArrToStr(filter ?  filter.priorityCode : []));
          
          const response = await requestApi(`/tasks/${projectCode}?priorityCode=${filter ? converArrToStr(filter.priorityCode) : ""}&labelCode=${filter ?  converArrToStr(filter.labelCode) : ""}`, "GET");
          console.log(response);
          
          const sectionResponse = await requestApi(
            `/sections/${projectCode}`,
            "GET"
          );
          if (response.status === 200 && sectionResponse.status === 200) {
            console.log(sectionResponse.data);
            setSection(sectionResponse.data);
            console.log(priority);

            const taskO = new Task(
              type,
              response.data,
              label,
              priority,
              projectCode,
              sectionResponse.data
            );
            handleUpdateTask(taskO);
          }
        }
        else{
          const date = formatDate(new Date());
          const response = await requestApi(`/tasks?expired_at=${date}`,"GET","")
          if(response.status === 200){
            const taskO = new Task(
              type,
              response.data,
              label,
              priority,
              projectCode
              
            );
            handleUpdateTask(taskO);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleTask();
  }, [projectCode, group,filter]);

  return {
    task,
    titles,
    sections,
  };
};

export type ProjectGroupKey = "default" | "priority" | "due date";
export type ProjectGroupKeyEx = "project" | ProjectGroupKey;
export type group = ProjectGroupKeyEx;
type ProjectGroup = {
  [key: string]: TaskListResponse[] | [];
};

type ProjectGroupExpand = ProjectGroup & {
  [key in ProjectGroupKeyEx]: TaskListResponse[] | [];
};
type ProjectCommon = {
  [key in ProjectGroupKey]: () => ProjectGroup;
};
class Task {
  private tasks: TaskListResponse;
  private label: LabelSlice;
  private sections: SectionItem[] | undefined;
  private priority: priority[];
  private projectCode?: string;
  private type: "project" | "today";
  constructor(
    type: "project" | "today",
    task: TaskListResponse,
    label: LabelSlice,
    priority: priority[],
    projectCode?: string,
    sections?: SectionItem[]
  ) {
    this.type = type;
    this.tasks = task;
    this.label = label;
    this.sections = sections;
    this.projectCode = projectCode;
    this.priority = priority;
  }
  public getTask(group: group) {
    const handlePageProject: ProjectCommon = {
      default: () => {
        if (this.type === "project" && this.projectCode) {
          const response: TasksSlice = {
            [this.projectCode]: this.tasks.filter(
              (task) => task.project.code == this.projectCode && !task.section
            ),
          };
          console.log(this.sections);

          const data =
            this.sections &&
            this.sections.reduce((prev, section) => {
              console.log(section.code);

              return {
                ...prev,
                [section.code]: this.tasks.filter((task) =>
                  task.section ? task.section.code === section.code : false
                ),
              };
            }, {});

          return {
            ...response,
            ...data,
          };
        }
        else{
          let response : ProjectGroup = {}
          response = this.tasks && this.tasks.reduce((prev,task) : ProjectGroup  => {
            const date = new Date(task.expiredAt);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if(date > currentDate) {
              if(!prev[`Today-${formatDate(date)}`]){
                return {
                  ...prev,
                  [`Today-${formatDate(date)}`]: [task]
                }
              }
              else{
                return {
                  ...prev,
                  [`Today-${formatDate(date)}`]: [...prev[`Today-${formatDate(date)}`],task]
                }
              }
            }
            else{
              if(!prev["over date"]){
                return {
                  ...prev,
                  [`over date`]: [task]
                }
              }
              else{
                return {
                  ...prev,
                  [`over date`]: [...prev["over date"],task]
                }
              }
            }
          } ,response)
          return {
            ...response
          }
        }
        
      },
      priority: () => {
        return this.priority.reduce((prev, priority) => {
          console.log(priority);

          return {
            ...prev,
            [priority.code]: this.tasks.filter(
              (task) => task.priority.id == priority.id
            ),
          };
        }, {});
      },
      "due date": () => {
        let response: ProjectGroup = {};
        response = this.tasks.reduce((prev, task): ProjectGroup => {
          if (!task.expiredAt) {
            return {
              ...prev,
              "no date": [...prev["no date"], task],
            };
          } else {
            const date = new Date(task.expiredAt);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (date > currentDate) {
              if (!prev[formatDate(date)]) {
                return {
                  ...prev,
                  [formatDate(date)]: [task],
                };
              } else {
                const key = formatDate(date);
                return {
                  ...prev,
                  [key]: [...prev[key], task],
                };
              }
            } else {
              return prev["over date"]
                ? { ...prev, "over date": [...prev["over date"], task] }
                : { ...prev, "over date": [task] };
            }
          }
        }, response);
        return {
          ...response,
        };
      },
    };
    return handlePageProject[`${group}`]();
  }
  public getTitle(group: string) {
    const handleProjectTitle: {
      [key: string]: () => string[];
    } = {
      default: () => {
        if(this.type == "project"){
          return (
            (this.sections &&
              this.sections.reduce(
                (prev, section) => [...prev, section.name],
                [this.projectCode.substring(0, this.projectCode.indexOf("-"))]
              )) ||
            []
          );
        }
        else{
          let titles: { [key: string]: boolean } = {};
          titles = this.tasks.reduce((prev, task) => {
            
              const date = new Date(task.expiredAt);
              const currentDate = new Date();
              currentDate.setHours(0, 0, 0, 0);
              if (date > currentDate) {
                if (!titles[`${task.expiredAt}`]) {
                  return {
                    ...prev,
                    [`Today-${formatDate(new Date(date))}`]: true,
                  };
                } else {
                  return {
                    ...prev,
                  };
                }
              } else {
                return titles["over date"]
                  ? { ...titles }
                  : { ...titles, "due date": true };
              }
            
          }, {});
          return Object.keys(titles);
        }
      },
      priority: () => {
        return this.priority.map((item) => item.name);
      },
      "due date": () => {
        let titles: { [key: string]: boolean } = {};
        titles = this.tasks.reduce((prev, task) => {
          if (!task.expiredAt) {
            if (titles["no date"]) {
              return {
                ...prev,
              };
            }
            return {
              ...prev,
              "no date": true,
            };
          } else {
            const date = new Date(task.expiredAt);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (date > currentDate) {
              if (!titles[`${task.expiredAt}`]) {
                return {
                  ...prev,
                  [formatDate(new Date(date))]: true,
                };
              } else {
                return {
                  ...prev,
                };
              }
            } else {
              return titles["over date"]
                ? { ...titles }
                : { ...titles, "due date": true };
            }
          }
        }, {});
        return Object.keys(titles);
      },
    };
    return handleProjectTitle[`${group}`];
  }
}

export default useProjectPage;
