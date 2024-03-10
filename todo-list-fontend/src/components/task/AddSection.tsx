import React, { useRef, useState } from "react";
type AddSection = {
  clickCancle: () => void;
  clickSubmit: (value: string) => void;
};
const AddSection = ({ clickCancle, clickSubmit }: AddSection) => {
  const [isAllow, setAllow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const hanldeInputChange = () => {
    if (inputRef.current) {
      if (inputRef.current.value) {
        setAllow(true);
      } else {
        setAllow(false);
      }
    }
  };
  const handleAddSection = () => {
    if (inputRef.current) {
        if (inputRef.current.value) {
            clickSubmit(inputRef.current.value);
        }
      }
  }
  return (
    <div className="">
      <input
        onChange={hanldeInputChange}
        ref={inputRef}
        type="text"
        className="px-2 py-1 rounded-lg font-semibold w-full outline-none border border-gray-400"
        placeholder="Name this section"
        
      />
      <div className="mt-2 flex  gap-2">
        <button
          className={`px-4 py-2 rounded-lg bg-primary text-white text-[16px] ${
            !isAllow ? `cursor-not-allowed opacity-50` : `cursor-pointer`
          }`}
          onClick={handleAddSection}
        >
          Add section
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-gray-200 text-[16px]"
          onClick={clickCancle}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddSection;
