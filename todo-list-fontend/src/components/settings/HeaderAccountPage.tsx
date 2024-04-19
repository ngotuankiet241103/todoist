

const HeaderAccountPage = ({title,onClick}: {title: string,onClick: () => void}) => {
    return (
        <div className='flex text-[16px] gap-2  px-2 py-3 border-b-2 border-gray-400'>
            <span className='cursor-pointer' onClick={onClick}><i className="fa-solid fa-arrow-left"></i></span>
            <span>{title}</span>
        </div>
    );
};

export default HeaderAccountPage;