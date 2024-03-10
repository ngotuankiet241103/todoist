

const IconMenu = ({icon, className,onClick} : {icon: string,className?: string,onClick?:() => void}) => {
    return (
        <span className={`text-[14px] ${className}`} onClick={onClick ? onClick : undefined}>
        
            <i className={icon}></i>
        </span>
    );
};

export default IconMenu;