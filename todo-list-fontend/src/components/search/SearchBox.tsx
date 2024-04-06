
import { RefObject, useState } from 'react';
import { searchItem } from './SearchContainer';
import SearchList from './SearchList';
import useTheme from '../../hooks/useTheme';
import {  bgMode } from '../../utils/theme';

const SearchBox = ({list,inputRef}: {list: searchItem[],inputRef: RefObject<HTMLInputElement>}) => {
    const {theme} = useTheme();
    return (
        <div className={`w-[600px] h-[450px] box-calen ${bgMode[theme.mode]()} rounded-lg overflow-y-scroll`} onClick={e => e.stopPropagation()}>
            
            <SearchList inputRef={inputRef} list={list} />
        </div>
    );
};

export default SearchBox;