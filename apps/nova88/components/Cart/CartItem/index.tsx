import React, { FC } from "react"
import classNames from "classnames"
import { imageUrl } from "config"
import { useTranslation } from "react-i18next"
import { numberFormat } from "common/utils/func"

interface ICartItemProps {
	item: {
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
	}
	checkedItem: {
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
	}
	onToggle: (e: React.MouseEvent<HTMLInputElement>, item: object) => void
	onRemove: (item: object) => void
}

const CartItem: FC<ICartItemProps> = ({
	item,
	checkedItem,
	onToggle,
	onRemove,
}) => {
	const { t } = useTranslation()
	return (
		<div
			key={item.giftId}
			className={classNames("cart-items", {
				soldOut: !item.stock && item.showStock,
				later: !item.stock && !item.showStock,
			})}>
			<div className="cart-check">
				<input
					checked={checkedItem.giftId === item.giftId}
					onClick={e => onToggle(e, item)}
					type="checkbox"
				/>
			</div>
			<div className="cart-info">
				<div>
					<div>
						{!item.stock && (
							<div className="sold-out active">{t("SoldOut")}</div>
						)}
						<img src={`${imageUrl}${item.pictureUrl}`} alt="any" />
					</div>
					<div>
						<ul>
							<li></li>
							<li className="name">{item.giftName}</li>
							<li>
								{t("ItemCode")}:{item.giftId}
							</li>
							<li>{item.showStock && `${t("Qty")}:${item.stock}`}</li>
						</ul>
					</div>
				</div>
				<div>1</div>
				<div className="icon icon-coin">{numberFormat(item.point, 2)}</div>
			</div>
			<div className="cart-del">
				<button
					onClick={() => onRemove(item)}
					className="icon icon-bin"></button>
			</div>
		</div>
	)
}

export default CartItem
