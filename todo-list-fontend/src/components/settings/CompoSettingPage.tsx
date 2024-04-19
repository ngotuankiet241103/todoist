import React from 'react';
type CompoSettingPage  = {
    title: string
    children: React.ReactNode
}
const CompoSettingPage = ({title,children} :CompoSettingPage) => {
    return (
        <div>
            <h3 className='mb-1 font-semibold text-[16px]'>{title}</h3>
            {children}
        </div>
    );
};

export default CompoSettingPage;