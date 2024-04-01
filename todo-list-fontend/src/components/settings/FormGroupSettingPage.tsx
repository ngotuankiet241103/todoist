type FormGroupSettingPage = {
    title: string,
    onChange?: () => void,
    innerref: React.RefObject<HTMLInputElement>
    type: React.HTMLInputTypeAttribute | undefined
}
const FormGroupSettingPage = ({title,onChange,innerref,type}: FormGroupSettingPage) => {
    return (
        <div className='flex flex-col gap-2'>
            <span>{title}</span>
            <input ref={innerref} onChange={onChange} type={type} className='px-2 py-1 w-[240px] h-[32px] rounded-lg border border-gray-300 outline-none'/>
        </div>
    );
}
export default FormGroupSettingPage;