import React from 'react';
type Label = {
    classNames: string,
    htmlfor: string,
    children: React.ReactNode | string
}
const Label = ({classNames,htmlfor,children}:Label) => {
    return (
        <label htmlFor={htmlfor} className={`${classNames}`}>{children}</label>
    );
};

export default Label;