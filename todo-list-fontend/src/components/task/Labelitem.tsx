import React from 'react';

const Labelitem = ({name} : {name: string}) => {
    return (
        <div className='flex gap-2'>
            <span><i className="fa-solid fa-tag"></i></span>
            <span>{name}</span>
        </div>
    );
};

export default Labelitem;