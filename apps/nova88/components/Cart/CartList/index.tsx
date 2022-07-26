import React, { FC } from "react"
import CartItem from "components/Cart/CartItem"

interface ICartListProps {
	cartList: {
		categoryId: number
		categoryName: string
		enGiftName: string
		giftDescription: string
		giftId: number
		giftName: string
		giftPictureUrl: string
		isFavorite: boolean
		number: number
		point: number
		priceWorth: number
		showStock: boolean
		stock: number
		tagList: {
			lang: string
			tagId: number
			tagName: string
		}[]
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
	onChange: (quantity: number, item: object) => void
	onRemove: (item: object) => void
}

const CartList: FC<ICartListProps> = ({
	cartList,
	checkedItem,
	onToggle,
	onChange,
	onRemove,
}) => {
	return (
		<>
			{cartList.map(item => {
				const quantityList = Array.from({ length: item.stock }, (v, i) => i + 1)
				return (
					<CartItem
						key={item.giftId}
						item={item}
						quantityList={quantityList}
						checkedItem={checkedItem}
						onToggle={onToggle}
						onChange={onChange}
						onRemove={onRemove}
					/>
				)
			})}
		</>
	)
}

export default CartList
