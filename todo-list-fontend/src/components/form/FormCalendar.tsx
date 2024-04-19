import { useEffect, useRef, useState } from "react";
import { days } from "../../constaints/days";
import { months } from "../../constaints/month";
import IconMenu from "../web/IconMenu";
import { colorMark, mark } from "../../constaints/mark";
import useOpenModal from "../../hooks/useOpenModal";
import BoxTitle from "./BoxTitle";
import useTheme from "../../hooks/useTheme";
import { hoverMode, sidebarMode } from "../../utils/theme";
export type Day = {
  day:
    | "sunday"
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | string;
  date: Date | null;
  mark:
    | "Today"
    | "Tommorow"
    | "Later this week"
    | "This week"
    | "Next week"
    | "No date"
    | string;
};
type FormCalendar = Day[];
const generateFormCalendar = (isToday: boolean): FormCalendar => {
  let calendars: FormCalendar;

  if (isToday) {
    const marks = [
      "Tommorow",
      "Later this week",
      "This week",
      "Next week",
      "No date",
    ];
    calendars = marks.map((mark) => generateDate(new Date(), mark));
  } else {
    const marks = ["Today", "Tommorow", "This week", "Next week", "No date"];
    calendars = marks.map((mark) => generateDate(new Date(), mark));
  }
  return calendars;
};
const generateDate = (currentDay: Date, mark: string): Day => {
  switch (mark.toLowerCase()) {
    case "today": {
      const now = currentDay.getDay();
      return {
        day: days[now],
        date: currentDay,
        mark,
      };
    }
    case "tommorow": {
      currentDay.setDate(currentDay.getDate() + 1);
      const now = currentDay.getDay();
      return {
        day: days[now],
        date: currentDay,
        mark,
      };
    }
    case "later this week": {
      currentDay.setDate(currentDay.getDate() + 2);
      const now = currentDay.getDay();

      return {
        day: days[now],
        date: currentDay,
        mark,
      };
    }
    case "this week": {
      const dayToAdd = 6 - currentDay.getDay();
      currentDay.setDate(currentDay.getDate() + dayToAdd);
      const now = currentDay.getDay();
      return {
        day: days[now],
        date: currentDay,
        mark,
      };
    }
    case "next week": {
      const dayToAdd = 7 - currentDay.getDay() + 1;
      currentDay.setDate(currentDay.getDate() + dayToAdd);
      const now = currentDay.getDay();
      return {
        day: days[now],
        date: currentDay,
        mark,
      };
    }
    default: {
      return {
        day: "",
        date: null,
        mark,
      };
    }
  }
};

type Calendar = {
  isToday: boolean;
  onClick: (date: Day) => void;
  onChange: (value: boolean) => void;
  currentDay?: Day;
};
const getDay = (date: Day): string => {
  if (date.mark === "Next week" || date.mark == "") {
    const month: number = date.date?.getMonth() ? date.date?.getMonth() : 1;
    console.warn(month);

    return `${date.day.substring(0, 3)} ${date.date?.getDate()} ${
      months[month]
    }`;
  }
  return date.day.substring(0, 3);
};
const getCurrentDay = (date: Day) => {
  const month: number = date.date?.getMonth() ? date.date?.getMonth() : 1;
  return `${date.date?.getDate()} ${months[month]}`;
};
const FormCalendar = ({
  isToday,
  onClick,
  onChange,

  currentDay,
}: Calendar) => {
  const dates: FormCalendar = generateFormCalendar(isToday);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchDate, setSearchDate] = useState<Day>();
  const { isShow: show, handleToggleModel } = useOpenModal(false);
  const {theme} = useTheme();
  useEffect(() => {
    if (isToday) {
      onClick(generateDate(new Date(), "Today"));
    }
  }, []);
  const handleClick = (date: Day) => {
    if (date.mark != "Today") {
      onChange(false);
    } else {
      console.log("today");

      onChange(true);
    }
    onClick(date);
    handleToggleModel();
  };
  function handleChange(): void {
    if (inputRef.current && inputRef.current.value) {
      const date = new Date();
      const value = inputRef.current.value;
      const index = days.findIndex((day) =>
        day.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
      let plusDay = 0;
      if (date.getDay()) {
        const currentIndex = date.getDay();
        if (currentIndex > index) {
          plusDay = 7 - currentIndex + index;
        } else if (currentIndex == index) {
          plusDay = 0;
        } else {
          plusDay = index - currentIndex;
        }
      }
      date.setDate(date.getDate() + plusDay);
      const newDate: Day = {
        day: days[date.getDay()],
        date,
        mark: "",
      };
      setSearchDate(newDate);
    }
  }
  return (
    <>
      <div className="relative capitalize">
        <BoxTitle isBorder={true} className={`${colorMark[`${currentDay?.mark}`]}`} onClick={handleToggleModel}>
            {currentDay?.date && (
                <IconMenu
                className="text-[14px]"
                icon={mark[`${currentDay.mark}`]}
                ></IconMenu>
            )}
            {currentDay && currentDay.mark === "Today" || currentDay?.mark === "No date"
                ? currentDay.mark
                : currentDay?.day}
        </BoxTitle>
          
        {show && (
          <div
            className={`absolute  w-[300px] py-2 z-50 left-0 top-[40px] rounded-lg box-calen ${sidebarMode[theme.mode]()}`}
          >
            <div className="py-2">
              {currentDay && currentDay.day ? (
                <div className="px-2 flex gap-2">
                  {getCurrentDay(currentDay)}
                </div>
              ) : (
                <div>
                  <input
                    ref={inputRef}
                    onChange={() => handleChange()}
                    className="outline-none px-2"
                    type="text"
                    placeholder="Type a due date"
                  />
                  {searchDate && (
                    <div
                      className="px-2 border-t-[1px] border-gray-200 capitalize py-2 text-[15px] flex justify-between menu-hover"
                      onClick={() => handleClick(searchDate)}
                    >
                      <span>{getDay(searchDate)}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col border-y-[1px] border-gray-200">
              {dates.length > 0 &&
                dates.map((date, index) => (
                  <CalendarItem
                    key={index}
                    date={date}
                    onclick={() => handleClick(date)}
                  ></CalendarItem>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
const CalendarItem = ({
  date,
  className,
  onclick,
}: {
  date: Day;
  className?: string;
  onclick: () => void;
}) => {
  const {theme} = useTheme();
  return (
    <div
      className={`capitalize px-2 py-2 text-[15px] flex justify-between ${hoverMode[theme.mode]()} ${className}`}
      onClick={onclick}
    >
      <div className="flex gap-2 items-center">
        <IconMenu icon={mark[`${date.mark}`]}></IconMenu>
        <span>{date.mark}</span>
      </div>
      <span>{getDay(date)}</span>
    </div>
  );
};
export default FormCalendar;
