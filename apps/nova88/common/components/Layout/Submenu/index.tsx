import React, { FC, useState } from "react"
import Link from "next/link"
import classnames from "classnames"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import {
	selectedIsLogin,
	selectedProfile,
	setIsLogin,
} from "service/slice/auth"
import { logoutAsync } from "service/slice/auth/thunk"
import { useAppDispatch, useAppSelector } from "store"
import { imageUrl } from "config"
import { paths } from "common/constants"
import { usePopBox } from "common/hooks"
import { numberFormat } from "common/utils/func"
import LangDropdown from "../Header/LangDropdown"
import { useLocalStorage } from "usehooks-ts"
import { selectedPointBalance } from "service/slice/cart"
interface ISubmenuProps {
	isSubmenuOpen: boolean
}

const Submenu: FC<ISubmenuProps> = ({ isSubmenuOpen }) => {
	const { t } = useTranslation()
	const isLogin = useSelector(selectedIsLogin)
	const profile = useSelector(selectedProfile)
	const dispatch = useAppDispatch()
	const { setPopBoxType } = usePopBox()
	const [isLangDropOpen, setLangDropOpen] = useState<boolean>(true)
	const [cartList, setCartList] = useLocalStorage("nova88Cart", [])
	const pointBalance = useAppSelector(selectedPointBalance)
	const toggleLangDrop = () => {
		setLangDropOpen(prev => !prev)
	}

	const handleLogout = async () => {
		await dispatch(logoutAsync())
		dispatch(setIsLogin(false))
		setCartList([])
	}

	return (
		<div className={classnames("mobile-menu", { active: isSubmenuOpen })}>
			{!isLogin && (
				<div
					className="btn-login"
					onClick={() => {
						setPopBoxType({
							type: "login",
						})
					}}>
					{t("Login").toUpperCase()}
				</div>
			)}
			{isLogin && (
				<div className="memberFile">
					<div className="vipAnimation">
						<img
							src={`${imageUrl}/img/vip0${profile.userLevel}.png`}
							alt="vip"
						/>
					</div>
					<div className="memberID">
						<button>{profile.userName}</button>
					</div>
					<div className="rewardCoins">
						<Link href={paths.about.sub.points.root}>
							<a className="icon icon-diamond">
								{t("RewardPoints")}
								<span>{numberFormat(pointBalance, 2) ?? 0}</span>
							</a>
						</Link>
					</div>
				</div>
			)}
			<div className="accordion">
				<div>
					<Link href={paths.home}>
						<a className="title icon icon-home">{t("Home").toUpperCase()}</a>
					</Link>
				</div>
				<div>
					<Link href={paths.shopping}>
						<a className="title icon icon-shop">
							{t("88_Store").toUpperCase()}
						</a>
					</Link>
				</div>
				<div>
					<Link href={paths.about.sub.howtoearnpoints.root}>
						<a className="title icon icon-question">
							{t("HOW_TO_EARN_POINTS").toUpperCase()}
						</a>
					</Link>
				</div>
				<div>
					<Link href={paths.about.sub.rewardfaq.root}>
						<a className="title icon icon-faq">{t("FAQ").toUpperCase()}</a>
					</Link>
				</div>
				{isLogin && (
					<>
						<div>
							<Link href={paths.about.sub.purchase.root}>
								<a className="title icon icon-book-open">{t("MyPurchase")}</a>
							</Link>
						</div>
						<div>
							<Link href={paths.about.sub.points.root}>
								<a className="title icon icon-coin">
									{t("MyPoints").toUpperCase()}
								</a>
							</Link>
						</div>
					</>
				)}

				<div>
					<button
						className={classnames("title icon icon-sphere", {
							active: isLangDropOpen,
						})}
						onClick={toggleLangDrop}>
						{t("Languages").toUpperCase()}
						<i className="icon icon-keyboard_arrow_down" />
					</button>
					<LangDropdown />
				</div>
				<div>
					<a
						className="title icon icon-livechat1"
						href="https://direct.lc.chat/11638088/"
						target="_blank"
						rel="noreferrer">
						{t("LiveChat").toUpperCase()}
					</a>
				</div>
				{isLogin && (
					<div>
						<button className="title icon icon-exit" onClick={handleLogout}>
							{t("Logout").toUpperCase()}
						</button>
					</div>
				)}
				<div>
					<img
						className="novaLogo"
						src={`${imageUrl}/img/novalogo.png`}
						alt="nova88"
					/>
				</div>
			</div>
		</div>
	)
}

export default Submenu
