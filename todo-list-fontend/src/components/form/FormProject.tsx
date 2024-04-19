import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { state } from '../../redux/store';
import { ProjectInfo } from '../../redux/reducer/projectSlice';
import requestApi from '../../helper/api';
import IconMenu from '../web/IconMenu';
import useOpenModal from '../../hooks/useOpenModal';
import { Tag } from './FormTask';
import BoxTitle from './BoxTitle';
import { showTag } from '../../utils/tag';
import useTheme from '../../hooks/useTheme';
import {  hoverMode, sidebarMode } from '../../utils/theme';
export type SectionItem = {
    id: number,
    name: string,
    code: string
}
type Section = SectionItem[]

type formProject = {
    isInbox?: boolean
    tag?: Tag,
    onclick:(project?: ProjectInfo, 
    section?: SectionItem) => void,
}
const FormProject = ({isInbox = true,tag,onclick} : formProject ) => {
    const project = useSelector((state: state) => state.project)
    const {isShow,handleToggleModel} = useOpenModal(false);
    const {theme} = useTheme();
    const handleClick = (project?: ProjectInfo, 
        section?: SectionItem) => {
        
            
        onclick(project,section);
        handleToggleModel();
    }
    useEffect(() => {
        if(isInbox && project.inbox){
           onclick(project.inbox);
        }
    },[])
   
    return (
        <div className='relative'>
            <BoxTitle isBorder={false} onClick={handleToggleModel} >
                 {tag && showTag(tag)}
            </BoxTitle>
            {isShow && 
                <div className={`absolute w-[200px] z-10 py-2 top-[40px] left-0 box-calen ${sidebarMode[theme.mode]()} rounded-lg`}>
                    <div className={`${hoverMode[theme.mode]()} flex justify-between items-center px-2`}>
                        {project.inbox && <ProjectItem onClick={handleClick} project={project.inbox}></ProjectItem>}
                        {isInbox && <IconMenu className='text-primary text-[14px]' icon='fa-solid fa-check'></IconMenu>}
                    </div>
                    <div className=''>
                        <div className='font-semibold px-2'>My projects</div>
                        {project.myProject.length > 0 && project.myProject.map(project => <ProjectItem onClick={handleClick} key={project.id} project={project} ></ProjectItem>)}
                    </div>
                </div>
            }
        </div>
    );
};

const ProjectItem = ({project,onClick} : {project: ProjectInfo,onClick:(project?: ProjectInfo, section?: SectionItem) => void}) => {
    const {theme} = useTheme();
    return (
        <div>
           <div className={`cursor-pointer py-1 px-4 ${hoverMode[theme.mode]()}`} onClick={() => onClick(project)}># {project.name}</div>
           <div className=''>
            <SectionList onClick={onClick} project={project}></SectionList>
           </div> 
        </div>
    );

}
const SectionList = ({project,onClick} : {project: ProjectInfo,onClick:(project?: ProjectInfo, section?: SectionItem) => void}) => {
    const [sections,setSection] = useState<Section>();
    
    useEffect(() => {
        const getSections = async () => {
            try {
                const response = await requestApi(`/sections/${project.code}`,"GET")
                if(response.status === 200){
                    setSection(response.data);
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        getSections()
    },[])
    return (
        <>
            {sections && sections.length > 0 && sections.map(section => <SectionItem onClick={() => onClick(project,section)} section={section} ></SectionItem>)}
        </>
    );
}
const SectionItem = ({section,onClick} : {section: SectionItem, onClick: () => void}) => {
    const {theme} = useTheme();
    return (
        <>
            <span className={`${hoverMode[theme.mode]()} pl-10 pr-2 flex gap-2 items-center`} onClick={onClick}>
                <IconMenu className='text-[14px]' icon="fa-regular fa-square"></IconMenu>
                {section.name}
            </span>
        </>
    );
}
export default FormProject;