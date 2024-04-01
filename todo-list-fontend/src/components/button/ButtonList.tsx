import useTheme from "../../hooks/useTheme";
import { bgColor } from "../../utils/theme";

type ButtonList = {
    clickCancle: () => void,
    clickSubmit: () => void,
    isAllow: boolean
    isUpdated?: boolean
    isList: boolean;
    
}
const ButtonList = ({clickCancle,clickSubmit,isAllow,isUpdated,isList}: ButtonList) => {
  const {theme} = useTheme();
  return (
    <div className="flex gap-4">
      <button
        className={`${isList ? 'px-4 text-[16px]': 'px-2 text-[20px] font-thin'} py-1 rounded-lg bg-gray-200 `}
        onClick={clickCancle}
      >
        {!isList ? <i className="fa-solid fa-xmark "></i> : "Cancel"}
      </button>
      <button
        className={`${isList ? 'px-4 text-[16px] ': 'px-2 text-[20px]'} py-1 rounded-lg ${bgColor[theme.color]} text-white  ${
          !isAllow ? `cursor-not-allowed opacity-50` : `cursor-pointer`
        }`}
        onClick={clickSubmit}
      >
        {isUpdated ? "Save" : isList ? "Add task" : <i className="fa-solid fa-paper-plane"></i>}
      </button>
    </div>
  );
};

export default ButtonList;
