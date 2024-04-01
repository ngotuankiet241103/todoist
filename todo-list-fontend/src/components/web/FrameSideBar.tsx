import React from 'react';
import useTheme from '../../hooks/useTheme';
import { sidebarMode } from '../../utils/theme';

const FrameSideBar= ({children} : {children: React.ReactNode}) => {
    const {theme} = useTheme();
    return (
        <div className={`md:min-w-[280px] max-sm:max-w-[240px] side-bar  ${sidebarMode[theme.mode]()} py-4 px-2 h-[100vh]`} >
            {children}
        </div>
    );
};

export default FrameSideBar;