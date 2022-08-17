import React, { FC, useState } from "react"
import { imageUrl } from "config"
import classNames from "classnames"
import { useLocalStorage } from "usehooks-ts"
import { useTranslation } from "react-i18next"
import { numberFormat } from "common/utils/func"

interface IGiftItemProps {
	item: {
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
	}
	onToggleCart: (giftItem: object) => void
	onToggleFavorite: (giftItem: object) => void
}

const GiftItem: FC<IGiftItemProps> = ({
	item,
	onToggleCart,
	onToggleFavorite,
}) => {
	const { t } = useTranslation()
	const [isLarge, setIsLarge] = useState(false)
	const [cartList] = useLocalStorage("nova88Cart", [])
	const handleItemBtnTextChange = giftItem => {
		let text = ""
		if (!giftItem.stock && giftItem.showStock) {
			text = t("SoldOut")
		} else {
			const cartItem = cartList.find(item => item.giftId === giftItem.giftId)
			if (cartItem) {
				text = t("AddedToCart")
			} else {
				text = t("AddToCart")
			}
		}
		return text
	}
	const closeLargeImg = () => setIsLarge(false)
	const openLargeImg = () => setIsLarge(true)
	return (
		<div
			className={classNames("product", {
				empty: !item.stock && item.showStock,
			})}>
			<div className="iconGroup">
				{item.tagList.map((tagItem, index) => (
					<div
						key={index}
						className={classNames("active", "icon", {
							"icon-fire": tagItem.tagName === "HOT",
							"icon-shinyblack": tagItem.tagName === "NEW",
							"icon-percent": tagItem.tagName === "FEATURED",
						})}>
						{tagItem.tagName === "FEATURED" ? t("FEAT") : t(tagItem.tagName)}
					</div>
				))}
			</div>
			<div>
				<img src={`${imageUrl}${item.giftPictureUrl}`} alt="any" />
			</div>
			<div className="btn">
				<button
					onClick={() => onToggleFavorite(item)}
					className={classNames("icon", "icon-heart-fill", {
						active: item.isFavorite,
					})}
				/>
				<button
					onClick={openLargeImg}
					className="icon icon-arrows-fullscreen"
				/>
			</div>
			<div className="icon icon-coin">{numberFormat(item.point)}</div>
			<div className="product-name">{item.giftName}</div>
			<div className="qty">{item.showStock && `${t("Qty")}:${item.stock}`}</div>
			<button
				onClick={() => onToggleCart(item)}
				className={classNames("icon", "active", {
					"icon-ban": !item.stock && item.showStock,
					"icon-checkmark":
						(item.stock || !item.showStock) &&
						cartList.find(cartItem => cartItem.giftId === item.giftId),
					"icon-cart":
						(item.stock || !item.showStock) &&
						!cartList.find(cartItem => cartItem.giftId === item.giftId),
				})}>
				{handleItemBtnTextChange(item)}
			</button>
			<div className={classNames("bigPup", { active: isLarge })}>
				<a
					onClick={closeLargeImg}
					className="icon icon-arrows-angle-contract"
				/>
				<div>
					<img src={`${imageUrl}${item.giftPictureUrl}`} alt="any" />
				</div>
				<button
					onClick={() => onToggleCart(item)}
					className={classNames("icon", "active", {
						"icon-ban": !item.stock && item.showStock,
						"icon-checkmark":
							item.stock &&
							cartList.find(cartItem => cartItem.giftId === item.giftId),
						"icon-cart":
							(item.stock || !item.showStock) &&
							!cartList.find(cartItem => cartItem.giftId === item.giftId),
					})}>
					{handleItemBtnTextChange(item)}
				</button>
			</div>
		</div>
	)
}

export default GiftItem
