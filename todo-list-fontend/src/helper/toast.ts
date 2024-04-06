
import {  toast , Slide, ToastPosition} from 'react-toastify';

const toastMessage = (type: "success" | "error" ,message: string,onClose?: () => void,time: number =1000,postion: ToastPosition = "bottom-left") => {
    toast[type](message, {
        position: postion,
        autoClose: time,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
        onClose
    })
   
};

export default toastMessage;