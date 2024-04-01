import { useEffect, useRef, useState } from "react";
import useTheme from "../../hooks/useTheme";
import { color, mode } from "../../redux/reducer/stateSlice";
import { bgColor, borderColor, textColor } from "../../utils/theme";
import ButtonForm from "../button/ButtonForm";

const SettingThemePage = () => {
    const {theme,updateMode,updateColor,confirmUpdate} = useTheme();
    const arrMode : mode[] = ["custom","light","dark"];
    const arrColor : color[] = ["todoist","moonstone", "tangerine"];
    const [isChange,setChange] = useState(false);
    const tempColor = useRef<color>(theme.color);
    useEffect(() => {
       
    },[])
    const onClick = (value: mode)=> {
        
        updateMode(value);
    }
    const chooseColor = (value: color) => {
        value != theme.color ? setChange(true) : setChange(false)
        updateColor(value);
    }
    console.warn(theme);
    const handleUpdate = () => {
        confirmUpdate();
        handleClose();
        tempColor.current = theme.color;
    }
    const handleClose = () => setChange(false);
    const handleCancel = () => {
        if(tempColor.current){
            chooseColor(tempColor.current)
            handleClose()
        }
    }
    return (
        <div className="py-4 px-2">
            <div className="mb-2">
                <h1 className="font-semibold mb-2">Your mode</h1>
               {
                arrMode.length > 0 && arrMode.map(mode => <GroupThemeMode isSelected={mode === theme.mode} title={mode} value={mode} onClick={() => onClick(mode)} />)
               }
            </div>
            <div>
                <h1 className="font-semibold mb-2">Your theme</h1>
                <div className="flex gap-4">
                {
                    arrColor.length > 0 && arrColor.map(color => <GroupThemeColor isSelected={color === theme.color} title={color} value={color} onClick={() => chooseColor(color)} />)
                }
                </div>
            </div>
            {isChange && <div className="flex justify-end">
                <ButtonForm title="Update" isAllow={true} clickCancle={handleCancel} clickSubmit={handleUpdate}/>
                </div>}
        </div>
    );
};
const GroupThemeColor = ({isSelected,title,value,onClick}: {isSelected:boolean, title: string,value: color,onClick: () => void}) => {
    return (
        <div className=" ">
            <label className={`flex h-[60px] w-[140px] cursor-pointer flex-col justify-center items-center rounded-lg border ${borderColor[value]}`}htmlFor={value}>
                <span>{title}</span>
                {isSelected && <span className={textColor[value]}><i className="fa-solid fa-check"></i></span>}
            </label>
            <input className="hidden" id={value} value={value} type="radio" checked={isSelected} onClick={onClick}/>
        </div>
    );
}
const GroupThemeMode= ({isSelected,title,value,onClick}: {isSelected:boolean, title: string,value: mode,onClick: () => void}) => {
    const {theme}  = useTheme();
    return (
        <div className="flex gap-2 items-center mb-2">
            <div className={`relative w-[40px] h-[20px] rounded-2xl  ${isSelected?  ' bg-gray-400' : ' bg-[#D7E7E7]'}`}>
                <div className={`
                    absolute top-[50%]  transition-all duration-2000 translate-y-[-50%] w-[22px] h-[22px] rounded-full   opacity-80
                    ${isSelected ?  `right-0 ${bgColor[theme.color]}` : `left-0  bg-white `}
                    `}
                    onClick = {onClick}>
                    <div className= 'absolute p-1 z-10 w-full h-full'></div>
                </div>
            </div>
            <input  id={value} className="hidden" value={value} type="radio" checked={isSelected} onClick={onClick}/>
            <label className={`flex h-[60px] w-[140px] cursor-pointer flex-col justify-center items-center rounded-lg border ${borderColor[value]}`}htmlFor={value}>
                <span>{title}</span>
            </label>
        </div>
    );
}
export default SettingThemePage;