import { useState } from 'react';
type toggleModal = {
    isShow: boolean,
    handleToggleModel: () => void
}
const useOpenModal = (initValue: boolean) : toggleModal => {
    const [isShow,setShow] = useState(initValue);
    const handleToggleModel= () => setShow(!isShow);
    return {isShow,handleToggleModel};
};

export default useOpenModal;