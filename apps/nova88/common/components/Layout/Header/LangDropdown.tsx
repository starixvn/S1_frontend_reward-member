import React, { useState, useRef, useMemo } from "react"
import { useOnClickOutside, useLocalStorage } from "usehooks-ts"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import classnames from "classnames"
import { useAppDispatch, useAppSelector } from "store"
import {
	setLangId as setUserLangId,
	selectedIsLogin,
	selectedCurrencyId,
} from "service/slice/auth"
import { defLangOptions } from "./LangDropdown.def"
import some from "lodash/some"
import { filter } from "lodash"
import { REWARD88_LANG } from "common/constants/localStorage"

const LangDropdown = () => {
	const { i18n } = useTranslation()
	const dispatch = useAppDispatch()
	const currencyId = useAppSelector(selectedCurrencyId)
	const wrapper = useRef()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const isLogin = useSelector(selectedIsLogin)
	const [localStorageLangId, setLocalStorageLangId] = useLocalStorage(
		REWARD88_LANG,
		null
	)

	const toggleLangDropdown = () => setIsOpen(prev => !prev)

	const clickLang = (newLangId: string) => {
		if (localStorageLangId !== newLangId) {
			setLocalStorageLangId(newLangId)
			i18n.changeLanguage(newLangId)
			if (isLogin) {
				dispatch(setUserLangId(newLangId))
			}
		}
		setIsOpen(false)
	}

	const handleClickOutside = () => {
		setIsOpen(false)
	}

	useOnClickOutside(wrapper, handleClickOutside)

	const langOptions = some(defLangOptions, { currencyId })
		? filter(defLangOptions, { currencyId })
		: defLangOptions

	const countryOptions = langOptions.map(langData => {
		const langOptions = langData.lang.map(el => (
			<button key={el.value} onClick={() => clickLang(el.value)}>
				{el.displayText}
			</button>
		))

		return (
			<>
				<div className="countryName">{langData.countryName}</div>
				<div className={`flag ${langData.flag}`}>{langOptions}</div>
			</>
		)
	})

	const flagIcon =
		isLogin && currencyId
			? langOptions[0].flag
			: defLangOptions.find(el =>
					el.lang.find(lang => lang.value === i18n.language)
			  )?.flag ?? ""

	return (
		<div className="country" ref={wrapper}>
			<button className={`flag ${flagIcon}`} onClick={toggleLangDropdown} />
			<div className={classnames("countryList", { active: isOpen })}>
				{countryOptions}
			</div>
		</div>
	)
}

export default LangDropdown
