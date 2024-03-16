import { useState } from "react";
import useChangeView from "../../hooks/useChangeView";
import { ProjectGroupKey } from "../../hooks/useProjectPage";
import useOpenModal from "../../hooks/useOpenModal";
import { priority } from "../form/FormPriority";
import { useSelector } from "react-redux";
import { state } from "../../redux/store";
import { LabelSlice } from "../../redux/reducer/labelSlice";
import { Filter } from "../../redux/reducer/stateSlice";

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
type page = "project" | "today";
const groups: { [key in page]: ProjectGroupKey[] } = {
  project: ["default", "due date", "priority"],
  today: ["default", "due date", "priority"],
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
 
  const arr = groups[`${type}`];
  const { isShow: openGroupOption, handleToggleModel } = useOpenModal(false);
  const Render = () => {
    return (
      <>
        {arr ? (
          <div className="group relative py-2 px-2 ">
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
      <span onClick={onClick}>View +</span>
      <div
        className={`absolute top-0 right-0 w-[300px] box-calen bg-white rounded-lg p-2 transition-all ${
          isShow ? "block" : "hidden"
        }`}
      >
        <span className="font-semibold mb-2">View</span>
        <div className="rounded-lg flex h-[40px] bg-gray-300 p-1 gap-1 cursor-pointer">
          <div
            onClick={handleClick}
            className={`rounded-lg ${
              state?.isList ? "bg-white" : ""
            } flex justify-center items-center flex-1 hover:bg-gray-200`}
          >
            List
          </div>
          <div
            onClick={handleClick}
            className={`rounded-lg ${
              state?.isList ? "" : "bg-white"
            }  flex justify-center items-center flex-1 hover:bg-gray-200`}
          >
            Board
          </div>
        </div>
        <Render></Render>
        <div>
          <h1 className="px-2 font-semibold">Filter by</h1>
          <RenderPriority setFilter={filter.setFilter} filter={filter.filter} onClick={setIsFilter} label="Priority" priorities={priorities}  />
          <RenderFilterLabel setFilter={filter.setFilter} filter={filter.filter} onClick={setIsFilter} label="Label" labels={labels}/>
        </div>
      </div>
    </div>
  );
};
const RenderPriority = ({label,priorities,onClick,filter,setFilter}: {setFilter:(value: Filter)=> void, filter: Filter,label:string, priorities: priority[],onClick: (value: boolean) => void}) => {
  const {isShow,handleToggleModel} = useOpenModal(false);
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,priorityCode: string) => {
    onClick(true);
    const element : HTMLDivElement = e.target;
    const iconCheck = element.querySelector('.icon-check')
    if(element.classList.contains("active")){
      const newArr : string[] = [...filter.priorityCode];
      newArr.slice(newArr.findIndex(value => value === priorityCode),1);
      setFilter({
        ...filter,
        priorityCode: newArr
      })
      element.classList.remove("activie")
      iconCheck?.classList.add("hidden")
    }
    else{
      
      const arr = filter ? filter.priorityCode : [];
      setFilter({
        ...filter,
        priorityCode: [...arr,priorityCode]
      })
      element.classList.add("activie")
      iconCheck?.classList.remove("hidden")
    }
  }
  return (
    <>
      <div className="group relative py-2 px-2 ">
        <div className="flex justify-between" onClick={handleToggleModel}>
          <span className="capitalize">{label}:</span>
          <span>{filter && filter.priorityCode.length > 0 ? filter.priorityCode.map(priority => (priority +",")).join('') : "All(Default)" }</span>
        </div>
        <div
          className={`absolute z-20 ${isShow ? 'block' : 'hidden'} box-calen top-10 left-0 bg-white  w-full  cursor-pointer`}
        >
          {priorities.length > 0 &&  priorities.map(item => <div onClick={(e) => handleClick(e,item.code)}  className="flex px-4 py-2 rounded-lg justify-between hover:bg-gray-300 transition-all" key={item.id}>
            <div>{item.name}</div>
            <div className="hidden icon-check text-primary"><i className="fa-solid fa-check"></i></div>
          </div>)}
        </div>
      </div>
    </>
  );
}
const RenderFilterLabel = ({label,labels,onClick,filter,setFilter}: {setFilter:(value: Filter)=> void,label:string, labels: LabelSlice,onClick: (value: boolean) => void,filter: Filter}) => {
  const {isShow,handleToggleModel} = useOpenModal(false);
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,labelCode: string) => {
    onClick(true);
    const element : HTMLDivElement = e.target;
    if(element.classList.contains("active")){
      const newArr : string[] = [...filter.labelCode];
      newArr.slice(newArr.findIndex(value => value === labelCode),1);
      setFilter({
        ...filter,
        labelCode: newArr
      })
    }
    else{
      const arr = filter ? filter.labelCode : [];
      setFilter({
        ...filter,
        labelCode: [...arr,labelCode]
      })
    }
  }
  return (
    <div className="group relative py-2 px-2 ">
        <div className="flex justify-between" onClick={handleToggleModel}>
          <span className="capitalize">{label}:</span>
          <span>{filter && filter.priorityCode.length > 0 ? filter.labelCode && filter.priorityCode.map(label => (label +",")).join('') : "All(Default)" }</span>
        </div>
        <div
           className={`absolute z-20 box-calen top-10 left-0 bg-white  w-full  cursor-pointer ${isShow ? 'block' : 'hidden'}`}
        >
          <div className="mb-2 px-2">
            <input className="border border-gray-300 w-full outline-none px-2 py-1 rounded-lg" placeholder="Search your label"/>
          </div>
          {labels.length > 0 &&  labels.map(item => <div  onClick={(e) => handleClick(e,item.code)} className="flex px-4 py-2 rounded-lg justify-between hover:bg-gray-300 transition-all" key={item.id}>
            <div>{item.name}</div>
            
          </div>)}
        </div>
      </div>
  );

}
export default ViewFilter;
