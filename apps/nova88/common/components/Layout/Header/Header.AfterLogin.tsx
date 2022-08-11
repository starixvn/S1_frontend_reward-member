import React, { useState, useRef } from "react"
import classnames from "classnames"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "store"
import { useSelector } from "react-redux"
import { useOnClickOutside } from "usehooks-ts"
import { useTranslation } from "react-i18next"
import { logoutAsync } from "service/slice/auth/thunk"
import { selectedProfile, selectedLangId } from "service/slice/auth"
import { imageUrl } from "config"
import { useGetPointBalanceQuery } from "service/api/storeApi"
import LangDropdown from "./LangDropdown"
import ShoppingCart from "./ShoppingCart"
import { paths } from "common/constants"

const HeaderAfterLogin = () => {
	const { t } = useTranslation()
	const profile = useSelector(selectedProfile)
	const dispatch = useAppDispatch()
	const langId = useAppSelector(selectedLangId)
	const { data: { data: { pointBalance } = {} } = {} } =
		useGetPointBalanceQuery(null)

	const userMenuWrapper = useRef()
	const [isUserMenuOpen, setUserMenuIsOpen] = useState<boolean>(false)

	const handleLogout = async () => {
		await dispatch(logoutAsync())
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
					{pointBalance ?? 0}
				</a>
			</Link>
			<div
				className="memberFile"
				onClick={toggleUserMenuDropdown}
				ref={userMenuWrapper}>
				<div className="vipAnimation">
					<a>
						<img
							src={`${imageUrl}/img/vip0${profile.userLevel}.png`}
							alt="vip"
						/>
					</a>
				</div>
				<div className="memberID">
					<button className="icon-keyboard_arrow_down">
						{profile.userName}
					</button>
					<div className={classnames("submenu", { active: isUserMenuOpen })}>
						<Link href={paths.about.sub.points.root}>{t("MY_POINTS")}</Link>
						<Link href={paths.about.sub.purchase.root}>{t("My_PURCHASE")}</Link>
					</div>
				</div>
			</div>
			<a className="icon icon-email">
				<div className="msgPop" style={{ display: "none" }}>
					<div>{t("WeeklyRetentionBonus")}</div>
					<button className="icon icon-close"></button>
				</div>
			</a>
			<LangDropdown />
			<ShoppingCart />
			<button onClick={handleLogout} className="icon icon-exit" />
			<Link href={`/${langId}`} className="novaLogo">
				<img src={`${imageUrl}/img/novalogo.png`} alt="any" />
			</Link>
		</>
	)
}

export default HeaderAfterLogin
