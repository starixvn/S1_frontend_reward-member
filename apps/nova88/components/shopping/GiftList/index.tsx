import React, { FC } from "react"
import GiftItem from "components/shopping/GiftItem"

interface IGiftListProps {
	filterList: {
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
	}[]
	onToggleCart: (giftItem: object) => void
	onToggleFavorite?: (giftItem: object) => void
}

const GiftList: FC<IGiftListProps> = ({
	filterList,
	onToggleCart,
	onToggleFavorite,
}) => {
	return (
		<div className="product-list">
			{filterList?.map(item => (
				<GiftItem
					key={item.giftId}
					item={item}
					onToggleCart={onToggleCart}
					onToggleFavorite={onToggleFavorite}
				/>
			))}
		</div>
	)
}

export default GiftList
