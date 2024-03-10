import React from 'react';

const FrameSideBar= ({children} : {children: React.ReactNode}) => {
    return (
        <div className='md:w-[300px] bg-second py-4 px-2 md:h-[100vh]' >
            {children}
        </div>
    );
};

export default FrameSideBar;