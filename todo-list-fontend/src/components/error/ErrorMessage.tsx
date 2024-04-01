import React from 'react';

const ErrorMessage = ({message}: {message: string}) => {
    return (
        <span className='text-red-500 text-[16px]'>
            {message}
        </span>
    );
};

export default ErrorMessage;