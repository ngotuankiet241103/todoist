
import { useSelector } from 'react-redux';
import { state } from '../redux/store';
import storage from '../helper/storage';
import { Filter, updateState} from '../redux/reducer/stateSlice';
import { useDispatch } from 'react-redux';
import { ProjectGroupKey } from './useTasks';

const useChangeView = (label: string) => {
    let state  = useSelector((state: state) => state.status[`${label}`]);
    console.log(label);

    const dispatch = useDispatch();
    if(typeof state == "boolean"){
        state = {
            isList: false,
            group: "default",
            filter: {
                priorityCode: [],
                labelCode: []
            }
        }
    }
    if(state){
        const check =  Object.values(state).every(value => typeof value == "string");
        if(check){
            state = {
                isList: false,
                group: "default",
                filter: {
                    priorityCode: [],
                    labelCode: []
                }
            }
        }
    }
    if(!state){
        const value : {[key:string]: boolean} =  storage.get<{[key:string]: boolean}>(label) || {
            isList: false,
            group: "default",
            filter: {
                priorityCode: [],
                labelCode: []
            }
        };
      
        dispatch(updateState({key: label,value}))
    }
   
    
    const handleChangeView = () => {
        if(typeof state !== 'boolean'){
            
            storage.set(label,{isList: !state.isList,group: state.group,filter: state.filter});
            dispatch(updateState({key: label,value:  {...state,isList: !state.isList}}))
        }
    }
    const handleChangeGroup = (group: ProjectGroupKey) => {
        if(typeof state !== 'boolean'){
            storage.set(label,{isList: state.isList,group,filter: state.filter});
            
            dispatch(updateState({key: label,value:  {...state,group}}));
        }
    }
    const handleChangeFilter = (filter: Filter) => {
        if(typeof state !== 'boolean'){
            storage.set(label,{isList: state.isList,group: state.group,filter})
            dispatch(updateState({key: label,value:  {...state,filter}}));
        }
    }
   return {
    state,
    handleChangeView,
    handleChangeGroup,
    handleChangeFilter
   }
};

export default useChangeView;