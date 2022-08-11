import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import { siteInfo } from "../config"
import en from "./en.json"
import cs from "./cs.json"
import my from "./my.json"
import th from "./th.json"
import id from "./id.json"

const resources = {
	en: { translations: en },
	cs: { translations: cs },
	my: { translations: my },
	th: { translations: th },
	th_en: { translations: en },
	id: { translations: id },
	id_en: { translations: en },
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
