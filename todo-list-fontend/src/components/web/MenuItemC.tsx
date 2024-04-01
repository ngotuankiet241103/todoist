
import useTheme from '../../hooks/useTheme';
import {  hoverMode, textColor } from '../../utils/theme';
import IconMenu from './IconMenu';
import { MenuItem } from './SideBarHeader';
import { NavLink } from 'react-router-dom';

const MenuItemC = ({path,item,icon}: MenuItem) => {
    const property  = "p-2 text-[16px] flex gap-4 items-center";
    const {theme} = useTheme();
    return (
        <div className={`${hoverMode[theme.mode]()}`}>
            <NavLink to={path} className={({isActive}) => isActive ? `bg-fill ${property} ${textColor[theme.color]} ` :  `${property}`}>
                <IconMenu icon={icon}></IconMenu>
                <span>{item}</span>

            </NavLink>
        </div>
    );
};

export default MenuItemC;