import React from "react";
import { ProjectInfo } from "../../redux/reducer/projectSlice";
import ProjectItem from "./ProjectItem";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { getItemStyle } from "../task/TaskList";
import { getListStyle } from "../../utils/dragContext";

const ProjectList = ({ projects }: { projects: ProjectInfo[] }) => {
  return (
    <>
      <div className="">
        {projects.length > 0 &&
          projects.map((project, index) => (
            <ProjectItem
              key={project.id}
              id={project.id}
              name={project.name}
              code={project.code}
              task_all={project.task_all}
            ></ProjectItem>
          ))}
      </div>
    </>
  );
};

export default ProjectList;
