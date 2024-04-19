
import ProjectList from './ProjectList';
import { useSelector } from 'react-redux';
import { state } from '../../redux/store';
import useCreateProject from '../../hooks/useCreateProject';
import useTheme from '../../hooks/useTheme';
import { hoverMode } from '../../utils/theme';
import { useTranslation } from 'react-i18next';

const MyProject = () => {
    const projects = useSelector((state: state) => state.project.myProject);
    const {toggleProject}  = useCreateProject();
    const {theme} = useTheme();
    const {t} = useTranslation();
    return (
       <>
        <div className='relative'>
            <div className={`rounded-md ${hoverMode[theme.mode]()} transition-all py-1 px-2 flex justify-between items-center`}>
                <span>{t(`sidebar.myProject`)}</span>
                <div className='flex gap-2'>
                    <span className='text-[24px]' onClick={toggleProject}>+</span>
                    <span></span>
                </div>
            </div>
           
            {projects && projects.length >0 &&  <ProjectList projects={projects}></ProjectList>}
            
        </div>
        
       </>
    );
};

export default MyProject;