import { ISetShoppingCarData, setShoppingCartAsync } from '@api'
import { numberFormat } from '@core'
import { useAppDispatch } from '@operations'
import classNames from 'classnames'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

interface CartItemProp {
	item: ISetShoppingCarData
	checkedItem?: ISetShoppingCarData
	onToggle: (item: ISetShoppingCarData) => void
}

export const CartItem = ({ item, checkedItem, onToggle }: CartItemProp) => {
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const soldOutKey = !item.status
		? 'Label_OutOfStock'
		: !item.stock
		? 'SoldOut'
		: null

	const onRemove = async (item: ISetShoppingCarData) => {
		dispatch(setShoppingCartAsync({ giftIds: [item.giftId], isAdd: 0 }))
	}

	return (
		<div
			className={classNames('cart-items', {
				soldOut: !isEmpty(soldOutKey),
				// later: !item.stock && !item.showStock,
			})}
		>
			<div className='cart-check'>
				<input
					checked={checkedItem?.giftId === item.giftId}
					onChange={e => onToggle(item)}
					type='checkbox'
				/>
			</div>
			<div className='cart-info'>
				<div>
					<div>
						{isEmpty(soldOutKey) && (
							<div className='sold-out active'>{t(soldOutKey)}</div>
						)}
						<img src={`${item.pictureUrl}`} alt='GiftImg' />
					</div>
					<div>
						<ul>
							<li></li>
							<li className='name'>{item.giftName}</li>
							<li>
								{t('ItemCode')}:{item.giftId}
							</li>
							<li>{item.showStock && `${t('Qty')}:${item.stock}`}</li>
							<li>
								{t('Qty')}:1
								<div className='icon icon-coin'>
									{numberFormat(item.point, 0, false)}
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div className='qty'>1</div>
				<div className='icon icon-coin'>
					{numberFormat(item.point, 0, false)}
				</div>
			</div>
			<div className='cart-del'>
				<button
					onClick={() => onRemove(item)}
					className='icon icon-bin'
				></button>
			</div>
		</div>
	)
}
