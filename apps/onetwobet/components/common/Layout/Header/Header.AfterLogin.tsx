import {
	logoutAsync,
	selectedLangId,
	selectedPointBalance,
	selectedProfile,
	selectUrlMethods,
	setIsLogin,
	setProfile,
} from '@api'
import { paths } from '@constants'
import { numberFormat } from '@core'
import { useAppDispatch, useAppSelector } from '@operations'
import classnames from 'classnames'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useOnClickOutside } from 'usehooks-ts'
import LangDropdown from './LangDropdown'
import ShoppingCart from './ShoppingCart'

const HeaderAfterLogin = () => {
	const { t } = useTranslation()
	const profile = useSelector(selectedProfile)
	const { getStoreImgDomain } = useSelector(selectUrlMethods)
	const dispatch = useAppDispatch()
	const langId = useAppSelector(selectedLangId)
	const pointBalance = useAppSelector(selectedPointBalance)
	const userMenuWrapper = useRef()
	const [isUserMenuOpen, setUserMenuIsOpen] = useState<boolean>(false)

	const handleLogout = async () => {
		await dispatch(logoutAsync())
		dispatch(setIsLogin(false))
		dispatch(
			setProfile({
				userName: 'Guest',
				langId: profile.langId,
				currencyId: profile.currencyId,
			})
		)
	}

	const toggleUserMenuDropdown = () => setUserMenuIsOpen(prev => !prev)

	const handleClickOutside = () => {
		setUserMenuIsOpen(false)
	}

	useOnClickOutside(userMenuWrapper, handleClickOutside)

	return (
		<>
			<Link href={paths.about.sub.points.root}>
				<a className='icon icon-diamond'>
					<span>{t('RewardPoints')}</span>
					{numberFormat(pointBalance ?? 0, 0, false)}
				</a>
			</Link>
			<div className='memberFile' ref={userMenuWrapper}>
				<Link href={paths.about.sub.points.root}>
					<div className='vipAnimation'>
						<a>
							<img
								src={getStoreImgDomain(`/img/vip0${profile.userLevel}.svg`)}
								alt='vip'
							/>
						</a>
					</div>
				</Link>
				<div onClick={toggleUserMenuDropdown} className='memberID'>
					<button className='icon-keyboard_arrow_down'>
						{profile.userName}
					</button>
					<div className={classnames('submenu', { active: isUserMenuOpen })}>
						<Link href={paths.about.sub.points.root}>
							{t('MyPoints').toUpperCase()}
						</Link>
						<Link href={paths.about.sub.purchase.root}>{t('MyPurchase')}</Link>
					</div>
				</div>
			</div>
			<button onClick={handleLogout} className='icon icon-exit' />

			<LangDropdown />
			<ShoppingCart />

			<a href={`/${langId}`} target='_blank' rel='noreferrer'>
				<img
					className='novaLogo'
					src={getStoreImgDomain('/img/12bet-logo.png')}
					alt='logo'
				/>
			</a>
		</>
	)
}

export default HeaderAfterLogin
