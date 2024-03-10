
import IconMenu from './IconMenu';
import { MenuItem } from './SideBarHeader';
import { NavLink } from 'react-router-dom';

const MenuItemC = ({path,item,icon}: MenuItem) => {
    const property  = "p-2 text-[16px] flex gap-4 items-center";
    return (
        <div className='menu-hover'>
            <NavLink to={path} className={({isActive}) => isActive ? `bg-fill ${property} text-primary ` :  `${property}`}>
                <IconMenu icon={icon}></IconMenu>
                <span>{item}</span>

            </NavLink>
        </div>
    );
};

export default MenuItemC;