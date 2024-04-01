import  { useState } from 'react';
import OAuth2 from '../components/auth/OAuth2';
import BaseForm, { FormData } from '../components/form/BaseForm';
import { Token, methodPost, setToken } from '../helper/api';
import { NavLink, useNavigate } from 'react-router-dom';
import BaseAuthPage from '../components/auth/BaseAuthPage';


const LoginPage = () => {
    const [isSubmitting,setSubmitting] = useState(false);
    const search = window.location.search;
    const url = new URLSearchParams(search);
    const param  = url.get("success_page");
    const enCodeParam = param &&  encodeURIComponent(param);
    const redirect = useNavigate();
    const handleLogin  = async (value : FormData)   => {
        try {
            setSubmitting(true);
            console.log(value);
            
            console.log(JSON.stringify(value));
            
            const response = await methodPost("/login",value);
            if(response.status === 200){
                const token : Token = response.data;
                setToken(token)
                console.log(param);
                if(param){
                    window.location.href = `${param}`
                }
                else{
                    redirect("/")
                }
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
                <h1 className='text-[28px] font-bold mb-10'>Log in</h1>
                <OAuth2></OAuth2>
            </div>
            <div className='mb-2'>
                <BaseForm isSubmitting={isSubmitting} onclick={handleLogin}></BaseForm>
            </div>
            <div>
                Don’t have an account? 
                <NavLink to={`/auth/register?success_page=${enCodeParam}`} className="underline" >Sign up</NavLink>
            </div>
        </BaseAuthPage>
    );
};

export default LoginPage;