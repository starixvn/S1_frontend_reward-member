import {
  logoutAsync,
  selectedIsLogin,
  selectedLangId,
  selectedPointBalance,
  selectedProfile, selectUrlMethods,
  setIsLogin
} from "@api"
import { paths } from '@constants'
import { numberFormat } from '@core'
import { useAppDispatch, useAppSelector, usePopBox } from '@operations'
import classnames from 'classnames'
import Link from 'next/link'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import LangDropdown from '../Header/LangDropdown'
interface ISubmenuProps {
	isSubmenuOpen: boolean
}

const Submenu: FC<ISubmenuProps> = ({ isSubmenuOpen }) => {
	const { t } = useTranslation()
	const isLogin = useSelector(selectedIsLogin)
	const profile = useSelector(selectedProfile)
  const { getStoreImgDomain } = useSelector(selectUrlMethods)
  const dispatch = useAppDispatch()
	const { setPopBoxType } = usePopBox()
	const [isLangDropOpen, setLangDropOpen] = useState<boolean>(true)
	const langId = useAppSelector(selectedLangId)
	const pointBalance = useAppSelector(selectedPointBalance)
	const toggleLangDrop = () => {
		setLangDropOpen(prev => !prev)
	}

	const handleLogout = async () => {
		await dispatch(logoutAsync())
		dispatch(setIsLogin(false))
	}

	return (
		<div className={classnames('mobile-menu', { active: isSubmenuOpen })}>
			{!isLogin && (
				<div
					className='btn-login'
					onClick={() => {
						setPopBoxType({
							type: 'login',
						})
					}}
				>
					{t('Login').toUpperCase()}
				</div>
			)}
			{isLogin && (
				<div className='memberFile'>
					<div className='vipAnimation'>
						<img
							style={{ zIndex: 1 }}
							src={getStoreImgDomain(`/img/vip0${profile.userLevel}.png`)}
							alt='vip'
						/>
					</div>
					<div className='memberID'>
						<button>{profile.userName}</button>
					</div>
					<div className='rewardCoins'>
						<Link href={paths.about.sub.points.root}>
							<a className='icon icon-diamond'>
								{t('RewardPoints')}
								<span>{numberFormat(pointBalance ?? 0, 0, false)}</span>
							</a>
						</Link>
					</div>
				</div>
			)}
			<div className='accordion'>
				<div>
					<Link href={paths.home}>
						<a className='title icon icon-home'>{t('Home').toUpperCase()}</a>
					</Link>
				</div>
				<div>
					<Link href={paths.shopping}>
						<a className='title icon icon-shop'>
							{t('88_Store').toUpperCase()}
						</a>
					</Link>
				</div>
				{isLogin && (
					<>
						<div>
							<Link href={paths.about.sub.points.root}>
								<a className='title icon icon-coin'>
									{t('MyPoints').toUpperCase()}
								</a>
							</Link>
						</div>
						<div>
							<Link href={paths.about.sub.purchase.root}>
								<a className='title icon icon-book-open'>{t('MyPurchase')}</a>
							</Link>
						</div>
					</>
				)}
				<div>
					<Link href={paths.about.sub.howtoearnpoints.root}>
						<a className='title icon icon-question'>
							{t('HOW_TO_EARN_POINTS').toUpperCase()}
						</a>
					</Link>
				</div>
				<div>
					<Link href={paths.about.sub.rewardfaq.root}>
						<a className='title icon icon-faq'>{t('FAQ').toUpperCase()}</a>
					</Link>
				</div>

				<div>
					<button
						className={classnames('title icon icon-sphere', {
							active: isLangDropOpen,
						})}
						onClick={toggleLangDrop}
					>
						{t('Languages').toUpperCase()}
						<i className='icon icon-keyboard_arrow_down' />
					</button>
					<LangDropdown />
				</div>
				<div>
					<a
						className='title icon icon-livechat1'
						href='https://direct.lc.chat/11638088/'
						target='_blank'
						rel='noreferrer'
					>
						{t('LiveChat').toUpperCase()}
					</a>
				</div>
				{isLogin && (
					<div>
						<button className='title icon icon-exit' onClick={handleLogout}>
							{t('Logout').toUpperCase()}
						</button>
					</div>
				)}
				<a href={`/${langId}`} target='_blank' rel='noreferrer'>
					<img
						className='novaLogo'
						src={getStoreImgDomain('12bet-logo.png')}
						alt='logo'
					/>
				</a>
			</div>
		</div>
	)
}

export default Submenu
