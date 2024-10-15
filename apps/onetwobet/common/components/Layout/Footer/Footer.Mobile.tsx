import React from "react"
import Link from "next/link"
import classnames from "classnames"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { useReadLocalStorage } from "usehooks-ts"
import { useRouter } from "next/router"
import { paths } from "@apps/onetwobet/common/constants"
import { selectedIsLogin } from "@apps/onetwobet/service/slice/auth"
import { usePopBox } from "@apps/onetwobet/common/hooks"
import { useAppSelector } from "@apps/onetwobet/store"
import { selectedCartNumber } from "@apps/onetwobet/service/slice/cart"

const MobileFooter = () => {
	const { t } = useTranslation()
	const isLogin = useSelector(selectedIsLogin)
	const { setPopBoxType } = usePopBox()
	const router = useRouter()
	const { asPath } = router
	const cartData: null | any[] = useReadLocalStorage("nova88Cart")
	const cartNumber = useAppSelector(selectedCartNumber)
	const cartCount = cartData?.length ?? 0

	const clickCartBtn = () => {
		if (!isLogin) {
			setPopBoxType({
				type: "login",
			})
		} else {
			router.push(paths.cart)
		}
	}

	return (
		<footer className="mobile-footer">
			<Link href={paths.home}>
				<a
					className={classnames("icon icon-home", {
						active: asPath === `${paths.home}/`,
					})}>
					<div className="circleAnimation"></div>
					<span>{t("Home")}</span>
				</a>
			</Link>
			<Link href={paths.shopping}>
				<a
					className={classnames("icon icon-shop", {
						active: asPath === paths.shopping,
					})}>
					<div className="circleAnimation"></div>
					<span>{t("88_Store")}</span>
				</a>
			</Link>
			{isLogin && (
				<Link href={paths.about.sub.points.root}>
					<a
						className={classnames("icon icon-coin", {
							active: asPath === paths.about.sub.points.root,
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
			<button onClick={clickCartBtn}>
				<a
					className={classnames("icon icon-cart", {
						active: asPath === paths.cart,
					})}>
					<div className="qty">
						{cartCount > 99 ? "99+" : `${isLogin ? cartNumber : cartCount}`}
					</div>
					<div className="circleAnimation"></div>
					<span>{t("ShoppingCart_Short")}</span>
				</a>
			</button>
		</footer>
	)
}

export default MobileFooter
