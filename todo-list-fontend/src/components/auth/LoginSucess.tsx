import  {  useLayoutEffect } from 'react';
import { Token, setToken } from '../../helper/api';
import { useNavigate } from 'react-router-dom';

const LoginSucess = () => {
    const url = window.location.search;
    const param = new URLSearchParams(url);
    const accToken  = param.get("token");
    const redirect = useNavigate();
    const token : Token = {
        access_token: accToken,
        refresh_token: accToken
    }
    setToken(token);
    useLayoutEffect(() => {
        redirect("/app/today")
    },[])
   
    return (
        <div>
            
        </div>
    );
};

export default LoginSucess;