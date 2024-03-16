import  { useRef, useState } from 'react';
import BaseAuthPage from './BaseAuthPage';
import Button from '../form/Button';

import ErrorNoti from '../form/ErrorNoti';
import requestApi from '../../helper/api';


const CreateName = () => {
    const [isSubmitting,setSubmitting] = useState(false);

    const [error,setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const handleUpdateInfo = async () => {
        if(!inputRef.current || !inputRef.current.value){
            setError("Field is required")
            return;
        }
        try {
            const value:string =  inputRef.current && inputRef.current.value;
            const data : {name: string} = {
                name: value
            }
            setSubmitting(true);
            const response = await requestApi("/users/profile/name","POST",data);
            console.log(response);
            if(response.status === 200){
                const search = window.location.search;
                const url = new URLSearchParams(search);
                const param = url.get("success_page");
                window.location.href = `${param}`;
            }
            
           
            
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <BaseAuthPage>
            <div className='flex flex-col gap-2'>
                <h1 className='text-[28px] font-bold mb-10'>Create your name</h1>
                <p>Please enter your name</p>
                <input ref={inputRef} type='text' className='px-2 py-2 border border-gray-400 rounded-lg w-full' placeholder='Enter your name' />
                {error && <ErrorNoti message={error}></ErrorNoti>}
                <Button onclick={handleUpdateInfo} classNames='bg-primary text-white font-bold w-full py-2 rounded-lg ' isSubmit={isSubmitting} content="Continue"></Button>
            </div>
          
        </BaseAuthPage>
    );
};

export default CreateName;