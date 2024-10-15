import React, { FC } from "react"
import GiftItem from "@apps/nova88/components/Shopping/GiftItem"
import Empty from "@apps/nova88/components/Shopping/Empty"
import { tabOption } from "@apps/nova88/components/Index/constants"

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
	activeTabItem?: { lang?: string; tagId?: number; tagName?: string }
	realCartList?: {
		giftId?: number
		giftName?: string
		enGiftName?: string
		categoryId?: number
		categoryName?: string
		giftDescription?: string
		giftPictureUrl?: string
		isFavorite?: boolean
		tagList?: {
			tagId: number
			tagName: string
			lang: string
		}[]
		point?: number
		priceWorth?: number
		showStock?: boolean
		stock?: number
	}[]
	isLargeImg?: boolean
	onToggleLargeImg?: () => void
}

const GiftList: FC<IGiftListProps> = ({
	filterList,
	onToggleCart,
	onToggleFavorite,
	activeTabItem,
	realCartList,
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
							realCartList={realCartList}
						/>
					))}
				</div>
			) : (
				<Empty isFavorite={activeTabItem?.tagId === tabOption.FAVORITE} />
			)}
		</>
	)
}

export default GiftList
