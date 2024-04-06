import { useRef, useState } from "react";
import ButtonForm from "../button/ButtonForm";
import { postMethod, updateMethod } from "../../helper/api";
import { useNavigate } from "react-router-dom";
import { ProjectInfo, setAllProject, setProject } from "../../redux/reducer/projectSlice";
import useRender from "../../hooks/useRender";
import { useSelector } from "react-redux";
import { state } from "../../redux/store";
import { useDispatch } from "react-redux";

const ProjectAdd = ({clickCancle,index}: {clickCancle: () => void,index?: number}) => {
    const [isAllow,setAllow] = useState(false);
    const project =  useSelector((state : state) => state.project.detail);
  
    const projectName = useRef<HTMLInputElement>(null);
    const appProject = useSelector((state: state) => state.project);
    const redirect = useNavigate();
    const {handleRender} = useRender();
    const dispatch = useDispatch();
    const handleAddProject = () => {
        async function createProject<T>(url:string,data: T){
            try {
                const response = await postMethod(url,data);
                if(response && response.status === 200){
                    const project : ProjectInfo = response.data;
                    await redirect(`/app/project/${project.code}`);
                    dispatch(setAllProject([...appProject.all,project]))
                    if(index){
                        
                        const result = Array.from(appProject.myProject);
                        const removed = result.splice(index, appProject.myProject.length);
                        console.warn(removed);
                        
                        result.splice(index, 0,project,...removed);
                        console.warn(result);
                        
                        dispatch(setProject(result));
                    }
                    clickCancle();
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        async function updateProject<T>(url:string,data: T){
            try {
                const response = await updateMethod(url,data);
                if(response && response.status === 200){
                    const project : ProjectInfo = response.data;
                    await redirect(`/app/project/${project.code}`);
                    handleRender();
                    clickCancle();
                   
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        if(projectName.current && projectName.current.value){
            const name = projectName.current.value
            if(project) {
                const data ={
                    id: project.id,
                    name
                }
                updateProject("/projects",data);
            }
            else{
                const data = {
                    name
                }
                createProject("/projects/add",data);
            }
           
        }

    }
    const handleChangeProjectName = () => {
        if(projectName.current){
            const value = projectName.current.value;
            value ? setAllow(true) : setAllow(false);
        }
    }
    return (
        <div className='fixed inset-0  z-10 bg-[rgba(0,0,0,0.25)] flex justify-center items-center'>
            <div className='w-[500px] bg-white rounded-lg p-2'>
                <div className="flex flex-col gap-2">
                    <span>
                        Name project
                    </span>
                    <input onChange={handleChangeProjectName} ref={projectName} defaultValue={project ? project?.name :''} placeholder="Enter your project" type="name" className="py-1 px-2 rounded-lg outline-none border boder-gray-400"/>
                </div>
                <ButtonForm isReverse={true} title={`${project ? 'Save' : 'Add project'}`} isAllow={isAllow} clickCancle={clickCancle}  clickSubmit={handleAddProject}/>
            </div>
        </div>
    );
};

export default ProjectAdd;