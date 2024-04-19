import React from 'react';
import HeaderSettingPage from './HeaderSettingPage';
type frameSettingPage = {
    title: string,
    onClose?: () => void
    children: React.ReactNode
    isScroll: boolean
}
const FrameSettingPage = ({children,title,isScroll} : frameSettingPage ) => {
    return (
        <div className={`flex-1 px-2  relative ${isScroll ? 'overflow-y-scroll' : ''}`}>
            <HeaderSettingPage title={title}></HeaderSettingPage>
            <div className='py-4'>
                {children}
            </div>
        </div>
    );
};

export default FrameSettingPage;