import React from 'react';
import logo from '../../assets/logo.png'
const LogoAuth = () => {
    return (
        <div className='flex items-center gap-2'>
            <img srcSet={logo} className='w-[60px]'></img>
            <h4 className='font-semibold text-primary text-[24px]'>todone</h4>
        </div>
    );
};

export default LogoAuth;