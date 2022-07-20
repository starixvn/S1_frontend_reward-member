import React, { FC } from "react"
import GiftItem from "../GiftItem"

interface IGiftListProps {
	filterList: {
		giftId: number
		giftName: string
		enGiftName: string
		categoryId: number
		categoryName: string
		giftDescription: string
		giftPictureUrl: string
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
	onToggle: (giftItem: object) => void
}

const GiftList: FC<IGiftListProps> = ({ filterList, onToggle }) => {
	return (
		<div className="product-list">
			{filterList?.map(item => (
				<GiftItem key={item.giftId} item={item} onToggle={onToggle} />
			))}
		</div>
	)
}

export default GiftList
