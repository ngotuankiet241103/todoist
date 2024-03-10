import axios from "axios";
import React, { useEffect, useState } from "react";
import { env } from "../../helper/env";
import useOpenModal from "../../hooks/useOpenModal";
import { flag } from "../../constaints/flag";
import IconMenu from "../web/IconMenu";
import BoxTitle from "./BoxTitle";
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
};
const FormPriority = React.memo (({ onclick, isDefault, priority }: formPriority) => {
  const [priorities, setPriorities] = useState<Priorities>([]);
  const { isShow, handleToggleModel } = useOpenModal(false);
  console.log(priorities);

  useEffect(() => {
    async function getPriorities() {
      try {
        const response = await axios.get(`${env.VITE_BASE_API}/priorities`);
        if (response.status === 200) {
          setPriorities(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getPriorities();
  }, []);
  useEffect(() => {
    if (isDefault) {
      const priority = priorities.find(
        (priority) => priority.level === "default"
      ) || { id: 0, name: "priority", code: "priority", level: "default" };
      priority.name = "Priority";
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
            {priority.name}
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
  return (
    <>
      <div className="absolute w-[120px] z-10 top-[40px] left-0 bg-white box-calen rounded-lg ">
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
  console.log(level);

  return (
    <>
      <div
        className="px-2 py-1 menu-hover flex gap-2 items-center"
        onClick={onClick}
      >
        <IconMenu icon={flag[`${level}`]}></IconMenu>
        {name}
      </div>
    </>
  );
};

export default FormPriority;
