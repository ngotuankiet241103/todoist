import React from 'react';
import IconMenu from './IconMenu';

const Search = () => {
    return (
        <div className='flex gap-4 p-2 items-center menu-hover'>
            <IconMenu icon='fa-solid fa-magnifying-glass'></IconMenu>
            <span>Search</span>
        </div>
    );
};

export default Search;