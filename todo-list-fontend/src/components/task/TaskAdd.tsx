

const TaskAdd = ({className,onclick}: {className?: string,onclick: () => void}) => {
    console.log("3124124");
    
    
    return (
        <div className={`${className}`}>
            <div className='mb-2 flex gap-2 px-2 task-button py-2 cursor-pointer' onClick={onclick}>
                <span className='w-[22px] h-[22px] flex justify-center items-center icon-task-button text-primary   rounded-full' >
                    <i className="fa-solid fa-plus"></i>
                </span>
                <span className=' text-[#ccc] font-semibold content-task-button'>
                    Add task
                </span>
            </div>
        </div>
    );
};

export default TaskAdd;