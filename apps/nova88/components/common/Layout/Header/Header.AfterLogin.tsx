import {
	logoutAsync,
	selectedLangId,
	selectedPointBalance,
	selectedProfile,
	setIsLogin,
	setProfile,
} from '@api'
import { imageUrl } from '@apps/nova88/config'
import { paths } from '@constants'
import { numberFormat } from '@core'
import { useAppDispatch, useAppSelector } from '@operations'
import classnames from 'classnames'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useLocalStorage, useOnClickOutside } from 'usehooks-ts'
import LangDropdown from './LangDropdown'
import ShoppingCart from './ShoppingCart'

const HeaderAfterLogin = () => {
	const { t } = useTranslation()
	const profile = useSelector(selectedProfile)
	const dispatch = useAppDispatch()
	const [, setCartList] = useLocalStorage('nova88Cart', [])
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
		setCartList([])
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
								src={`${imageUrl}/img/vip0${profile.userLevel}.png`}
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
					src={`${imageUrl}/img/novalogo.png`}
					alt='any'
				/>
			</a>
		</>
	)
}

export default HeaderAfterLogin
