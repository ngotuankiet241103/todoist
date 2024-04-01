import { Info } from '../../redux/reducer/userSlice';


const FooterAccountSetting = ({user}: {user: Info}) => {
    const TitleFooter = () => {
        return (
            <div className='text-[14px] flex flex-col gap-2'>
                <span className='text-gray-300 text-[12px]'>Log in to Todoist with your Google, Facebook, or Apple account.</span>
                {user.provider != "local" && <span>You can log in to Todoist with your {user.provider} account {user.email}.</span>}
                {!user.connected && <p>Your password is not set, so we cannot disconnect you from your {user.provider} account. If you want to disconnect, please set up your password first.</p>}
                
            </div>
        );
    }
    return (
        <div>
            <div className='font-semibold'>Connected accounts</div>
            <TitleFooter/>
        </div>
    );
};

export default FooterAccountSetting;