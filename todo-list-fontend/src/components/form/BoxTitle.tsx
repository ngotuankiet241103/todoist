import React from 'react';
import useTheme from '../../hooks/useTheme';
import { hoverMode } from '../../utils/theme';
type BoxTile = {
    isBorder: boolean,
    onClick?: () => void,
    className?: string
    children: React.ReactNode
}
const BoxTitle = ({isBorder,className,onClick,children}: BoxTile ) => {
    const {theme} = useTheme();
    return (
        <div
        className={`px-2 py-1 rounded-lg border ${isBorder ? 'border-gray-400' : ''}  flex gap-2 items-center  ${hoverMode[theme.mode]()} ${className}`}
        onClick={onClick ? () => onClick() : undefined}>
            {children}
        </div>
    );
};

export default BoxTitle;