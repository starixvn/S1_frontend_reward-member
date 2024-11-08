import { ISetShoppingCarData, selectedCartList } from '@api'
import { paths } from '@constants'
import { useAppSelector } from '@operations'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { CartItem } from './CartItem'


interface CartListProp {
	checkedItem?: ISetShoppingCarData
	onToggle: (item: ISetShoppingCarData) => void
}

export const CartList = ({ checkedItem, onToggle }: CartListProp) => {
	const route = useRouter()
	const { t } = useTranslation()
	const cartList = useAppSelector(selectedCartList)

	return (
		<div className='col-lg-8 col-lg-8'>
			<div className='cart-txt'>
				<i className='icon icon-cart' />
				<div className='title'>
					{t('ShoppingCart')}
					<span>
						{cartList.length} {t('Items1')}
					</span>
				</div>
				<div>{t('ShoppingCartTip')}</div>
			</div>
			<div className='cart-list'>
				<div className='cart-head'>
					<div className='cart-check'>
						<span>{t('CheckoutLater')}</span>
					</div>
					<div className='cart-info'>
						<div>{t('Items2')}</div>
						<div>{t('Quantity')}</div>
						<div>{t('Points')}</div>
					</div>
					<div className='cart-del'></div>
				</div>
				{cartList.length > 0 ? (
					cartList.map(item => (
						<CartItem
							key={item.giftId}
							item={item}
							checkedItem={checkedItem}
							onToggle={onToggle}
						/>
					))
				) : (
					<div className={'cart-null active'}>
						<i className='icon icon-cart'></i>
						<div>{t('EmptyText1')}</div>
						<button onClick={() => route.push(paths.shopping)}>
							{t('EmptyText2')}
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
