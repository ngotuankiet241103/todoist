import  { RefObject, useEffect, useState } from 'react';

import SearchItem from './SearchItem';
import { searchItem } from './SearchContainer';
import { useSelector } from 'react-redux';
import { state } from '../../redux/store';
import useOpenSearch from '../../hooks/useOpenSearch';
import { useNavigate } from 'react-router-dom';
import useOpenBoxSearch from '../../hooks/useOpenBoxSearch';
const SearchList = ({list,inputRef}: {list: searchItem[],inputRef: RefObject<HTMLInputElement>}) => {
    const projects = useSelector((state: state) => state.project.all);
    const labels = useSelector((state: state) => state.label);
    const {openSearch, handleChooseSearch,reset} = useOpenSearch();
    const [newList,setList] = useState<searchItem[]>(list);
    const {closeBox} = useOpenBoxSearch();
    const redirect = useNavigate();
    useEffect(()=>{
       
        if(openSearch){
            if(openSearch.data ){
                setList([])
                if(openSearch.type === "projects" && openSearch.data.length > 0){
                    
                    let menu : {
                        icon: string;
                        item: string;
                        onclick: () => void;
                    }[] = []
                    menu = openSearch.data.reduce((prev,data) => {
                        return [
                            ...prev,
                            {
                                icon: `fa-solid fa-house`,
                                item: data.name,
                                onclick: () => {
                                    closeBox();
                                    redirect(`/app/project/${data.code}`)
                                    reset();
                                }
                            }


                        ]
                    },menu)
                    const list : searchItem = 
                    {
                        title: openSearch.type,
                        menu
                    } 
                    setList([list])
                
                }
                else if(openSearch.type == "labels") {
                    let menu : {
                        icon: string;
                        item: string;
                        onclick: () => void;
                    }[] = []
                    menu = openSearch.data.reduce((prev,data) => {
                        return [
                            ...prev,
                            {
                                icon: `fa-solid fa-house`,
                                item: data.name,
                                onclick: () => {
                                    closeBox();
                                    redirect(`/app/label/${data.code}`)
                                    reset();
                                }
                            }


                        ]
                    },menu)
                    const list : searchItem = 
                    {
                        title: openSearch.type,
                        menu
                    } 
                    setList([list])
                }
                
            }
            else{
             
                setList(list);
            }
        }
        
    },[openSearch])
    const handleOnChange = () => {
        if(inputRef.current){
            const value = inputRef.current.value;
            if(!value){
                
                reset();
            }
            const key = value.substring(0,1);
            const data = value.substring(1);
            console.log(key);
            console.log(data);
            if(key === "#"){
                console.warn(projects);
                
                const arr = projects.filter(project => project.name.toLowerCase().includes(data));
                console.warn(arr);
                
                handleChooseSearch({type: "projects",data: arr})

            }
            else if(key === "@"){
                const arr = labels.filter(label => label.name.includes(data));
                handleChooseSearch({type: "labels",data: arr})
            }
            else{
                let response : searchItem[] = []
                response = list.reduce((prev, data)=> {
                    const menu =  data.menu.filter(menu => menu.item.toLowerCase().includes(value))
                    return  menu.length > 0 ? [...prev,{title: data.title,menu}] : [...prev];
                },response)
                setList(response)
                
            }
            
           
        }
    }
    
    return (
        <>
            <div className='flex gap-2 items-center py-3 px-2'>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input onChange={handleOnChange} ref={inputRef} type='text' className=' bg-transparent px-2 flex-1 outline-none border-none' placeholder='Search or type a command..'/>
            </div>
            {newList.length > 0  && newList.map(menu => <SearchItem   search={menu} ></SearchItem>)}
            
        </>
    );
};

export default SearchList;