import { useRef } from "react";
import useTheme from "../../hooks/useTheme";
import { bgColor,  textColor } from "../../utils/theme";
import { state } from "../../redux/store";
import { useSelector } from "react-redux";


const TaskAdd = ({className,onclick}: {className?: string,onclick: () => void}) => {
    console.warn("show");
    
    const  {theme}= useTheme();
    const isDragging = useSelector((state: state) => state.status.isDragging);
    const buttonAddTask = useRef<HTMLDivElement>(null);
    const getElement = () => {
        if(buttonAddTask.current){

            const element = buttonAddTask.current;
            const iconTaskButton  : HTMLSpanElement | null = element.querySelector('.icon-task-button');
            const contentTaskButton : HTMLSpanElement | null = element.querySelector('.content-task-button');
            if(iconTaskButton && contentTaskButton){
                return {
                    element,iconTaskButton,contentTaskButton
                }
            }
            
        }
        return null;
    }
    const handleHoverButton = () => {
        if(isDragging){
            return;
        }
        const elements = getElement();
        if(elements){
            const {element,iconTaskButton,contentTaskButton} = elements;
            element.classList.add('transition-all');
            iconTaskButton.classList.add('text-white');
            iconTaskButton.classList.add(`${bgColor[theme.color]}`);
            contentTaskButton.classList.add(`${textColor[theme.color]}`);
        }
    }
    const handleHoverOutButton = () => {
        if(isDragging){
            return;
        }
        const elements = getElement();
        if(elements){
            const {element,iconTaskButton,contentTaskButton} = elements;
            element.classList.add('transition-all');
            iconTaskButton.classList.remove('text-white')
            iconTaskButton.classList.add(`${textColor[theme.color]}`);
            iconTaskButton.classList.remove(`${bgColor[theme.color]}`);
            contentTaskButton.classList.remove(`${textColor[theme.color]}`);
        }
    }
    return (
        <div>
            <div ref={buttonAddTask} className='mb-2 flex gap-2 px-2 task-button py-2 cursor-pointer' onMouseLeave={ handleHoverOutButton} onMouseEnter={handleHoverButton } onClick={onclick}>
                <span className={`w-[22px] h-[22px] flex justify-center items-center icon-task-button  ${textColor[theme.color]} rounded-full ${className}`} >
                    <i className="fa-solid fa-plus"></i>
                </span>
                <span className={`text-[#ccc] font-semibold content-task-button ${className}`}>
                    Add task
                </span>
            </div>
        </div>
    );
};

export default TaskAdd;