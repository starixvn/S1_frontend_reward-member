import { selectedIsLogin, selectedLangId } from '@api'
import { REWARD88_LANG } from '@constants'
import { useAppSelector } from '@operations'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocalStorage } from 'usehooks-ts'

// *  維持語系當前狀態
const useInitI18nLanguageEffect = () => {
	const { i18n } = useTranslation()
	const isLogin = useAppSelector(selectedIsLogin)
	const userLangId = useAppSelector(selectedLangId)
	const [localStorageLangId] = useLocalStorage(REWARD88_LANG, null)

	useEffect(() => {
		if (localStorageLangId) {
			if (isLogin) {
				i18n.changeLanguage(localStorageLangId ?? userLangId)
			} else {
				i18n.changeLanguage(localStorageLangId)
			}
		}
	}, [])
}

export { useInitI18nLanguageEffect }
