import React, { FC } from "react"
import classNames from "classnames"
import { imageUrl } from "@apps/nova88/config"
import { useTranslation } from "react-i18next"
import { numberFormat } from "@apps/nova88/common/utils/func"

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
	const stock = (() => {
		const { stock, status } = item
		if (!status) return <div className="sold-out active">{t("SoldOut")}</div>
		if (!stock)
			return <div className="sold-out active">{t("Label_OutOfStock")}</div>
		return null
	})()
	return (
		<div
			key={item.giftId}
			className={classNames("cart-items", {
				soldOut: !item.stock || !item.status,
				// later: !item.stock && !item.showStock,
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
						{stock}
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
							<li>
								{t("Qty")}:1
								<div className="icon icon-coin">
									{numberFormat(item.point, 0, false)}
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div className="qty">1</div>
				<div className="icon icon-coin">
					{numberFormat(item.point, 0, false)}
				</div>
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
