import React from "react"
import Link from "next/link"
import classnames from "classnames"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { useReadLocalStorage } from "usehooks-ts"
import { useRouter } from "next/router"
import { paths } from "common/constants"
import { selectedIsLogin } from "service/slice/auth"

const MobileFooter = () => {
	const { t } = useTranslation()
	const isLogin = useSelector(selectedIsLogin)
	const router = useRouter()
	const { pathname } = router
	const cartData: null | any[] = useReadLocalStorage("nova88Cart")
	const cartCount = cartData?.length ?? 0

	return (
		<footer className="mobile-footer">
			<Link href={paths.home}>
				<a
					className={classnames("icon icon-home", {
						active: pathname === paths.home,
					})}>
					<div className="circleAnimation"></div>
					<span>{t("Home")}</span>
				</a>
			</Link>
			<Link href={paths.shopping}>
				<a
					className={classnames("icon icon-shop", {
						active: pathname === paths.shopping,
					})}>
					<div className="circleAnimation"></div>
					<span>{t("Shopping")}</span>
				</a>
			</Link>
			{isLogin && (
				<Link href={paths.about.sub.points.root}>
					<a
						className={classnames("icon icon-coin", {
							active: pathname === paths.about.sub.points.root,
						})}>
						<div className="circleAnimation"></div>
						<span>{t("MyPoints")}</span>
					</a>
				</Link>
			)}
			<a
				className="icon icon-livechat"
				href="https://direct.lc.chat/11638088/"
				target="_blank"
				rel="noreferrer">
				<div className="circleAnimation"></div>
				<span>{t("LiveChat")}</span>
			</a>
			<Link href={paths.cart}>
				<a
					className={classnames("icon icon-cart", {
						active: pathname === paths.cart,
					})}>
					<div className="qty">{cartCount > 99 ? "99+" : `+${cartCount}`}</div>
					<div className="circleAnimation"></div>
					<span>{t("ShoppingCart")}</span>
				</a>
			</Link>
		</footer>
	)
}

export default MobileFooter
