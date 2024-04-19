
import { LANGUAGES } from "../../constaints/languages";
import useLanguage, { Language } from "../../hooks/useLanguage";
import CompoSettingPage from "./CompoSettingPage";
import FrameSettingPage from "./FrameSettingPage";
import { bgMode, borderMode, hoverMode, sidebarMode } from "../../utils/theme";
import useTheme from "../../hooks/useTheme";
import useOpenModal from "../../hooks/useOpenModal";
import { useState } from "react";
import ButtonForm from "../button/ButtonForm";

const SettingGeneralPage = () => {
  const {language, setLanguage, handleSetLanguege} = useLanguage();
  const [isChange,setChange] = useState(false);
  const {theme} = useTheme();
  const onChooseLang = (langCode: Language) => {
    handleToggleModel();
    setLanguage(langCode);
    setChange(true);
  };
  const {isShow,handleToggleModel} = useOpenModal(false);
  const handleSaveSetting = () => {
    handleSetLanguege(language);
    setChange(false);
  }
  return (
    <FrameSettingPage isScroll={false} title="General">
       <div className="flex flex-col justify-between h-[80vh]">
            <CompoSettingPage title="Language">
                <div className="relative">
                    <div className={`w-full border ${hoverMode[theme.mode]()} hover:opacity-95 ${borderMode[theme.mode]()} rounded-lg p-2 flex justify-between`} onClick={handleToggleModel}>
                        <span>{language.label}</span>
                        <span><i className="fa-solid fa-chevron-down"></i></span>
                    </div>
                    {isShow && <LangList langSelect={language.code} onClick={onChooseLang}/>}
                </div>
            </CompoSettingPage>
            {isChange && <ButtonForm title="Update" isReverse={true} clickCancle={() => setChange(false)} isAllow={true} clickSubmit={handleSaveSetting}></ButtonForm>}
       </div>
    </FrameSettingPage>
  );
};
const LangList = ({langSelect,onClick} : {langSelect: string,onClick: (value: Language) => void}) => {
    const {theme} = useTheme();
    return (
        <>
            <div className={`${sidebarMode[theme.mode]()} box-calen py-2 absolute top-[100%] mt-2 left-0 w-full flex flex-col gap-2 rounded-lg`}>
                {LANGUAGES.map((lang ) => <div className={`cursor-pointer px-4 py-1 rounded-lg ${hoverMode[theme.mode]()} ${langSelect===lang.code ? `${bgMode[theme.mode]()}` : ''}`} onClick={() => onClick(lang)}>{lang.label}</div>)}
            </div>
        </>
    ); 
}
export default SettingGeneralPage;
