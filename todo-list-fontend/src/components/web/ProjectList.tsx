import { ProjectInfo } from "../../redux/reducer/projectSlice";
import ProjectItem from "./ProjectItem";

const ProjectList = ({ projects }: { projects: ProjectInfo[] }) => {
  return (
    <>
      <div className="">
        {projects.length > 0 &&
          projects.map((project) => (
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
