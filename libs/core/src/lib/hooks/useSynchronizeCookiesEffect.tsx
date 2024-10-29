import { selectedCurrencyId, selectedLangId } from '@api'
import { ENV_COOKIE_NAMES } from '@constants'
import { useAppSelector } from '@operations'
import { getCookie, setCookie } from 'cookies-next'
import { useEffect } from 'react'

/**
 * 自動同步 Cookie 與 userInfo 的 langId 和 currencyId
 */
export const useSynchronizeCookiesEffect = () => {
	const langId = useAppSelector(selectedLangId)
	const currencyId = useAppSelector(selectedCurrencyId)
	const cookieLangId = String(getCookie(ENV_COOKIE_NAMES.LangId))
	const cookieCurrencyId = Number(getCookie(ENV_COOKIE_NAMES.CurrencyId))
	// 語系或幣別有變化則同步 Cookie
	useEffect(() => {
		if (cookieLangId === langId && cookieCurrencyId === currencyId) {
			return
		}
		setCookie(ENV_COOKIE_NAMES.LangId, langId)
		setCookie(ENV_COOKIE_NAMES.CurrencyId, currencyId)
	}, [cookieLangId, cookieCurrencyId, langId, currencyId])
}
