import {
	getCustProfileAsync,
	selectedIsLogin,
	selectedProfile,
	setCurrencyId as setUserCurrencyId,
	setLangId as setUserLangId,
	useSetLanguageMutation,
} from '@api'
import { CURRENCY_TO_LANG_KEY, IStaticLangGroups } from '@constants'
import { useAppDispatch, useAppSelector } from '@operations'
import { isEqual } from 'lodash'
import { useEffect, useState } from 'react'

/**
 * @description 處理設置語系相關邏輯
 * @example
 * ```
 * const { icon, languageGroup, onSetLanguage } = useLanguageGroup()
 * ```
 */
const useLanguageGroup = (LANG_GROUPS: IStaticLangGroups) => {
	const dispatch = useAppDispatch()

	const isLogin = useAppSelector(selectedIsLogin)
	const profile = useAppSelector(selectedProfile)
	const { currencyId: currentCurrency, langId: currentLang } = profile

	const [icon, setIcon] = useState<string | null>(null)
	const [languageGroup, setLanguageGroup] =
		useState<IStaticLangGroups>(LANG_GROUPS)

	const [setLanguage] = useSetLanguageMutation()

	const onSetLanguage = async ({
		langCode,
		currencyId,
	}: {
		langCode: string
		currencyId: number
	}) => {
		// 選擇沒變則 return
		if (currencyId === currentCurrency && langCode === currentLang) return
		// 登入呼叫 setLanguage api，並且 呼叫 getCustProfile api 更新 userInfo
		// 未登入則手動更新 userInfo 語系及幣別
		if (isLogin) {
			await setLanguage({ langId: langCode }).unwrap()
			await dispatch(getCustProfileAsync())
		} else {
			dispatch(setUserLangId(langCode))
			dispatch(setUserCurrencyId(currencyId))
		}
	}

	useEffect(() => {
		const langKey = CURRENCY_TO_LANG_KEY[currentCurrency]

		if (isLogin) {
			// 登入後針對 langGroup 做篩選
			setLanguageGroup({ [langKey]: LANG_GROUPS[langKey] })
			// 未登入加入比對當前 langGroup 是否與初始 langGroup 相同，減少重複渲染
		} else if (!isEqual(languageGroup, LANG_GROUPS)) {
			// 若不相符才 reset 至 LANG_GROUPS
			setLanguageGroup(LANG_GROUPS)
		}

		if (langKey !== icon) {
			setIcon(langKey)
		}
	}, [isLogin, currentCurrency])

	return { icon, languageGroup, onSetLanguage }
}

export { useLanguageGroup }
