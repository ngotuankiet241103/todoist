
import { Info } from '../../redux/reducer/userSlice';

const AvatarUser = ({name,avatar}: Info) => {

    return (
        <div className='flex gap-4 items-center'>
            {avatar && <img src={avatar} className='w-[32px] h-[32px] rounded-full'/>}
            <h4>{name}</h4>
        </div>
    );
};

export default AvatarUser;