
import { searchItem } from './SearchContainer';
import IconMenu from '../web/IconMenu';
import { borderColor } from '../../utils/theme';
import useTheme from '../../hooks/useTheme';

const SearchItem = ({search}: {search: searchItem}) => {
    return (
        <div>
            <h4 className='px-2 py-1 text-[13px] text-gray-300'>{search.title}</h4>
            {search.menu.length > 0 && search.menu.map((item,index) => <SearchSubItem key={index} menu={item}></SearchSubItem>)}
        </div>
    );
};
type SearchSub =  {
    icon: string;
    item: string;
    onclick: () => void;
}
const SearchSubItem = ({menu}: {menu: SearchSub}) =>{
    const {theme} = useTheme();
    return (
        <div className={`p-2 ${theme.mode === "dark" ? 'hover:bg-black' : 'hover:bg-gray-200'} border-2 border-transparent hover:border-y-transparent hover:border-r-transparent hover:${borderColor[theme.color]} transition-all flex gap-3 cursor-pointer`} onClick={menu.onclick}>
            <span>
                <IconMenu icon={menu.icon}></IconMenu>
            </span>
            <span>{menu.item}</span>
        </div>
    );
}

export default SearchItem;