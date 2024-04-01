import { useEffect, useLayoutEffect, useRef } from "react";
import useTheme from "../../hooks/useTheme";
import { bgColor, color, textColor } from "../../utils/theme";


const TaskAdd = ({className,onclick}: {className?: string,onclick: () => void}) => {
    const  {theme}= useTheme();
    const buttonAddTask = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        
    },[])
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
            <div ref={buttonAddTask} className='mb-2 flex gap-2 px-2 task-button py-2 cursor-pointer' onMouseLeave={handleHoverOutButton} onMouseEnter={handleHoverButton} onClick={onclick}>
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