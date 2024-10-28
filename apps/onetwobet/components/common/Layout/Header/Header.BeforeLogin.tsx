import { selectedLangId, selectUrlMethods } from "@api"
import { useAppSelector, usePopBox } from '@operations'
import { useTranslation } from 'react-i18next'
import LangDropdown from './LangDropdown'
import ShoppingCart from './ShoppingCart'
import { useSelector } from "react-redux"

const HeaderBeforeLogin = () => {
	const { t } = useTranslation()
	const langId = useAppSelector(selectedLangId)
  const { getStoreImgDomain } = useSelector(selectUrlMethods)

  const { setPopBoxType } = usePopBox()

	return (
		<>
			<a className='icon icon-email'>
				<div className='msgPop' style={{ display: 'none' }}>
					<div>{t('WeeklyRetentionBonus')}</div>
					<button className='icon icon-close'></button>
				</div>
			</a>
			<LangDropdown />
			<ShoppingCart />
			<a href={`/${langId}`} target='_blank' rel='noreferrer'>
				<img className='novaLogo' 	src={getStoreImgDomain('/img/12bet-logo.png')} alt='' />
			</a>
			<button
				className='login'
				onClick={() => {
					setPopBoxType({
						type: 'login',
					})
				}}
			>
				{t('Login').toUpperCase()}
			</button>
		</>
	)
}

export default HeaderBeforeLogin
