import React, { useEffect, useState } from 'react';
import ViewFilter from '../filter/ViewFilter';
import useOpenModal from '../../hooks/useOpenModal';
import { ProjectGroupKey } from '../../hooks/useTasks';
import useChangeView from '../../hooks/useChangeView';
import { Filter } from '../../redux/reducer/stateSlice';
import { TaskSliceKey } from '../../redux/reducer/tasksSlice';
type BaseWeb  = {
    
    children: React.ReactNode,
    label: string,
    page: TaskSliceKey
}
const BaseWeb = ({page,children,label} : BaseWeb) => {
    const { isShow, handleToggleModel } = useOpenModal(false);
    const {state,handleChangeGroup,handleChangeFilter} = useChangeView(label);
    const [group,setGroup] = useState<ProjectGroupKey>(state.group);
    const [filter,setFilter] = useState<Filter>(state.filter);
    const [isFilter,setIsFilter] = useState(false);
    const handleClick = () => {
        if(isShow) {
            handleToggleModel();
            if(group != state.group){
                handleChangeGroup(group);
            }
            if(isFilter) {
                console.log(filter);
                setIsFilter(false);
                handleChangeFilter(filter);
                
            }
        }
    }
 
    useEffect(()=> {
        function log(event : React.KeyboardEvent){
            if(event.key === 'Escape'){
                if(isShow) {
                    handleToggleModel();
                    if(group != state.group){
                        handleChangeGroup(group);
                    }
                    if(isFilter) {
                        console.log(filter);
                        setIsFilter(false);
                        handleChangeFilter(filter);
                        
                    }
                }
            }
          }
        window && window.addEventListener("keyup", log);
    },[])
    return (
        <div className="py-4 w-full px-4" onClick={handleClick} >
            <div className="flex justify-end mb-2 px-2 ">
              <ViewFilter filter={{filter,setFilter}} setIsFilter={setIsFilter} group={{group,setGroup}} type={page} label={label} onClick={handleToggleModel} isShow={isShow}></ViewFilter>
            </div>
            {children}
        </div>
    );
};

export default BaseWeb;