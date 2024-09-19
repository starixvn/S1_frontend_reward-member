import Empty from './Empty'
import GiftItem from './GiftItem'
import { tabOption } from '@constants'
import { FC } from 'react'
import { IGiftData, selectedIsLogin, useSetFavoriteMutation } from "@api"
import { usePopBox } from '@operations'
import { useSelector } from 'react-redux'

interface IGiftListProps {
	filterList: Array<IGiftData>
	activeTabItem?: { lang?: string; tagId?: number; tagName?: string }
	isLargeImg?: boolean
	onToggleLargeImg?: () => void
}

export const GiftList: FC<IGiftListProps> = ({
	filterList,
	activeTabItem,
}) => {

	return (
		<>
			{filterList && filterList.length > 0 ? (
				<div className='product-list'>
					{filterList.map(item => (
						<GiftItem
							key={item.giftId}
							item={item}
						/>
					))}
				</div>
			) : (
				<Empty isFavorite={activeTabItem?.tagId === tabOption.FAVORITE} />
			)}
		</>
	)
}
