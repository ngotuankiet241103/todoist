
import { useState } from 'react';
import { Label } from '../../redux/reducer/labelSlice';
import useTheme from '../../hooks/useTheme';
import { hoverMode } from '../../utils/theme';

type LabelTaskItem = {
    className?: string, 
    label: Label,isSelected: boolean,
    index: number
    onClick: (label: Label,index: number,isExist: boolean) => void
}
const LabelTaskItem = ({label,className,isSelected,index,onClick}: LabelTaskItem) => {
    const [isCheck,setCheck] = useState(isSelected);
    const {theme} = useTheme();
    const handleCheckLabel = (label: Label,index: number,isExist: boolean) => {
        onClick(label,index,isExist)
        setCheck(!isCheck)
    }
    return (
        <div className={`bg-gray p-2 flex justify-between cursor-pointer ${hoverMode[theme.mode]()}  ${className}`} onClick={() => handleCheckLabel(label,index,isCheck)} >
            <div className='flex gap-2'>
                <span><i className="fa-solid fa-tag"></i></span>
                <span>{label.name}</span>
            </div>
            <input type='checkbox' checked={isCheck} />
        </div>
    );
};

export default LabelTaskItem;