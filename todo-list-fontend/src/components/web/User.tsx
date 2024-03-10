import React from 'react';
import { useSelector } from 'react-redux';
import { state } from '../../redux/store';
import AvatarUser from './AvatarUser';
import { Profile } from '../../redux/reducer/userSlice';
import useExpandMenu from '../../hooks/useExpandMenu';

const User = () => {
    const user = useSelector((state : state) => state.user)
   const profile : Profile =  user.profile 
   const {handleExpandMenu} = useExpandMenu();
    return (
        <>
        {profile &&
            <div className='flex px-2 justify-between'>
                <AvatarUser avatar={profile.avatar} name={profile.name} ></AvatarUser>
                <div className='flex items-center gap-4'>
                    <span><i className="fa-regular fa-bell"></i></span>
                    <span onClick={handleExpandMenu}><i className="fa-solid fa-table-columns"></i></span>
                </div>
            </div>
        }
        </>
       
    );
};

export default User;