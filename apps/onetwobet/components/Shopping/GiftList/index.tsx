import Empty from '@apps/onetwobet/components/Shopping/Empty'
import GiftItem from '@apps/onetwobet/components/Shopping/GiftItem'
import { tabOption } from '@constants'
import { FC } from 'react'
import { IGiftData } from "@api"

interface IGiftListProps {
	filterList: Array<IGiftData>
	onToggleFavorite?: (giftItem: object) => void
	activeTabItem?: { lang?: string; tagId?: number; tagName?: string }
	isLargeImg?: boolean
	onToggleLargeImg?: () => void
}

const GiftList: FC<IGiftListProps> = ({
	filterList,
	onToggleFavorite,
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
							onToggleFavorite={onToggleFavorite}
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
