import React from 'react';
import useTheme from '../../hooks/useTheme';
import { bgColor } from '../../utils/theme';

const ButtonForm = ({isAllow,title,clickCancle,clickSubmit} : {
    isAllow: boolean
    title: string
    clickCancle: () => void;
    clickSubmit?: () => void;
  }) => {
    const {theme} = useTheme();
    return (
        <div className="mt-2 flex  gap-2">
        <button
          className={`px-2 py-1 rounded-lg ${bgColor[theme.color]} text-white text-[16px] ${
            !isAllow ? `cursor-not-allowed opacity-50` : `cursor-pointer`
          }`}
          onClick={clickSubmit}
        >
          {title}
        </button>
        <button
          className="px-2 py-1 rounded-lg bg-gray-200 text-[16px]"
          onClick={clickCancle}
        >
          Cancel
        </button>
      </div>
    );
};

export default ButtonForm;