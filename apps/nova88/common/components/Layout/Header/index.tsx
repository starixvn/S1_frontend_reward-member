import React, { FC } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { selectedIsLogin } from "service/slice/auth"
import { useRouter } from "next/router"
import Link from "next/link"
import { useAppSelector } from "store"
import { selectedLangId } from "service/slice/auth"
import HeaderBeforeLogin from "./Header.BeforeLogin"
import HeaderAfterLogin from "./Header.AfterLogin"
import ShoppingCart from "./ShoppingCart"
import { imageUrl } from "../../../../config"
import { paths } from "common/constants"

interface IHeaderProps {
	setSubmenuOpen: (prev) => void
}

const Header: FC<IHeaderProps> = ({ setSubmenuOpen }) => {
	const { t } = useTranslation()
	const route = useRouter()
	const isLogin = useSelector(selectedIsLogin)
	const langId = useAppSelector(selectedLangId)

	const toggleSubmenu = () => setSubmenuOpen((prev: boolean) => !prev)

	return (
		<header id="header">
			<div className="header">
				<button className="icon icon-menu" onClick={toggleSubmenu} />
				<div onClick={() => route.push(paths.home)} className="logo">
					<a>
						<img src={`${imageUrl}/img/88logo.png`} alt="" />
					</a>
				</div>
				<ShoppingCart />
				<div className="function">
					{isLogin ? <HeaderAfterLogin /> : <HeaderBeforeLogin />}
				</div>
				<div className="menu">
					<div className="tag">
						<div className="home">
							<Link href={paths.home}>
								<a className="icon icon-home"></a>
							</Link>
							<Link
								href={`/${langId}/${paths.appDownload}`}
								className="icon icon-mobile">
								<a className="icon icon-mobile"></a>
							</Link>
						</div>
						<div>
							<Link href={paths.shopping}>{t("Shopping").toUpperCase()}</Link>
							<Link href={paths.about.sub.howtoearnpoints.root}>
								{t("HOW_TO_EARN_POINTS")}
							</Link>
							<Link href={paths.about.sub.rewardfaq.root}>{t("FAQ")}</Link>
							{isLogin && (
								<>
									<Link href={paths.about.sub.purchase.root}>
										{t("MyPurchase")}
									</Link>
									<Link href={paths.about.sub.points.root}>
										{t("MyPoints")}
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
