import { selectedIsLogin } from '@api'
import { useAppSelector, usePopBox } from '@operations'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface IEmptyProps {
	isFavorite: boolean
}

const Empty: FC<IEmptyProps> = ({ isFavorite }) => {
	const isLogin = useAppSelector(selectedIsLogin)
	const { t } = useTranslation()
	const { setPopBoxType } = usePopBox()
	const judgeEmptyShow = () => {
		if (isFavorite) {
			return (
				<div className='products-empty'>
					<div className='animation'>
						<i className='icon icon-heart-fill'></i>
					</div>
					<div className='title'>{t('MyFavoritesList')}</div>
					{!isLogin && (
						<button
							onClick={() => {
								setPopBoxType({
									type: 'login',
								})
							}}
							className='btn-login'
						>
							{t('LOGIN')}
						</button>
					)}
				</div>
			)
		} else {
			return (
				<div className='noData'>
					<i className='icon icon-alarm' />
					{t('NoData')}
				</div>
			)
		}
	}
	return judgeEmptyShow()
}

export default Empty
