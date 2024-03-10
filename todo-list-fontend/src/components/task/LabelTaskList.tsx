import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { state } from '../../redux/store';
import LabelTaskItem from './LabelTaskItem';
import { Label, updateLabel } from '../../redux/reducer/labelSlice';
import requestApi from '../../helper/api';
import { useDispatch } from 'react-redux';
type LabelTaskList = {
    className?: string,
    labelSelect: Label[],
    onClick: (label: Label,index: number,isExist: boolean) => void
}
const LabelTaskList = ({className,labelSelect,onClick}: LabelTaskList) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const labels = useSelector((state: state) => state.label);
    const [labelCreated,setLabelCreated] = useState("");
    const dispatch = useDispatch();
    const [labelCurrent,setLabelCurrent] = useState<Label[]>(labels);
    const handleFindLabel = (value: string) => {
        const arr = labels.filter(label => label.name.includes(value));
        if(arr.length < 1){
            setLabelCurrent(labels);
            setLabelCreated(value);
        }
        else{
            setLabelCreated("");
            setLabelCurrent(arr);
        }
    }
    const createLabel = async (value: string) => {
        try {
            const response = await requestApi("/labels/add","POST",{name: value});
            if(response.status === 200){
                if(inputRef.current){
                    inputRef.current.value = ""
                }
                dispatch(updateLabel(response.data));
                setLabelCreated("")
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <div className={`py-1 rounded-lg ${className}`} onClick={(e) => e.stopPropagation()}>
            <div className='px-2'>
                <input ref={inputRef} onChange={(e) => handleFindLabel(e.target.value.trim())} className='rounded-lg px-2 py-1 w-full outline-none border border-gray-400' placeholder='Type a label'/>
            
            </div>
            {labelCurrent.length > 0 && labelCurrent.map((label,index) => <LabelTaskItem index={index} onClick={onClick}  isSelected={selectedLabel(labelSelect,label.id)} key={label.id} label={label}></LabelTaskItem>)}
            {labelCreated && <div className='px-2 hover:bg-gray-300 transition-all cursor-pointer' onClick={() => createLabel(labelCreated)}>Create +  "{labelCreated}</div>}
        </div>
        
    );
};
const selectedLabel  = (labelSelect: Label[],id: number): boolean => {
    console.log(labelSelect);
    console.log(id);
    
    return labelSelect.some(label => label.id === id);
}
export default LabelTaskList;