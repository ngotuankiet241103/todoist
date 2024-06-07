import { useSelector } from 'react-redux';
import { state } from '../../redux/store';
import AvatarUser from './AvatarUser';
import { Profile } from '../../redux/reducer/userSlice';
import useExpandMenu from '../../hooks/useExpandMenu';
import useOpenModal from '../../hooks/useOpenModal';
import { deleteToken, getCookieValue, postMethod } from '../../helper/api';
import {  NavLink, useNavigate } from 'react-router-dom';
import { bgMode, hoverBox, hoverColor, hoverMenu, hoverMode } from '../../utils/theme';
import useTheme from '../../hooks/useTheme';

const User = () => {
   const user = useSelector((state : state) => state.user)
   const {isShow,handleToggleModel}= useOpenModal(false);
   const profile : Profile =  user.profile;
   const {theme} = useTheme();
   const {handleExpandMenu} = useExpandMenu();
   const  redirect = useNavigate();

   const handleLogout = () => {
        const logout = async () => {
            try {
                const refeshToken = getCookieValue("refresh_token");
                const response = await postMethod("/log-out",{"refresh_token": refeshToken});
                if(response && response.status === 200){
                    deleteToken();
                    redirect("/auth/login")
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        logout();
   }
   const handleOpenSettings = () => {
        sessionStorage.setItem("prev",window.location.pathname);
        handleToggleModel();
   }
    return (
        <>
        {profile &&
            <div className='flex  justify-between relative'>
                <AvatarUser  onClick ={handleToggleModel} info={profile} ></AvatarUser>
                <div className='flex items-center gap-4'>
                    <span><i className="fa-regular fa-bell"></i></span>
                    <span onClick={handleExpandMenu}><i className="fa-solid fa-table-columns"></i></span>
                </div>
                <div className={`${isShow ? 'block' : 'hidden'} overflow-hidden z-20 absolute top-[100%] left-0 w-[200px] rounded-lg ${bgMode[theme.mode]()} box-calen`}>
                    <NavLink to={"/app/settings/account"} ><div className={`px-3 py-2 ${hoverMenu[theme.mode](theme.color)} cursor-pointer`} onClick={handleOpenSettings} >Settings</div></NavLink>
                    <div className={`cursor-pointer px-3 py-2  ${hoverMenu[theme.mode](theme.color)}`} onClick={handleLogout}>Logout</div>
                </div>
            </div>
            
        }
       
        </>
       
    );
};

export default User;