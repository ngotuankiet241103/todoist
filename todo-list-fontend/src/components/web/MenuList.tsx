
import { Menu } from './SideBarHeader';
import MenuItemC from './MenuItemC';

type MenuList = {
    menu: Menu | []
}
const MenuList = (props : MenuList) => {
    
    return (
        <>
        {props.menu.length > 0 && props.menu.map((menu,index) => <MenuItemC  key={index} icon={menu.icon} path={menu.path} item={menu.item}></MenuItemC>)}
        </>
    );
};

export default MenuList;