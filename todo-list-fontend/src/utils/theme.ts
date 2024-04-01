export const color = {
    todoist: "primary",
    moonstone: "secondary",
    tangerine: "thirdary"
}
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
    dark: () => 'bg-black',
    custom: () => {
        const date = new Date();
        const time =  date.getTime();
        return time > 18 ? 'bg-black' : 'bg-white'
    }
}
export const textMode =  {
    light: () => 'text-black',
    dark: () => 'text-white',
    custom: () => {
        const date = new Date();
        const time =  date.getTime();
        return time > 18 ? 'text-white' : 'text-black'
    }
}
export const sidebarMode = {
    light: () => 'bg-second',
    dark: () => 'bg-sidebarDark',
    custom: () => {
        const date = new Date();
        const time =  date.getTime();
        console.warn(time);
        
        return time > 18 ? 'bg-sidebarDark' : 'bg-second'
    }
}
export const hoverMode = {
    light: () => 'hover:bg-gray-100 transition-all cursor-pointer ',
    dark: () => 'hover:bg-black transition-all cursor-pointer',
    custom: () => {
        const date = new Date();
        const time =  date.getTime();
        console.warn(time);
        
        return time > 18 ? 'hover:bg-gray-100 transition-all cursor-pointer ': 'hover:bg-black transition-all cursor-pointer'
    }
}
export const hoverColor = {
    todoist: () => 'hover:bg-primary transition-all cursor-pointer ',
    moonstone: () => 'hover:bg-secondary transition-all cursor-pointer',
    tangerine: () => 'hover:bg-thirdary transition-all cursor-pointer '
    
}