import { selectedLangId } from '@api'
import { imageUrl } from '@apps/onetwobet/config'
import { useAppSelector, usePopBox } from '@operations'
import { useTranslation } from 'react-i18next'
import LangDropdown from './LangDropdown'
import ShoppingCart from './ShoppingCart'

const HeaderBeforeLogin = () => {
	const { t } = useTranslation()
	const langId = useAppSelector(selectedLangId)
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
				<img className='novaLogo' src={`${imageUrl}/img/novalogo.png`} alt='' />
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
