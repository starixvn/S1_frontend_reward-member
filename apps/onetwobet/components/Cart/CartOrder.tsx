import {
	getPointBalanceAsync,
	ISetShoppingCarData,
	selectedPointBalance,
	selectedProfile,
	setShoppingCartAsync,
	useCreateRedemptionMutation,
} from '@api'
import { paths } from '@constants'
import { numberFormat } from '@core'
import { useAppDispatch, useAppSelector, usePopBox } from '@operations'
import classNames from 'classnames'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface CartOrderProps {
	checkedItem?: ISetShoppingCarData
}

export const CartOrder = ({ checkedItem }: CartOrderProps) => {
	const dispatch = useAppDispatch()
	const profile = useAppSelector(selectedProfile)
	const pointBalance = useAppSelector(selectedPointBalance)
	const { t } = useTranslation()
	const [createRedemption] = useCreateRedemptionMutation()
	const { setPopBoxType } = usePopBox()
	const [isShowTip, setIsShowTip] = useState(false)
	const [noteInput, setNoteInput] = useState('')
	const isChecked = Boolean(
		checkedItem &&
			checkedItem.point < pointBalance &&
			profile.addressCity &&
			checkedItem.stock > 0
	)

	const onSubmit = async () => {
		if (isChecked) {
			await createRedemption({
				giftId: checkedItem.giftId,
				point: checkedItem.point,
			})
				.unwrap()
				.then(res => {
					if (res.errorCode === 0) {
						setPopBoxType({
							type: 'default',
							props: { content: t('SubmitTip') },
						})
						dispatch(
							setShoppingCartAsync({ giftIds: [checkedItem.giftId], isAdd: 0 })
						)
						dispatch(getPointBalanceAsync())
						setNoteInput('')
					}
				})
				.catch(err =>
					setPopBoxType({ type: 'warn', props: { content: err.message } })
				)
		}
	}

	return (
		<div className='col-lg-4 col-xl-4'>
			<div className='cart-txt'>
				<div className='title'>{t('OrderSummary')}</div>
				<div>{t('OrderSummaryTip')}</div>
			</div>
			<div className='cart-oder'>
				<div>
					<div>
						<span>{t('Username')}</span>
						<span>{profile.userName}</span>
					</div>
					<div>
						<span>{t('AvailablePoints').toUpperCase()}</span>
						<span className='icon icon-coin'>
							{numberFormat(pointBalance, 0, false)}
						</span>
					</div>
				</div>
				<div>
					{checkedItem && (
						<div>
							<span>{checkedItem.giftName}</span>
							<span className='icon icon-coin'>
								{numberFormat(checkedItem.point, 0, false)}
							</span>
						</div>
					)}
					<div>
						<span>{t('ShippingAndHandling')}</span>
						<span>{t('Free').toUpperCase()}</span>
					</div>
					<div className='wire'></div>
					<div className='total null'>
						<span>{t('GRAND_TOTAL')}</span>

						<span className={classNames('icon', 'icon-coin')}>
							{isNaN(checkedItem?.point)
								? 'N/A'
								: numberFormat(checkedItem.point, 0, false)}
						</span>
					</div>
					{checkedItem?.point > pointBalance && (
						<div className='tip active'>{t('InsufficientPointsTip')}</div>
					)}
				</div>
				{profile?.addressCity ? (
					<div>
						<div className='cart-address'>
							<span>{t('SHIPPING_ADDRESS')}</span>
							<a
								onClick={() => setIsShowTip(!isShowTip)}
								className='icon icon-information'
							></a>
							<div className={classNames('cart-tip', { active: isShowTip })}>
								{t('AddressUpdateTip')}
							</div>
						</div>
						<div className='address'>
							<p>
								{profile.addressLineFirst}
								{profile.addressLineSecond}
							</p>
							<p>
								{profile.addressCity}
								{profile.addressPostCode}
							</p>
							<p>
								{profile.addressState},{profile.addressCountry}
							</p>
						</div>
					</div>
				) : (
					<div>
						<a href={`/${paths.profile}`}>
							<button className='btn-add'>{t('ADD_ADDRESS')}</button>
						</a>
					</div>
				)}
				<input
					onChange={e => setNoteInput(e.target.value)}
					value={noteInput}
					type='text'
					placeholder={t('Note')}
				/>
				<div className='txt'></div>
				<button
					onClick={onSubmit}
					className={classNames('btn-checkout', {
						null: !isChecked,
					})}
				>
					{t('Checkout').toUpperCase()}
				</button>
			</div>
		</div>
	)
}
