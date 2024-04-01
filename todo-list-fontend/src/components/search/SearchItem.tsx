
import { searchItem } from './SearchContainer';
import IconMenu from '../web/IconMenu';

const SearchItem = ({search}: {search: searchItem}) => {
    return (
        <div>
            <h4 className='px-2 py-1 text-[13px] text-gray-300'>{search.title}</h4>
            {search.menu.length > 0 && search.menu.map(item => <SearchSubItem menu={item}></SearchSubItem>)}
        </div>
    );
};
type SearchSub =  {
    icon: string;
    item: string;
    onclick: () => void;
}
const SearchSubItem = ({menu}: {menu: SearchSub}) =>{
 
    return (
        <div className='p-2 hover:bg-gray-200 border-2 border-transparent hover:border-l-red-500 transition-all flex gap-3 cursor-pointer' onClick={menu.onclick}>
            <span>
                <IconMenu icon={menu.icon}></IconMenu>
            </span>
            <span>{menu.item}</span>
        </div>
    );
}

export default SearchItem;