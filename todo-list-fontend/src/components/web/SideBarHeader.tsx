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

export type MenuItem = {
    path: string,
    item: string
    icon: string,
}

export type Menu = MenuItem[];
let menu : Menu = []
const SideBarHeader = () => {
    const {isShow,handleToggleModel: showModel} = useOpenModal(false);
    const project = useSelector((state: state) => state.project);
    if(project.inbox){
        menu = [
            {
                path: `/app/project/${project.inbox.code}`,
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
    }
    useLayoutEffect(() => {
       
    } ,[project.inbox])
    
    return ( 
        <>
        <FrameSideBar>
           <div className='mb-4'>
                <User></User>
           </div>
           <div className='mb-2 flex gap-2 px-2 menu-hover py-2'>
                <span className='w-[22px] h-[22px] flex justify-center items-center bg-primary text-white rounded-full' >
                    <i className="fa-solid fa-plus"></i>
                </span>
                <span className='text-primary font-semibold' onClick={() => showModel()}>
                    Add task
                </span>
            </div>
            <Search></Search>
            <MenuList menu={menu}></MenuList>
            <MyProject/>
        </FrameSideBar>
        <FormTask onclick = {() => showModel()} visibile={isShow} isFixed={true}></FormTask>
       </>
    );
};

export default SideBarHeader;