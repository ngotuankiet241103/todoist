
import ProjectList from './ProjectList';
import { useSelector } from 'react-redux';
import { state } from '../../redux/store';
import { DragDropContext } from 'react-beautiful-dnd';

const MyProject = () => {
    const projects = useSelector((state: state) => state.project.myProject);
    
    return (

        <div className='relative'>
            <div className='rounded-md menu-hover transition-all py-1 px-2 flex justify-between items-center'>
                <span>My projects</span>
                <div className='flex gap-2'>
                    <span className='text-[24px]'>+</span>
                    <span></span>
                </div>
            </div>
           
            {projects && projects.length >0 &&  <ProjectList projects={projects}></ProjectList>}
           
        </div>
    );
};

export default MyProject;