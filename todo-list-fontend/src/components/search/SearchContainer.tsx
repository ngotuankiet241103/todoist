import { useSelector } from "react-redux";
import { state } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import useAddTask from "../../hooks/useAddTask";
import useExpandMenu from "../../hooks/useExpandMenu";
import useOpenSearch from "../../hooks/useOpenSearch";
import { useRef } from "react";
import useOpenBoxSearch from "../../hooks/useOpenBoxSearch";

export type searchItem = {
    title: string,
    menu: {
        icon: string,
        item: string,
        onclick: () => void
    }[]
}

const SearchContainer = () => {
    const inbox = useSelector((state: state) => state.project.inbox);
    const {handleExpandMenu} = useExpandMenu();
    const redirect = useNavigate();
    const {handleToggleModal} = useAddTask();
    const searchRef = useRef<HTMLInputElement>(null);
    const {handleChooseSearch} = useOpenSearch();
    const {isOpen,closeBox} = useOpenBoxSearch();
  
    const handleClickOpen = (type: "projects" | "labels" | "sections") => {
     
        const objType = {
            projects: () => {
                if(searchRef.current){
                   
                    searchRef.current.value = "#"
                    handleChooseSearch({type: "projects",data: []})
                }
                
            },
            labels: () => {
                if(searchRef.current){
                    searchRef.current.value = "@";
                    handleChooseSearch({type: "labels",data: []})
                }
            },
            sections: () => {
                if(searchRef.current){
                    searchRef.current.value = "/";
                    handleChooseSearch({type: "sections",data: []})
                }
            }
        }
        objType[`${type}`]()
    }
    const initSearchValue : searchItem[] = [
        {
            title: "Navigation",
            menu: [
                {
                    icon: `fa-solid fa-house`,
                    item: "Go to home",
                    onclick: () => {
                        redirect("/")
                    }
                },
                {
                    icon: `fa-solid fa-house`,
                    item: "Go to Inbox",
                    onclick: () => {
                        closeBox();
                        redirect(`/app/project/${inbox?.code}`)
                    }
                     
                },
                {
                    icon: `fa-solid fa-house`,
                    item: "Go to Today",
                    onclick: () => {
                        closeBox();
                        redirect(`/app/today`)
                    }
                     
                },
                {
                    icon: `fa-solid fa-house`,
                    item: "Go to upcoming",
                    onclick: () => {
                        closeBox();
                        redirect(`/app/upcoming`)
                    }
                },
                {
                    icon: `fa-solid fa-house`,
                    item: "Go to Filters&Labels",
                    onclick: () => {
                        closeBox();
                        redirect(`/app/filters-labels`)
                    }
                    
                },
                {
                    icon: `fa-solid fa-house`,
                    item: "Go to completed",
                    onclick: () => {
                        closeBox();
                        redirect(`/app/activity?eventType=item%3Acompleted`)
                    }
                    
                },
                {
                    icon: `fa-solid fa-house`,
                    item: "Go to activity",
                    onclick: () => {
                        redirect(`/app/activity`)
                    }
                   
                },
                {
                    icon: `fa-solid fa-house`,
                    item: "Open project..",
                    onclick: () => {
                        
                        handleClickOpen("projects")
                    }
                   
                },
                {
                    icon: `fa-solid fa-house`,
                    item: "Open section..",
                    onclick: () => {
                        handleClickOpen("sections")
                    }
                   
                },
                {
                    icon: `fa-solid fa-house`,
                    item: "Open label..",
                    onclick: () => {
                        handleClickOpen("labels")
                    }
                   
                }

            ]
        },
        {
            title: "Add",
            menu: [
                {
                    icon: `fa-solid fa-house`,
                    item: "Add task",
                    onclick: () => {
                        closeBox();
                        handleToggleModal();
                    }
                   
                }
            ]
        },
        {
            title: "Templates",
            menu: [
                {
                    icon: `fa-solid fa-house`,
                    item: "Open notifications",
                    onclick: () => {
                    }
                   
                },
                {
                    icon: `fa-solid fa-house`,
                    item: "Open menu user",
                    onclick: () => {
                    }
                   
                }
            ]
        },
        {
            title: "Miscellaneous",
            menu: [
                {
                    icon: `fa-solid fa-house`,
                    item: "Open notifications",
                    onclick: () => {
                    }
                   
                },
                {
                    icon: `fa-solid fa-house`,
                    item: "Open/close sidebar",
                    onclick: () => {
                        closeBox();
                        handleExpandMenu();
                    }
                   
                }
            ]
        },
        {
            title: "Settings",
            menu: [
                {
                    icon: `fa-solid fa-house`,
                    item: "General",
                    onclick: () => {
                    }
                   
                },
                {
                    icon: `fa-solid fa-house`,
                    item: "Advanced",
                    onclick: () => {
                    }
                   
                },
                {
                    icon: `fa-solid fa-house`,
                    item: "Notifications",
                    onclick: () => {
                    }
                   
                },
                {
                    icon: `fa-solid fa-house`,
                    item: "Theme",
                    onclick: () => {
                    }
                   
                },
                {
                    icon: `fa-solid fa-house`,
                    item: "Productivity",
                    onclick: () => {
                    }
                   
                },
                {
                    icon: `fa-solid fa-house`,
                    item: "Reminders",
                    onclick: () => {
                    }
                   
                },
                {
                    icon: `fa-solid fa-house`,
                    item: "Backup",
                    onclick: () => {
                    }
                   
                },
                
            ]
        },
        {
            title: "Account",
            menu: [
                {
                    icon: `fa-solid fa-house`,
                    item: "Account",
                    onclick: () => {
                        closeBox();
                        redirect("/app/settings/account");
                    }
                   
                },
                {
                    icon: `fa-solid fa-house`,
                    item: "Change email address",
                    onclick: () => {
                        closeBox();
                        redirect("/app/settings/account/email");
                    }
                   
                },
                {
                    icon: `fa-solid fa-house`,
                    item: "Change password",
                    onclick: () => {
                        closeBox();
                        redirect("/app/settings/account/password");
                    }
                   
                },
                {
                    icon: `fa-solid fa-house`,
                    item: "Delete account",
                    onclick: () => {
                        closeBox();
                        redirect("/app/settings/account");
                    }
                   
                }
            ]
        }
    ]
    const handleBlurBox = () => {
        if(isOpen){
            closeBox();
        }
    }
    return (
        <div className="fixed z-20 inset-0  bg-[rgba(0,0,0,0.25)] flex justify-center items-center" onClick={handleBlurBox}>
        
            <SearchBox inputRef={searchRef} list={initSearchValue}></SearchBox>
        </div>
    );
};

export default SearchContainer;