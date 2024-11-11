import { useState } from 'react';
import { Token, methodPost, setToken } from '../helper/api';
import BaseForm from '../components/form/BaseForm';
import BaseAuthPage from '../components/auth/BaseAuthPage';
import OAuth2 from '../components/auth/OAuth2';
import { NavLink, redirect } from 'react-router-dom';


const RegisterPage = () => {
    const [isSubmitting,setSubmitting] = useState(false);
    const search = window.location.search;
    const url = new URLSearchParams(search);
    const param  = url.get("success_page");
    const enCodeParam = param &&  encodeURIComponent(param);
    const handleLogin = async (value : FormData)  => {
        try {
            setSubmitting(true)
            const response = await methodPost("/auth/sign-up",value)
            console.log(response);
            
            if(response.status === 200){
                const token : Token = response.data;
                setToken(token);
                window.location.href =  `/auth/create-name?success_page=${enCodeParam}`;
            }
        } catch (error) {
            console.log(error);
            
        }
        finally{
            setSubmitting(false);

        }
        
    }
    return (
        <BaseAuthPage>
            <div className='mb-10'>
                <h1 className='text-[28px] font-bold mb-10'>Sign up</h1>
                <OAuth2></OAuth2>
            </div>
            <div className='mb-2'>
                <BaseForm isSubmitting={isSubmitting} onclick={handleLogin}></BaseForm>
            </div>
            <div>
                Don’t have an account? 
                <NavLink to={`/auth/login?success_page=${enCodeParam}`} className="underline" >Log in</NavLink>
            </div>
        </BaseAuthPage>
    );
};

export default RegisterPage;