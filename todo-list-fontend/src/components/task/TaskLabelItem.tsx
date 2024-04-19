import { Label } from '../../redux/reducer/labelSlice';

const TaskLabelItem = ({label} : {label: Label}) => {
    return (
        <div className='flex  items-center'>
            <span className='mr-1'><i className="fa-solid fa-tag"></i></span>
            <span>{label.name}</span>
        </div>
    );
};

export default TaskLabelItem;