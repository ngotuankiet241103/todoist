type flag ={
    [key: string]: string
}
export const flag : flag = {
    "default": `fa-regular fa-flag text-gray-400`,
    "low": `fa-solid fa-flag text-blue-600`,
    "medium": `fa-solid fa-flag text-orange-500-`,
    "high": `fa-solid fa-flag text-red-500`
}
export const colorPriority : flag = {
    "default": `gray`,
    "low": ` blue`,
    "medium": `orange`,
    "high": `red`
}
export const bgColorPriority : flag = {
    "default": `white`,
    "low": ` blue-400`,
    "medium": `orange-400`,
    "high": `red-400`
}