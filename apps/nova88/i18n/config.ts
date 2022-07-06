import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import { siteInfo } from "../config"
import en from "./en.json"
import cs from "./cs.json"

const resources = {
	en: { translations: en },
	cs: { translations: cs },
}

i18next.use(initReactI18next).init({
	lng: siteInfo.defaultLang,
	fallbackLng: siteInfo.defaultLang,
	supportedLngs: siteInfo.defaultLangList,
	debug: process.env.NODE_ENV === "development",
	resources,
	defaultNS: "translations",
})

export default i18next
