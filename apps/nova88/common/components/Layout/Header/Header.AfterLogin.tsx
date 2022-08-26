import React, { useState, useRef } from "react"
import classnames from "classnames"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "store"
import { useSelector } from "react-redux"
import { useLocalStorage, useOnClickOutside } from "usehooks-ts"
import { useTranslation } from "react-i18next"
import { logoutAsync } from "service/slice/auth/thunk"
import { selectedProfile, selectedLangId, setIsLogin } from "service/slice/auth"
import { imageUrl, siteInfo } from "config"
import LangDropdown from "./LangDropdown"
import ShoppingCart from "./ShoppingCart"
import { paths } from "common/constants"
import { REWARD88_LANG } from "common/constants/localStorage"
import { selectedPointBalance } from "service/slice/cart"
import { numberFormat } from "common/utils/func"

const HeaderAfterLogin = () => {
	const { t, i18n } = useTranslation()
	const profile = useSelector(selectedProfile)
	const dispatch = useAppDispatch()
	const [cartList, setCartList] = useLocalStorage("nova88Cart", [])
	const langId = useAppSelector(selectedLangId)
	const pointBalance = useAppSelector(selectedPointBalance)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [localStorageLangId, setLocalStorageLangId] = useLocalStorage(
		REWARD88_LANG,
		null
	)
	const userMenuWrapper = useRef()
	const [isUserMenuOpen, setUserMenuIsOpen] = useState<boolean>(false)

	const handleLogout = async () => {
		await dispatch(logoutAsync())
		dispatch(setIsLogin(false))
		setCartList([])
		// * 登入及登出後重置語系
		i18n.changeLanguage(siteInfo.defaultLang)
		setLocalStorageLangId(null)
	}

	const toggleUserMenuDropdown = () => setUserMenuIsOpen(prev => !prev)

	const handleClickOutside = () => {
		setUserMenuIsOpen(false)
	}

	useOnClickOutside(userMenuWrapper, handleClickOutside)

	return (
		<>
			<Link href={paths.about.sub.points.root}>
				<a className="icon icon-diamond">
					<span>{t("RewardPoints")}</span>
					{numberFormat(pointBalance ?? 0, 0, false)}
				</a>
			</Link>
			<div className="memberFile" ref={userMenuWrapper}>
				<Link href={paths.about.sub.points.root}>
					<div className="vipAnimation">
						<a>
							<img
								src={`${imageUrl}/img/vip0${profile.userLevel}.png`}
								alt="vip"
							/>
						</a>
					</div>
				</Link>
				<div onClick={toggleUserMenuDropdown} className="memberID">
					<button className="icon-keyboard_arrow_down">
						{profile.userName}
					</button>
					<div className={classnames("submenu", { active: isUserMenuOpen })}>
						<Link href={paths.about.sub.points.root}>
							{t("MyPoints").toUpperCase()}
						</Link>
						<Link href={paths.about.sub.purchase.root}>{t("MyPurchase")}</Link>
					</div>
				</div>
			</div>
			<button onClick={handleLogout} className="icon icon-exit" />

			<LangDropdown />
			<ShoppingCart />

			<a href={`/${langId}`} target="_blank" rel="noreferrer">
				<img
					className="novaLogo"
					src={`${imageUrl}/img/novalogo.png`}
					alt="any"
				/>
			</a>
		</>
	)
}

export default HeaderAfterLogin
