import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18nBackend from "i18next-http-backend";
import { env } from "./helper/env";
const getCurrentHost =
  import.meta.env.MODE === "development"
    ? env.VITE_BASE_URL_FONTEND
    : "LINK TO PROD";
i18n
  .use(initReactI18next)
  .use(i18nBackend)
  .init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  backend: {
    loadPath: `${getCurrentHost}/i18n/{{lng}}.json`,
  }
  
});

export default i18n;
