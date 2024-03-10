import React from 'react';
type BoxTile = {
    isBorder: boolean,
    onClick?: () => void,
    className?: string
    children: React.ReactNode
}
const BoxTitle = ({isBorder,className,onClick,children}: BoxTile ) => {
    return (
        <div
        className={`px-2 py-1 rounded-lg border ${isBorder ? 'border-gray-400' : ''}  flex gap-2 items-center menu-hover  ${className}`}
        onClick={onClick ? () => onClick() : undefined}>
            {children}
        </div>
    );
};

export default BoxTitle;