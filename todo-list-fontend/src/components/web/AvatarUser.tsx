
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Info } from '../../redux/reducer/userSlice';
import axios from 'axios';
import { env } from '../../helper/env';
import { hoverMode } from '../../utils/theme';
import useTheme from '../../hooks/useTheme';
const removeDiacritics = (value: string) => {
    const arr = value.split(" ");
    const str = arr.length > 1  
                ? `${arr[0].split('')[0]}+${arr[arr.length -1].split('')[0]}`
                : `${arr[0].split('')[0]}`
    return  str;
}
function generatePopularColors() {
    const popularColors = [
      "FF5733", // Orange
      "3498DB", // Blue
      "9B59B6", // Purple
      "27AE60", // Green
      "F1C40F", // Yellow
      "E74C3C", // Red
      "1ABC9C"  // Teal
    ];
    return popularColors;
}
function random(){
    const arr = generatePopularColors();
    const random = Math.floor(Math.random() * (arr.length - 0 + 1) + 0)
    return arr[random];
}
export const getImageByName = async (name: string,imageRef: React.RefObject<HTMLImageElement>) => {
    
    
    try {
        const value = removeDiacritics(name);
        const length = value.indexOf("+") > 0 ? 2 : 1;
        const background = "FF5733";
        const api = `${env.VITE_API_AVATAR}/?api_key=${env.VITE_API_KEY}`;
        const response = await axios.get(`${api}&name=${value}&background_color=${background}&image_size=128&char_limit=${length}&is_bold=true&font_size=0.6`,{ responseType: 'blob' })
        const data = await new File([response.data],"data",  { type: "image/png" });
        const urlCreator = window.URL || window.webkitURL;
        console.log(urlCreator.createObjectURL(data));
        if(imageRef.current){
            imageRef.current.src = urlCreator.createObjectURL(data);
        }
        
        
        
    } catch (error) {
        console.log(error);
        
    }
}
const AvatarUser = ({info: {name,avatar} ,onClick}: &{info: Info , onClick: () => void}) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const {theme} = useTheme();
    useEffect(() => {
        
       
        if(!avatar ){
    
            getImageByName(name,imageRef);
        }
    },[avatar,imageRef])
    return (
        <div className={`flex gap-2 items-center ${theme.mode != "light" ? 'hover:bg-black' : "hover:bg-gray-200"} p-2 cursor-pointer transition-all rounded-lg`} onClick={onClick}>
             <img ref={imageRef} src={avatar} className='w-[32px] h-[32px] rounded-full'/>
            <h4>{name}</h4>
        </div>
    );
};

export default AvatarUser;