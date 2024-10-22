import CartItem from '@apps/nova88/components/Cart/CartItem'
import React, { FC } from 'react'

interface ICartListProps {
	cartList: {
		categoryId?: number
		currencyId?: number
		description?: string
		giftId?: number
		giftName?: string
		isoCode?: string
		lang?: string
		lastUpdateTime?: string
		lastUpdater?: string
		pictureUrl?: string
		point?: number
		priceWorth?: number
		showStock?: boolean
		siteId?: number
		siteName?: string
		sort?: number
		status?: number
		stock?: number
		tags?: object[]
	}[]
	checkedItem: {
		categoryId?: number
		categoryName?: string
		enGiftName?: string
		giftDescription?: string
		giftId?: number
		giftName?: string
		giftPictureUrl?: string
		isFavorite?: boolean
		number?: number
		point?: number
		priceWorth?: number
		showStock?: boolean
		stock?: number
		tagList?: {
			langId?: string
			tagId?: number
			tagName?: string
		}[]
	}
	onToggle: (e: React.MouseEvent<HTMLInputElement>, item: object) => void
	onRemove: (item: object) => void
}

const CartList: FC<ICartListProps> = ({
	cartList,
	checkedItem,
	onToggle,
	onRemove,
}) => {
	return (
		<>
			{cartList.map(item => (
				<CartItem
					key={item.giftId}
					item={item}
					checkedItem={checkedItem}
					onToggle={onToggle}
					onRemove={onRemove}
				/>
			))}
		</>
	)
}

export default CartList
