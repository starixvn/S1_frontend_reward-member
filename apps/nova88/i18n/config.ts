import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { siteInfo } from '../config'
import bd from './bd.json'
import br from './br.json'
import cs from './cs.json'
import en from './en.json'
import hi from './hi.json'
import id from './id.json'
import jp from './jp.json'
import kh from './kh.json'
import ko from './ko.json'
import my from './my.json'
import th from './th.json'
import vn from './vn.json'

const resources = {
	bd: { translations: bd },
	cs: { translations: cs },
	en: { translations: en },
	hi: { translations: hi },
	id: { translations: id },
	kh: { translations: kh },
	my: { translations: my },
	th: { translations: th },
	vn: { translations: vn },
	jp: { translations: jp },
	ko: { translations: ko },
	br: { translations: br },
}

i18next.use(initReactI18next).init({
	fallbackLng: siteInfo.defaultLang,
	supportedLngs: siteInfo.defaultLangList,
	debug: process.env.NODE_ENV === 'development',
	resources,
	defaultNS: 'translations',
})

export default i18next
