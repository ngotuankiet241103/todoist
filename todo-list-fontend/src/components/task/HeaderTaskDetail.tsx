import React from 'react';

const HeaderTaskDetail = ({onClick}: {onClick: () => void}) => {
    return (
        <div className='flex' >
            <span className='text-[20px]' onClick={onClick}><i className="fa-solid fa-xmark"></i></span>
        </div>
    );
};

export default HeaderTaskDetail;