import { color } from "../redux/reducer/stateSlice"


export const textColor = {
    todoist: "text-primary",
    moonstone: "text-secondary",
    tangerine: "text-thirdary"
}
export const bgColor = {
    todoist: "bg-primary",
    moonstone: "bg-secondary",
    tangerine: "bg-thirdary"
}
export const borderColor = {
    todoist: "border-primary",
    moonstone: "border-secondary",
    tangerine: "border-thirdary"
}
export const bgMode =  {
    light: () => 'bg-white',
    dark: () => 'bg-[#1E1E1E]',
    custom: () => {
        const date = new Date();
        const time =  date.getHours();
        return time > 18 ? 'bg-[#1E1E1E]' : 'bg-white'
    }
}
export const textMode =  {
    light: () => 'text-black',
    dark: () => 'text-white',
    custom: () => {
        const date = new Date();
        const time =  date.getHours();
        return time > 18 ? 'text-white' : 'text-black'
    }
}
export const sidebarMode = {
    light: () => 'bg-second',
    dark: () => 'bg-sidebarDark',
    custom: () => {
        const date = new Date();
        const time =  date.getHours();
        
        return time > 18 ? 'bg-sidebarDark' : 'bg-second'
    }
}
export const hoverMode = {
    light: () => 'hover:bg-gray-100 transition-all cursor-pointer ',
    dark: () => 'hover:bg-dark transition-all cursor-pointer',
    custom: () => {
        const date = new Date();
        const time =  date.getHours();
        
        return time < 18 ? 'hover:bg-gray-100 transition-all cursor-pointer ': 'hover:bg-[#1E1E1E] transition-all cursor-pointer'
    }
}
export const hoverColor = {
    todoist: () => 'hover:bg-primary transition-all cursor-pointer ',
    moonstone: () => 'hover:bg-secondary transition-all cursor-pointer',
    tangerine: () => 'hover:bg-thirdary transition-all cursor-pointer '
    
}
export const hoverBox = {
    light: () => `hover:bg-gray-200 transition-all cursor-pointer `,
    dark: () => `hover:bg-dark transition-all cursor-pointer`,
    custom: () => {
        const date = new Date();
        const time =  date.getHours();
        
        return time < 18 ? 'hover:bg-gray-200 transition-all cursor-pointer ': 'hover:bg-dark transition-all cursor-pointer'
    }
}
export const hoverMenu = {
    light: () => `hover:bg-gray-200 transition-all cursor-pointer `,
    dark: (color: color) => `hover:${bgColor[color]} transition-all cursor-pointer`,
    custom: (color: color) => {
        const date = new Date();
        const time =  date.getHours();
        
        return time < 18 ? 'hover:bg-gray-200 transition-all cursor-pointer ': `hover:${bgColor[color]} transition-all cursor-pointer`
    }
}
