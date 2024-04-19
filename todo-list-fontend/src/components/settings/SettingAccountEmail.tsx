import  { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { state } from '../../redux/store';
import ButtonForm from '../button/ButtonForm';
import ErrorMessage from '../error/ErrorMessage';
import { updateMethod } from '../../helper/api';
import FormGroupSettingPage from './FormGroupSettingPage';
import HeaderAccountPage from './HeaderAccountPage';
const validateEmail = (email:string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
}
export  const handleBack = () => {
    history.back();
}
const SettingAccountEmail = () => {
    const user = useSelector((state: state) => state.user.profile);
    const emailRef = useRef<HTMLInputElement>(null);
    const confirmEmailRef = useRef<HTMLInputElement>(null); 
    const passwordRef = useRef<HTMLInputElement>(null);
    const [isAllow,setAllow] = useState(false);
    const [error,setError] = useState("");
    const [isNeedConnect,setNeedConnect] = useState(false);
   
    const handleChangeEmail = () => {
        async function updateEmail<T>(data: T){
            try {
                const response = await updateMethod("/users/profile/email",data);
                if(response && response.status === 200){
                    handleBack();
                    return;
                }
                setError(response?.data.message);
            } catch (error) {
                console.log(error);
                
            }
        }
        const value = getValueInput();
        if(value) {
            const {email,confirmEmail,password} = value;
            if(email != confirmEmail){
                setError("You confirmation email doesn't match your new email. Please try again.");
                return;
            }
            const data: {[key: string]: string} = {
                email,
                password
            }
            if(user?.connected){
                updateEmail(data);
            }
            else{
                setNeedConnect(true);
            }
            
        }
    }
   
    const handleAllowChange = () => {
        const value = getValueInput();
        if(value){
            const {email,confirmEmail,password} = value
            console.warn(password.length);
            
            if(validateEmail(email) && validateEmail(confirmEmail) && password.length >= 8){
                setAllow(true);
            }
           
        }
    }
    const getValueInput = () => {
        if(emailRef.current && confirmEmailRef.current && passwordRef.current){
            return {
                email: emailRef.current.value,
                confirmEmail: confirmEmailRef.current.value,
                password: passwordRef.current.value
            }
        }
        return null;
    }
    return (
        <div>
            <HeaderAccountPage title='Change email address' onClick={handleBack}/>
            <div>
                <p>Update the email you use for your Todoist account. Your email is currently {user?.email}.</p>

                <FormGroupSettingPage type='text' innerref={emailRef} title='New email'/>
                <FormGroupSettingPage type='text' innerref={confirmEmailRef} title='Confirm email'/>
                <FormGroupSettingPage type='password' onChange={handleAllowChange} innerref={passwordRef} title='Todoist password'/>
                {error && <ErrorMessage message={error}/>}
                {isNeedConnect && <div>
                        <p>You logined with facebook,google. To change email, you need to add password</p>
                    </div>}
                <div className='flex justify-end'>
                    <ButtonForm title='Change email' isAllow={isAllow} clickCancle={handleBack} clickSubmit={handleChangeEmail} ></ButtonForm>
                </div>
            </div>
        </div>
    );
};

export default SettingAccountEmail;