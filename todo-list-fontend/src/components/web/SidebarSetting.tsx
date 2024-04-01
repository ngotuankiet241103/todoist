import useTheme from "../../hooks/useTheme";
import { sidebarMode } from "../../utils/theme";
import MenuList from "./MenuList";
import { Menu } from "./SideBarHeader";


let menu : Menu = []
const SidebarSetting = () => {
    const {theme} = useTheme();
    menu = [
        {
            path: `/app/settings/account`,
            item: "Account",
            icon: `fa-solid fa-inbox`
        },
        {
            path: "/app/settings/general",
            item: "General",
            icon: `fa-solid fa-calendar-week`
        },
        {
            path: "/app/settings/advanced",
            item: "Advanced",
            icon: `fa-regular fa-calendar-days`
        },
        {
            path: "/app/settings/subscription",
            item: "Subscription",
            icon: `fa-solid fa-filter`
        },
        {
            path: "/app/settings/theme",
            item: "Theme",
            icon: `fa-solid fa-filter`
        }
    ]
    return (
        <div className={`md:min-w-[280px] max-sm:max-w-[240px] ${sidebarMode[theme.mode]()} side-bar p-4 h-[100vh]`} >
            <MenuList menu={menu}></MenuList>
        </div>
         
    );
};

export default SidebarSetting;