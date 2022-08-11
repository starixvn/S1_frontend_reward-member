import React from "react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { usePopBox } from "common/hooks"
import { useAppSelector } from "store"
import { selectedLangId } from "service/slice/auth"
import LangDropdown from "./LangDropdown"
import ShoppingCart from "./ShoppingCart"
import { imageUrl } from "../../../../config"

const HeaderBeforeLogin = () => {
	const { t } = useTranslation()
	const langId = useAppSelector(selectedLangId)
	const { setPopBoxType } = usePopBox()

	return (
		<>
			<a className="icon icon-email">
				<div className="msgPop" style={{ display: "none" }}>
					<div>{t("WeeklyRetentionBonus")}</div>
					<button className="icon icon-close"></button>
				</div>
			</a>
			<LangDropdown />
			<ShoppingCart />
			<Link className="novaLogo" href={`/${langId}`}>
				<img src={`${imageUrl}/img/novalogo.png`} alt="" />
			</Link>
			<button
				className="login"
				onClick={() => {
					setPopBoxType({
						type: "login",
					})
				}}>
				{t("Login").toUpperCase()}
			</button>
		</>
	)
}

export default HeaderBeforeLogin
