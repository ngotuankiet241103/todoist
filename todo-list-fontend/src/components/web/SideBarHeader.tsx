import React, { useLayoutEffect } from 'react';
import FrameSideBar from './FrameSideBar';
import MenuList from './MenuList';
import Search from './Search';
import User from './User';
import useOpenModal from '../../hooks/useOpenModal';
import FormTask from '../form/FormTask';
import { useSelector } from 'react-redux';
import { state } from '../../redux/store';
import MyProject from './MyProject';
import SearchContainer from '../search/SearchContainer';
import useAddTask from '../../hooks/useAddTask';
import useOpenBoxSearch from '../../hooks/useOpenBoxSearch';
import { bgColor, hoverMode, sidebarMode, textColor } from '../../utils/theme';
import useTheme from '../../hooks/useTheme';
import useCreateProject from '../../hooks/useCreateProject';
import ProjectAdd from './ProjectAdd';

export type MenuItem = {
    path: string,
    item: string
    icon: string,
}

export type Menu = MenuItem[];
let menu : Menu = []
const SideBarHeader = ({onClick}: {onClick?: () => void}) => {
    const {isShow,handleToggleModal: showModel} = useAddTask();
    const inbox = useSelector((state: state) => state.project.inbox);
    const {isOpen,closeBox}  = useOpenBoxSearch();
    const {theme} = useTheme();
    const {project,toggleProject} = useCreateProject();
    menu = [
        {
            path: `/app/project/${ inbox ?inbox.code : ""}`,
            item: "Inbox",
            icon: `fa-solid fa-inbox`
        },
        {
            path: "/app/today",
            item: "Today",
            icon: `fa-solid fa-calendar-week`
        },
        {
            path: "/app/upcoming",
            item: "Upcoming",
            icon: `fa-regular fa-calendar-days`
        },
        {
            path: "/app/filters-labels",
            item: "Filters&Labels",
            icon: `fa-solid fa-filter`
        }
    ]
    
    useLayoutEffect(() => {
       
    } ,[inbox])
    
    return ( 
        <>
       <div className={`max-sm:fixed bg-gray-200 h-[100vh] inset-0`}>
        <FrameSideBar>
            <div className='max-sm:flex justify-end px-2 md:hidden'>
                <span className='text-[18px]' onClick={onClick}><i className="fa-solid fa-xmark"></i></span>
            </div>
            <div className='mb-4'>
                    <User></User>
            </div>
            <div className={`mb-2 flex gap-2 px-2  hover:bg-gray-100 transition-all py-2`}>
                    <span className={`w-[22px] h-[22px] flex justify-center items-center ${bgColor[theme.color]}  text-white rounded-full`} >
                        <i className="fa-solid fa-plus"></i>
                    </span>
                    <span className={`${textColor[theme.color]} font-semibold`} onClick={() => showModel()}>
                        Add task
                    </span>
                </div>
                <Search onClick={closeBox}></Search>
                <MenuList menu={menu}></MenuList>
                <MyProject/>
            </FrameSideBar>
       </div>
        <FormTask isList={true} onclick = {() => showModel()} visibile={isShow} isFixed={true}></FormTask>
        {isOpen && <SearchContainer></SearchContainer>}
        {project.isAddProject && <ProjectAdd  index={project.index} clickCancle={toggleProject}/>}
       </>
    );
};

export default SideBarHeader;