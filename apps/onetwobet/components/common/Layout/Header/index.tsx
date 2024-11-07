import { selectedIsLogin, selectUrlMethods } from "@api"
import { paths } from '@constants'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import HeaderAfterLogin from './Header.AfterLogin'
import HeaderBeforeLogin from './Header.BeforeLogin'
import ShoppingCart from './ShoppingCart'

interface IHeaderProps {
	setSubmenuOpen: (prev) => void
}

const Header: FC<IHeaderProps> = ({ setSubmenuOpen }) => {
	const { t } = useTranslation()
	const route = useRouter()
	const isLogin = useSelector(selectedIsLogin)
  const { getStoreImgDomain } = useSelector(selectUrlMethods)
	const onClickLogo = () => {
		if (route.pathname === paths.home) {
			route.reload()
		} else {
			route.push(paths.home)
		}
	}
	const toggleSubmenu = () => setSubmenuOpen((prev: boolean) => !prev)

	return (
		<header id='header'>
			<div className='header'>
				<button className='icon icon-menu' onClick={toggleSubmenu} />
				<div onClick={onClickLogo} className='logo'>
					<a>
						<img src={getStoreImgDomain('/img/88logo.png')} alt='logo' />
					</a>
				</div>
				<ShoppingCart />
				<div className='function'>
					{isLogin ? <HeaderAfterLogin /> : <HeaderBeforeLogin />}
				</div>
				<div className='menu'>
					<div className='tag'>
						<div className='home'>
							<Link href={paths.home}>
								<a className='icon icon-home'></a>
							</Link>
						</div>
						<div>
							<Link href={paths.shopping}>{t('88_Store').toUpperCase()}</Link>
							{isLogin && (
								<>
									<Link href={paths.about.sub.points.root}>
										{t('MyPoints').toUpperCase()}
									</Link>
									<Link href={paths.about.sub.purchase.root}>
										{t('MyPurchase').toUpperCase()}
									</Link>
								</>
							)}
							<Link href={paths.about.sub.howtoearnpoints.root}>
								{t('HOW_TO_EARN_POINTS').toUpperCase()}
							</Link>
							<Link href={paths.about.sub.rewardfaq.root}>
								{t('FAQ').toUpperCase()}
							</Link>
							<a
								target='_blank'
								rel='noreferrer'
								href={`/${paths.appDownload}`}
								className='icon icon-mobile'
							></a>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
