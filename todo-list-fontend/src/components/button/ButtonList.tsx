import React from "react";
type ButtonList = {
    clickCancle: () => void,
    clickSubmit: () => void,
    isAllow: boolean
    isUpdated?: boolean
}
const ButtonList = ({clickCancle,clickSubmit,isAllow,isUpdated}: ButtonList) => {
  return (
    <div className="flex gap-4">
      <button
        className="px-4 py-2 rounded-lg bg-gray-200 text-[16px]"
        onClick={clickCancle}
      >
        Cancel
      </button>
      <button
        className={`px-4 py-2 rounded-lg bg-primary text-white text-[16px] ${
          !isAllow ? `cursor-not-allowed opacity-50` : `cursor-pointer`
        }`}
        onClick={clickSubmit}
      >
        {isUpdated ? "Save" : "Add task"}
      </button>
    </div>
  );
};

export default ButtonList;
