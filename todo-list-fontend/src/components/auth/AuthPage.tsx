import React from 'react';
import LogoAuth from './LogoAuth';
import { Outlet } from 'react-router-dom';

const AuthPage = () => {
    return (
        <div className='base-auth'>
            <div className='mb-4'>
                <LogoAuth />
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AuthPage;