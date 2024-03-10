import { months } from "../../constaints/month";


const TaskTime = ({date} : {date: Date}) => {
    
   
    
    const month = months[date.getMonth()];
    const day =  date.getDate();
      
    
    return (
       <>
        <div className='flex gap-1 text-red-500 items-center'>
            <span><i className="fa-solid fa-calendar-day"></i></span>
            <span>{day}</span>
            <span>{month}</span>
        </div>
       </>
    );
};

export default TaskTime;