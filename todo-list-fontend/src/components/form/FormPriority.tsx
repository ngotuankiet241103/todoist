
import React, { useEffect} from "react";

import useOpenModal from "../../hooks/useOpenModal";
import { flag } from "../../constaints/flag";
import IconMenu from "../web/IconMenu";
import BoxTitle from "./BoxTitle";
import { useSelector } from "react-redux";
import { state } from "../../redux/store";
import useTheme from "../../hooks/useTheme";
import { hoverMode, sidebarMode } from "../../utils/theme";
export type priority = {
  id: number;
  name: string;
  code: string;
  level: string;
};

type Priorities = priority[] | [];
type formPriority = {
  onclick: (priority: priority) => void;
  isDefault: boolean;
  priority: priority | undefined;
  isList: boolean,
};
const FormPriority = React.memo (({ onclick, isDefault, priority,isList }: formPriority) => {
  const priorities = useSelector((state: state) => state.priority);
 
  const { isShow, handleToggleModel } = useOpenModal(false);
  
  useEffect(() => {
    if (isDefault) {
      const priority = priorities.length > 0 &&  priorities.find(
        (priority) => priority.level === "default"
      ) || { id: 0, name: "priority", code: "priority", level: "default" };
      
      onclick(priority);
    }
  }, [priorities]);

  const handleClick = (priority: priority) => {
    onclick(priority);
    handleToggleModel();
  };

  return (
    <>
      <div className="relative">
        {priority && (
          <BoxTitle  isBorder={true} onClick={handleToggleModel}>
            <IconMenu
              className="text-[14px]"
              icon={flag[`${priority.level}`]}
            ></IconMenu>
            {isList && priority.name}
          </BoxTitle>
        )}
        {isShow && (
          <PriorityList
            onclick={handleClick}
            priorities={priorities}
          ></PriorityList>
        )}
      </div>
    </>
  );
});
const PriorityList = ({
  priorities,
  onclick,
}: {
  priorities: Priorities;
  onclick: (priority: priority, isVisible?: boolean) => void;
}) => {
  const {theme} = useTheme();
  return (
    <>
      <div className={`absolute w-[120px] z-20 top-[40px] left-0 ${sidebarMode[theme.mode]()} box-calen rounded-lg `}>
        {priorities.length > 0 &&
          priorities.map((priority) => (
            <PriorityItem
              onClick={() => onclick(priority)}
              id={priority.id}
              key={priority.id}
              name={priority.name}
              level={priority.level}
              code={priority.code}
            ></PriorityItem>
          ))}
      </div>
    </>
  );
};
type priorityItem = priority & {
  onClick: () => void;
};
const PriorityItem = ({ name, level, onClick }: priorityItem) => {
  const {theme} = useTheme();
  return (
    <>
      <div
        className={`px-2 py-1 ${hoverMode[theme.mode]()} flex gap-2 items-center`}
        onClick={onClick}
      >
        <IconMenu icon={flag[`${level}`]}></IconMenu>
        {name}
      </div>
    </>
  );
};

export default FormPriority;
