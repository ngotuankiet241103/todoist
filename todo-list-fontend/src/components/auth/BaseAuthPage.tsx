import React from 'react';
import calendar from '../../assets/calendar.png'

const BaseAuthPage = ({children} : {children: React.ReactNode}) => {
    return (
        <div className='flex gap-4'>
            <div className='w-[40%] '>

                {children}
            </div>
           <div className='flex-1'>
                <img className='w-full h-[600px]'  srcSet={calendar} />
           </div>
        </div>
    );
};

export default BaseAuthPage;