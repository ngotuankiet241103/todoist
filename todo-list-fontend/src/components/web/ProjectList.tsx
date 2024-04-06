import { ProjectInfo } from "../../redux/reducer/projectSlice";
import ProjectItem from "./ProjectItem";

const ProjectList = ({ projects }: { projects: ProjectInfo[] }) => {
  return (
    <>
      <div className="">
        {projects.length > 0 &&
          projects.map((project,index) => (
            <ProjectItem
              index={index}
              key={project.id}
              project={project}
            ></ProjectItem>
          ))}
      </div>
    </>
  );
};

export default ProjectList;
