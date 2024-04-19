import useTheme from "../../hooks/useTheme";
import { ProjectInfo, setProjectDetail } from "../../redux/reducer/projectSlice";
import { NavLink } from "react-router-dom";
import { bgMode, hoverMode, sidebarMode, textColor, textMode } from "../../utils/theme";
import React, { useLayoutEffect, useRef, useState } from "react";
import useOpenModal from "../../hooks/useOpenModal";
import useCreateProject from "../../hooks/useCreateProject";
import { useDispatch } from "react-redux";
import { deleteMethod } from "../../helper/api";
import useRender from "../../hooks/useRender";

const ProjectItem = ({ project,index }:   {index: number,project: ProjectInfo}) => {
  const {name,code,task_all} = project
  const { theme } = useTheme();
  const [isHover, setHover] = useState(false);
  const [isHoverMenu, setHoverMenu] = useState(false);
  const { isShow, handleToggleModel } = useOpenModal(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const {setIndex,toggleProject} = useCreateProject(index);
  const dispatch = useDispatch();
  const  {handleRender} = useRender();
  const onMoveIn = () => {
    setHover(true);
  };
  const onMoveOut = () => {
    setHover(false);
  };
  const openMenuProject = (e: React.MouseEvent<HTMLElement> | undefined) => {
    if (e && isHoverMenu) {
      e.stopPropagation();
      
    }
  };
  const handleOpenMenu = (e: React.MouseEvent<HTMLElement> | undefined) => {
    if (e) {
      const x = e.clientX;
      const y = e.clientY;
      setPosition({ x, y });
      handleToggleModel();
    }
  };
  const createProject = (type: "above" | "below") => {
    alert(index)
    type === "above" ? setIndex(index) : setIndex(index + 1);
    handleToggleModel();
     
  }
  const editProject = (project : ProjectInfo) => {
    
    dispatch(setProjectDetail(project));
    toggleProject();
    handleToggleModel();
  }
  const handleDeleteProject = (project: ProjectInfo) => {
    async function deleteProject<T>(url:string,data: T){
      try {
        const response = await deleteMethod(url,data);
        if(response && response.status === 200){
          handleRender();
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    const data ={
      id: project.id
    };
    deleteProject("/projects",data);
  }
  return (
    <>
      <NavLink
        to={`/app/project/${code}`}
        className={({ isActive }) =>
          isActive ? `bg-fill ${textColor[theme.color]} ` : ``
        }
        onClick={openMenuProject}
      >
        <div
          className={`flex justify-between items-center px-4 menu-hover relative ${hoverMode[theme.mode]()}`}
          onMouseEnter={onMoveIn}
          onMouseLeave={onMoveOut}
        >
          <span>{name}</span>
          {!isHover ? (
            <span className="px-2 py-1">{task_all}</span>
          ) : (
            <span
              className="px-2 py-1"
              onMouseEnter={() => setHoverMenu(true)}
              onMouseLeave={() => setHoverMenu(false)}
              onClick={handleOpenMenu}
            >
              <i className="fa-solid fa-ellipsis"></i>
            </span>
          )}
        </div>
      </NavLink>
        {isShow && <MenuProjectItem onDelete={() => handleDeleteProject(project)} editProject={() => editProject(project)} onAddAbove={() => createProject("above")} onAddBelow={() => createProject("below")} position={position} onClose={handleToggleModel}/>} 
       
    </>
  );
};
type MenuProjectItem = {
  onClose: () => void;
  position: {
    x: number;
    y: number;
  },
  onAddAbove: () => void,
  onAddBelow: () => void,
  editProject: () => void
  onDelete: () => void
};
const MenuProjectItem = ({ onClose, position,onAddAbove,onAddBelow,editProject,onDelete }: MenuProjectItem) => {
  const boxMenu = useRef<HTMLDivElement>(null);
  const {theme} = useTheme();
  useLayoutEffect(() => {
    if (boxMenu.current) {
      const element = boxMenu.current;
      element.style.top = `${position.y - 60}px`;
      element.style.left = `${position.x + 40}px`;
    }
  }, []);
  
  return (
    <div className="fixed z-20 inset-0 w-[100vh]" onClick={onClose}>
      <div
        ref={boxMenu}
        onClick={(e) => e.stopPropagation()}
        className={`absolute right-[-100%] text-black top-[-120px] w-[260px] h-[300px] ${textMode[theme.mode]()} rounded-lg ${sidebarMode[theme.mode]()} box-calen`}
      >
        <MenuEditItem title="Add project above" onClick={onAddAbove}/>
        <MenuEditItem title="Add project below" onClick={onAddBelow}/>
        <MenuEditItem title="Edit " onClick={editProject}/>
        <MenuEditItem title="Delete " onClick={onDelete}/>
        <MenuEditItem title="Close" onClick={onClose}/>
      </div>
    </div>
  );
};
const MenuEditItem = ({title,onClick}:{title: string,onClick: () => void}) => {
  const {theme} = useTheme();
  return (
    <div className={`px-2 py-1 ${hoverMode[theme.mode]()}`} onClick={onClick}>{title}</div>
  );
}
export default ProjectItem;
