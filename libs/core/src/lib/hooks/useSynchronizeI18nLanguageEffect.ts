import { selectedLangId } from '@api'
import { useAppSelector } from '@operations'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * 自動同步 當前語系 與 userInfo 的 langId
 */
const useSynchronizeI18nLanguageEffect = () => {
	const { i18n } = useTranslation()
	const currentLanguage = i18n.language
	const langId = useAppSelector(selectedLangId)
	// 當前語系不符合 userLangId ，則設定語系
	useEffect(() => {
		if (currentLanguage !== langId) {
			i18n.changeLanguage(langId)
		}
	}, [currentLanguage, langId])
}

export { useSynchronizeI18nLanguageEffect }
