
import { useSelector } from 'react-redux';
import { state } from '../redux/store';
import LabelList from '../components/task/LabelList';
import { postMethod } from '../helper/api';
import { updateLabel } from '../redux/reducer/labelSlice';
import { useDispatch } from 'react-redux';

const FilterPage = () => {
    const label = useSelector((state: state) => state.label);
    const dispatch = useDispatch();
    const handleAddLabel = (value: string) => {
        async function addLabel<T>(api:string,data: T){
            try {
                const response = await postMethod(api,data);
                if(response && response.status === 200){
                    dispatch(updateLabel(response.data));
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        addLabel("/labels/add",{name: value})
    }
    console.log(label);
    
    return (
        <div className='w-[800px] mx-auto py-4'>
            <LabelList onClick={handleAddLabel} labels={label}></LabelList>
        </div>
    );
};


export default FilterPage;