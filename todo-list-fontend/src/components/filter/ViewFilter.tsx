
import useChangeView from "../../hooks/useChangeView";
import { ProjectGroupKey } from "../../hooks/useTasks";
import useOpenModal from "../../hooks/useOpenModal";
import { priority } from "../form/FormPriority";
import { useSelector } from "react-redux";
import { state } from "../../redux/store";
import { LabelSlice } from "../../redux/reducer/labelSlice";
import { Filter } from "../../redux/reducer/stateSlice";
import { useEffect, useRef, useState } from "react";
import { TaskSliceKey } from "../../redux/reducer/tasksSlice";
import useTheme from "../../hooks/useTheme";
import { bgColor, bgMode, hoverMode, sidebarMode } from "../../utils/theme";

type ViewFilter = {
  isShow: boolean;
  onClick: () => void;
  label: string;
  setIsFilter: (value: boolean) => void;
  type: page;
  filter: {
    filter: Filter,
    setFilter: (value: Filter) => void;
  }
  group: {
    group: ProjectGroupKey;
    setGroup: (value: ProjectGroupKey) => void;
  };
};
type page = TaskSliceKey;
const groups: { [key in page]: ProjectGroupKey[] } = {
  project: ["default", "due date", "priority"],
  today: ["default", "due date", "priority"],
  upcoming: []
};
const ViewFilter = ({
  type,
  isShow,
  onClick,
  setIsFilter,
  filter,
  label,
  group: { group, setGroup },
}: ViewFilter) => {
  const { state, handleChangeView: handleClick } = useChangeView(label);
  const priorities = useSelector((state: state) => state.priority);
  const labels = useSelector((state: state) => state.label);
  const {theme} = useTheme();
  const arr = groups[`${type}`];
  const { isShow: openGroupOption, handleToggleModel } = useOpenModal(false);
  const Render = () => {
    return (
      <>
        {arr ? (
          <div className={`group relative py-2 px-2 ${sidebarMode[theme.mode]()} transition-all rounded-lg cursor-pointer`}>
            <div className="flex justify-between" onClick={handleToggleModel}>
              <span>Group:</span>
              <span>{group}</span>
            </div>
            <div
              className={`absolute  z-10 box-calen top-10 left-0 bg-white  w-full  cursor-pointer ${
                openGroupOption ? "block" : "hidden"
              }`}
            >
              {Object.entries(arr).map(([key, value], index) => (
                <div
                  onClick={() => setGroup(value)}
                  key={index}
                  className="flex px-4 py-2 rounded-lg justify-between hover:bg-gray-300 transition-all"
                >
                  <div>{value}</div>
                  {value === group && (
                    <span className="text-primary">
                      <i className="fa-solid fa-check"></i>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  };
  
  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <span className={`cursor-pointer ${`${sidebarMode[theme.mode]()}`} rounded-sm px-3 py-2 transition-all`}onClick={onClick}>View +</span>
      <div
        className={`absolute top-0 right-0 w-[300px] box-calen ${`${sidebarMode[theme.mode]()}`} rounded-lg p-2 transition-all  ${
          isShow ? "block" : "hidden"
        }`}
      >
        <span className="font-semibold mb-2">View</span>
        <div className={`rounded-lg ${theme.mode !== "light" ? 'text-white' : ''}  text-black flex h-[40px] ${theme.mode !== "light" ? bgMode[theme.mode]() : 'bg-gray-300'} p-1 gap-1 cursor-pointer mb-2`}>
          <div
            onClick={handleClick}
            className={`rounded-lg ${
              state?.isList ? `${theme.mode != "light" ? `${bgColor[theme.color]}`: "bg-white"}` : ""
            } flex justify-center items-center flex-1 hover:opacity-50`}
          >
            List
          </div>
          <div
            onClick={handleClick}
            className={`rounded-lg ${
              state?.isList ? "" : `${theme.mode != "light" ? `${bgColor[theme.color]}`: "bg-white"}`
            }  flex justify-center items-center flex-1 hover:opacity-50`}
          >
            Board
          </div>
        </div>
        <Render></Render>
        <div>
          <h1 className="px-2 font-semibold text-[18px]">Filter by</h1>
          <RenderPriority isShow={isShow} setFilter={filter.setFilter} filter={filter.filter} onClick={setIsFilter} label="Priority" priorities={priorities}  />
          <RenderFilterLabel isShow={isShow} setFilter={filter.setFilter} filter={filter.filter} onClick={setIsFilter} label="Label" labels={labels}/>
        </div>
      </div>
    </div>
  );
};
const RenderPriority = ({label,priorities,onClick,filter,setFilter,isShow}: {isShow:boolean,setFilter:(value: Filter)=> void, filter: Filter,label:string, priorities: priority[],onClick: (value: boolean) => void}) => {
  const {isShow:showForm,handleToggleModel} = useOpenModal(false);
  const {theme} = useTheme();
  useEffect(() => {
    if(!isShow && showForm){
      handleToggleModel()
    }
  },[isShow])
  const handleClick = (priorityCode: string) => {
  
    onClick(true);
    const index = filter ? filter.priorityCode.findIndex(item => item === priorityCode) : -1;
    console.log(index);
    
    const newArr = [...filter.priorityCode];
    if(index >= 0){
      newArr.splice(index,1);
      console.log(newArr);
      
      setFilter({
        ...filter,
        priorityCode: newArr
      })
    }
    else{
    
      setFilter({
        ...filter,
        priorityCode: [...newArr,priorityCode]
      })
    }
    
    
  }
  return (
    <>
      <div className={`group relative py-2 px-2 ${hoverMode[theme.mode]()} transition-all rounded-lg cursor-pointer`}>
        <div className="flex justify-between" onClick={handleToggleModel}>
          <span className="capitalize">{label}:</span>
          <span>{filter  && filter.priorityCode.length > 0 ? filter.priorityCode.map((item,index,arr) => index === arr.length -1 ? item : `${item},`).join('') : "All(Default)" }</span>
        </div>
        <div
          className={`absolute z-20 ${showForm ? 'block' : 'hidden'} box-calen top-10 left-0 ${sidebarMode[theme.mode]()}  w-full  cursor-pointer`}
        >
          {priorities.length > 0 &&  priorities.map(item => <div onClick={() => handleClick(item.code)}  className={`flex px-4 py-2 rounded-lg justify-between hover:bg-gray-300 transition-all ` } key={item.id}>
            <div>{item.name}</div>
            <div className={`${check(filter,item.code,"priorityCode") ? 'block' : 'hidden'} icon-check text-primary`}><i className="fa-solid fa-check"></i></div>
          </div>)}
        </div>
      </div>
    </>
  );
}
const check = (filter: Filter,value: string,key: "labelCode" | "priorityCode") => {
  return filter ? filter[`${key}`] && filter[`${key}`].length > 0 && filter[`${key}`].some(item =>  item===value): false;
}
const RenderFilterLabel = ({label,labels,onClick,filter,setFilter,isShow}: {isShow:boolean,setFilter:(value: Filter)=> void,label:string, labels: LabelSlice,onClick: (value: boolean) => void,filter: Filter}) => {
  const {isShow:showForm,handleToggleModel} = useOpenModal(false);
  const [labelSearch,setLabelSearch] = useState<LabelSlice>(labels);
  const {theme} = useTheme();
  useEffect(() => {
    
    if(!isShow && showForm){
      handleToggleModel()
    }
    else{
      setLabelSearch(labels);
    }

  },[isShow])
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = (labelCode: string) => {
    onClick(true);
    const index = filter ? filter.labelCode.findIndex(item => item === labelCode) : -1;
    const newArr = [...filter.labelCode];
    if(index >= 0){
      newArr.splice(index,1);
      setFilter({
        ...filter,
        labelCode: newArr
      })
    }
    else{
    
      setFilter({
        ...filter,
        labelCode: [...newArr,labelCode]
      })
    }
    
    
  }
  const handleSearchLabel = () => {
    if(inputRef.current){
      const value = inputRef.current.value;
      if(value){
        const newArr = labels.filter(label => label.name.includes(value));
        setLabelSearch(newArr);
      }
      else{
        setLabelSearch(labels);
      }
    }
  }
  return (
    <div className="group relative py-2 px-2 hover:bg-gray-200 transition-all rounded-lg cursor-pointer ">
        <div className="flex justify-between" onClick={handleToggleModel}>
          <span className="capitalize">{label}:</span>
          <span>{filter && filter.labelCode && filter.labelCode.length > 0 ? filter.labelCode.map((item,index,arr) => index === arr.length -1 ? item : `${item},`).join('') : "All(Default)" }</span>
        </div>
        <div
           className={`absolute z-20 box-calen py-2 top-10 left-0 ${sidebarMode[theme.mode]()}  w-full  cursor-pointer ${showForm ? 'block' : 'hidden'}`}
        >
          <div className="mb-2 px-2">
            <input ref={inputRef} onChange={handleSearchLabel} className="border border-gray-300 w-full outline-none px-2 py-1 rounded-lg" placeholder="Search your label"/>
          </div>
          {labelSearch.length > 0 &&  labelSearch.map(item => <div  onClick={() => handleClick(item.code)} className="flex px-4 py-2 rounded-lg justify-between hover:bg-gray-300 transition-all" key={item.id}>
            <div>{item.name}</div>
            <div className={`${check(filter,item.code,"labelCode") ? 'block' : 'hidden'} icon-check text-primary`}><i className="fa-solid fa-check"></i></div>
          </div>)}
        </div>
      </div>
  );

}
export default ViewFilter;
