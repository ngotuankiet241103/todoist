
import { Outlet, useNavigate } from 'react-router-dom';
import SidebarSetting from '../components/web/SidebarSetting';
import { useMemo } from 'react';
import { bgMode } from '../utils/theme';
import useTheme from '../hooks/useTheme';

const SettingPage = () => {
    const redirect = useNavigate();
    const {theme} = useTheme();
    const handleCloseSetting = () => {
        const url = sessionStorage.getItem("prev");
        if(url){
            redirect(url);
        }
        
    }
    return (
        <div onClick={handleCloseSetting} className='fixed  inset-0 flex justify-center py-4 bg-[rgba(0,0,0,0.25)]'>
            <div onClick={(e) => e.stopPropagation()} className={`w-[1000px] ${bgMode[theme.mode]() === "bg-[#1E1E1E]   " ? 'bg-[rgb(30,30,30)]' : 'bg-white' } rounded-lg overflow-hidden flex`}>
                <SidebarSetting></SidebarSetting>
                <div className={`${bgMode[theme.mode]()} w-full p-4`}>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;