
import OAuth2List from './OAuth2List';
import google from '../../assets/google.png'
import facebook from '../../assets/facebook.png'
import { env } from '../../helper/env';

export type Login = {
    url: string,
    item: string
    icon: string
}

const list: Login[] = [
    {url: generateUrl(env.VITE_BASE_LOGIN,"google",env.VITE_REDICRECT_LOGIN),item: `Connect with google`,icon: `${google}`},
    {url: generateUrl(env.VITE_BASE_LOGIN,"faceboolk",env.VITE_REDICRECT_LOGIN),item: `Connect with facebook`,icon: `${facebook}`}
    
]
function generateUrl(urlLogin: string,provider:string,url_redirect: string) : string{
    return `${urlLogin}/${provider}?redirect_uri=${url_redirect}`
}
const OAuth2 = () => {
    
    
    return (
        <div>
            <OAuth2List list={list}></OAuth2List>
        </div>
    );
};

export default OAuth2;