import React, { FC } from "react"
import GiftItem from "components/Shopping/GiftItem"
import Empty from "components/Shopping/Empty"
import { tabOption } from "components/Index/constants"

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
	activeTabItem?: { id: number; label: string }
}

const GiftList: FC<IGiftListProps> = ({
	filterList,
	onToggleCart,
	onToggleFavorite,
	activeTabItem,
}) => {
	return (
		<>
			{filterList && filterList.length > 0 ? (
				<div className="product-list">
					{filterList.map(item => (
						<GiftItem
							key={item.giftId}
							item={item}
							onToggleCart={onToggleCart}
							onToggleFavorite={onToggleFavorite}
						/>
					))}
				</div>
			) : (
				<Empty isFavorite={activeTabItem?.id === tabOption.FAVORITE} />
			)}
		</>
	)
}

export default GiftList
