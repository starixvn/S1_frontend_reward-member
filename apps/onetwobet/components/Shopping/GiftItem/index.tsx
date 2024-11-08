import { selectedCartList, selectedIsLogin, setShoppingCartAsync } from '@api'
import { numberFormat } from '@core'
import { useAppDispatch, useAppSelector } from '@operations'
import classNames from 'classnames'
import { FC, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocalStorage, useOnClickOutside } from 'usehooks-ts'

interface IGiftItemProps {
	item: {
		giftId: number
		giftName: string
		enGiftName: string
		categoryId: number
		categoryName: string
		giftDescription: string
		giftPictureUrl: string
		isFavorite: boolean
		tagList: {
			tagId: number
			tagName: string
			lang: string
		}[]
		point: number
		priceWorth: number
		showStock: boolean
		stock: number
	}
	onToggleFavorite: (giftItem: object) => void
}

const GiftItem: FC<IGiftItemProps> = ({ item, onToggleFavorite }) => {
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const [isLarge, setIsLarge] = useState(false)
	const [LSCartList, setLSCartList] = useLocalStorage('onetwobetCart', [])
	const isLogin = useAppSelector(selectedIsLogin)
	const cartList = useAppSelector(selectedCartList)
	const giftItemRef = useRef()

	const isInCart = giftItem => {
		return isLogin
			? cartList.some(o => o.giftId === giftItem.giftId)
			: LSCartList.some(o => o.giftId === giftItem.giftId)
	}

	const handleClickOutside = () => {
		setIsLarge(false)
	}
	useOnClickOutside(giftItemRef, handleClickOutside)

	const onToggle = async giftItem => {
		if (!giftItem.stock) return
		if (isLogin) {
			dispatch(
				setShoppingCartAsync({
					giftIds: [giftItem.giftId],
					isAdd: cartList.some(o => o.giftId === giftItem.giftId) ? 0 : 1,
				})
			)
		} else {
			setLSCartList(
				LSCartList.some(o => o.giftId === giftItem.giftId)
					? LSCartList.filter(o => o.giftId !== giftItem.giftId)
					: [...LSCartList, giftItem]
			)
		}
	}

	const showGiftItemBtn = () => (
		<button
			onClick={() => onToggle(item)}
			className={classNames('icon', 'active', {
				'icon-ban': !item.stock,
				'icon-checkmark': item.stock && isInCart(item),
				'icon-cart': item.stock && !isInCart(item),
			})}
		>
			{t(
				!item.stock ? 'SoldOut' : isInCart(item) ? 'AddedToCart' : 'AddToCart'
			)}
		</button>
	)
	return (
		<div
			ref={giftItemRef}
			className={classNames('product', {
				empty: !item.stock,
			})}
		>
			<div className='iconGroup'>
				{item.tagList.map((tagItem, index) => (
					<div
						key={index}
						className={classNames('active', 'icon', {
							'icon-fire': tagItem.tagName === 'HOT',
							'icon-shinyblack': tagItem.tagName === 'NEW',
							'icon-thumb': tagItem.tagName === 'FEATURED',
						})}
					>
						{tagItem.tagName === 'FEATURED' ? 'FEA' : tagItem.tagName}
					</div>
				))}
			</div>
			<div>
				<img
					onClick={() => (window.innerWidth >= 768 ? setIsLarge(true) : null)}
					src={item.giftPictureUrl}
					alt='gift'
				/>
			</div>
			<div className='btn'>
				<button
					onClick={() => onToggleFavorite(item)}
					className={classNames('icon', 'icon-heart-fill', {
						active: item.isFavorite,
					})}
				/>
			</div>
			<div className='product-name'>{item.giftName ?? item.enGiftName}</div>
			<div className='product-description'>{item.giftDescription}</div>
			<div className='icon icon-coin'>
				&nbsp;{numberFormat(item.point, 0, false)}
			</div>

			<div className='qty'>{item.showStock && `${t('Qty')}:${item.stock}`}</div>
			{showGiftItemBtn()}
			<div className={classNames('bigPup', { active: isLarge })}>
				<div>
					<img src={item.giftPictureUrl} alt='gift' />
				</div>
				{showGiftItemBtn()}
			</div>
		</div>
	)
}

export default GiftItem
