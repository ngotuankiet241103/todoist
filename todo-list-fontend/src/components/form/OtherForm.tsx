import React from 'react';
import BoxTitle from './BoxTitle';
import useOpenModal from '../../hooks/useOpenModal';

const OtherForm = ({onclick}: {onclick: () => void}) => {
    const {isShow,handleToggleModel} = useOpenModal(false);
    return (
        <div className='relative'>
            <BoxTitle isBorder={true} className='px-2 py-2 text-[20px]' onClick={() => handleToggleModel()}>
                <i className="fa-solid fa-ellipsis"></i>
            </BoxTitle>
            {isShow && <ListOtherForm onClick={onclick}></ListOtherForm>}
        </div>
    );
};
const ListOtherForm = ({onClick}:{onClick: () => void}) => {
    return (
        <div className='absolute w-[300px] py-2 px-1 z-50 left-0 top-[40px] rounded-lg box-calen bg-white'>
            <div className='px-2 menu-hover rounded-md py-1 flex justify-between items-center'>
                <div className='flex gap-2' onClick={onClick}>
                    <span><i className="fa-solid fa-tag"></i></span>
                    <span>Label</span>
                </div>
                <span>@</span>
            </div>
        </div>
    );
}
export default OtherForm;