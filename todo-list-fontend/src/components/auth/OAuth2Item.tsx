import { Login } from './OAuth2';

const OAuth2Item = (props : {item:Login} ) => {
   const {item} = props
    return (

           <a href={item.url}>
                <div className='flex justify-center py-2 items-center gap-4 mb-2 rounded-md hover:bg-gray-200 transition-all border border-gray-100'>
                    <img className='w-[26px]' srcSet={item.icon}/>
                    <span className='font-semibold'>{item.item}</span>
                </div>
           </a>
        
    );
};

export default OAuth2Item;