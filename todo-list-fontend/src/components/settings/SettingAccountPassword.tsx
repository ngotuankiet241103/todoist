import { useSelector } from "react-redux";
import { state } from "../../redux/store";
import HeaderAccountPage from "./HeaderAccountPage";
import { handleBack } from "./SettingAccountEmail";
import FormGroupSettingPage from "./FormGroupSettingPage";
import { useRef, useState } from "react";
import ButtonForm from "../button/ButtonForm";
import { updateMethod } from "../../helper/api";
import ErrorMessage from "../error/ErrorMessage";

const SettingAccountPassword = () => {
    const user = useSelector((state: state) => state.user.profile);
    const [isAllow,setAllow] = useState(false);
    const [error,setError] = useState("");
    const passwordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const confirmPassword = useRef<HTMLInputElement>(null);
    const handleSavePassword = () => {
        async function updatePassword<T>(isUpdate: boolean,data: T){
            try {
                let response = null;
                if(isUpdate){
                    response = await updateMethod("/users/profile/password",data); 
                }
                else{
                    response = await updateMethod("/users/profile/password/add",data);

                }
                if(response && response.status === 200){
                    handleBack();
                }
            } catch (error) {
                console.log(error);
                
            }

        }
        const value = getValueInput();
        if(value ){
            const {password,newPassword,confirmPassword} = value;
            if(newPassword !== confirmPassword){
                setError("You confirmation password doesn't match your new password. Please try again.");
                return;
            }
            if(newPassword.length < 8){
                setError("Your password must be at least 8 characters long");
                return;
            }
            if(!check()){
                setError("Your password must be at least 8 characters long");
            }
            let data = {};
            if(user?.connected){
                data = {
                    ...data,
                    password
                }
            }
            data = {
                ...data,
                newPassword
            }
            updatePassword(user?.connected || false,data);

        }
    }
    const getValueInput = () => {
        let value : {[key:string]: string} = {};
        if(user?.connected){
            if(passwordRef.current){
                value = {
                    ...value,
                    password: passwordRef.current.value
                }
            }
        }
        if(newPasswordRef.current && confirmPassword.current){
            value = {
                ...value,
                newPassword: newPasswordRef.current.value,
                confirmPassword: confirmPassword.current.value
            }
        }
        return value;
    }
    const check = () => {
        const value = getValueInput();
        if(value){
            const {password,newPassword,confirmPassword} = value;
            setAllow(false);
            setError("")
            if(user?.connected){
                if(password.length < 8){
                    return false;
                }
            }
            else {
                if(newPassword.length < 8){{
                    return false;
                }
            }
            if(confirmPassword.length < 8){
                return false;
            }
            setAllow(true);
            return true;
        }    
        }
    }
    const handleOnChange = () => {
        check();
        setError("")
    }
    return (
        <div >
            <HeaderAccountPage onClick={handleBack} title={user?.connected ? 'Change password' : 'Add password'}/>
            <div>
                {user?.connected && <FormGroupSettingPage type="password" onChange={handleOnChange} innerref={passwordRef} title="Current password"/>}
                <FormGroupSettingPage type="password" onChange={handleOnChange} title={'New password'} innerref={newPasswordRef}/>
                <FormGroupSettingPage type="password" onChange={handleOnChange} title={'Cofirm new password'} innerref={confirmPassword}/>
                <span className="text-gray-300 block">Your password must be at least 8 characters long. Avoid common words or patterns.</span>
                {error && <ErrorMessage message={error}/>}
                <div className="flex justify-end">
                    <ButtonForm title={user?.connected ? 'Change password' : 'Add password'} isAllow={isAllow} clickCancle={handleBack} clickSubmit={isAllow?handleSavePassword:undefined} ></ButtonForm>
                </div>

            </div>
        </div>
    );
};

export default SettingAccountPassword;