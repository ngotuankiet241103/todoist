
import { RefObject } from 'react';
import { searchItem } from './SearchContainer';
import SearchList from './SearchList';

const SearchBox = ({list,inputRef}: {list: searchItem[],inputRef: RefObject<HTMLInputElement>}) => {

    return (
        <div className='w-[600px] h-[450px] box-calen bg-white rounded-lg overflow-y-scroll '>
            
            <SearchList inputRef={inputRef} list={list} />
        </div>
    );
};

export default SearchBox;