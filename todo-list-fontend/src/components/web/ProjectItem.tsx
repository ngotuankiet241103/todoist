import { ProjectInfo } from "../../redux/reducer/projectSlice";
import { NavLink } from "react-router-dom";

const ProjectItem = ({ name, code, task_all }: ProjectInfo) => {
  return (
    <NavLink
      to={`/app/project/${code}`}
      className={({ isActive }) => (isActive ? `bg-fill text-primary ` : ``)}
    >
      <div className="flex justify-between px-4 menu-hover">
        <span>{name}</span>
        <span>{task_all}</span>
      </div>
    </NavLink>
  );
};

export default ProjectItem;
