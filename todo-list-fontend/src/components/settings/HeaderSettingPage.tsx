
import { useNavigate } from 'react-router-dom';

const HeaderSettingPage = ({title}: {title: string}) => {
    const redirect = useNavigate();
    const handleCloseSetting = () => {
        const url = sessionStorage.getItem("prev");
        if(url){
            redirect(url);
        }
        
    }
    return (
        <div className='flex justify-between px-2 py-3 border-b-2 border-gray-400'>
            <h1 className='font-semibold text-[20px'>{title}</h1>
            <span onClick={handleCloseSetting} className='font-semibold'><i className="fa-solid fa-xmark"></i></span>
        </div>
    );
};

export default HeaderSettingPage;