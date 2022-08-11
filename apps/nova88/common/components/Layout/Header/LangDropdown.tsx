import React, { useState, useRef, useEffect } from "react"
import { useOnClickOutside, useLocalStorage } from "usehooks-ts"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import classnames from "classnames"
import { useAppDispatch, useAppSelector } from "store"
import {
	selectedLangId,
	setLangId as setUserLangId,
	selectedIsLogin,
} from "service/slice/auth"
import { defLangOptions } from "./LangDropdown.def"
import { siteInfo } from "../../../../config"

const LangDropdown = () => {
	const { i18n } = useTranslation()
	const dispatch = useAppDispatch()
	const userLangId = useAppSelector(selectedLangId)
	const wrapper = useRef()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const isLogin = useSelector(selectedIsLogin)
	const [langId, setLangId] = useLocalStorage(
		"reward88-lang",
		siteInfo.defaultLang
	)

	useEffect(() => {
		if (isLogin) {
			setLangId(userLangId)
		}
	}, [])

	const toggleLangDropdown = () => setIsOpen(prev => !prev)

	const clickLang = (newLangId: string) => {
		if (langId !== newLangId) {
			setLangId(newLangId)
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

	const countryOptions = defLangOptions.map(langData => {
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
		defLangOptions.find(el => el.lang.find(lang => lang.value === langId))
			?.flag ?? ""

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
