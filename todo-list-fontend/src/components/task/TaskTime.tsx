import { months } from "../../constaints/month";
import useTheme from "../../hooks/useTheme";
import { textColor } from "../../utils/theme";


const TaskTime = ({date} : {date: Date}) => {
    const {theme} = useTheme();
    const month = months[date.getMonth()];
    const day =  date.getDate();
    return (
       <>
        <div className={`flex gap-1 ${textColor[theme.color]} items-center`}>
            <span><i className="fa-solid fa-calendar-day"></i></span>
            <span>{day}</span>
            <span>{month}</span>
        </div>
       </>
    );
};

export default TaskTime;