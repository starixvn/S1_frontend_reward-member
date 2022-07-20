import React, { FC, useState } from "react"
import { imageUrl } from "config"
import classNames from "classnames"
import { useLocalStorage } from "usehooks-ts"
interface IGiftItemProps {
	item: {
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
	}
	onToggle: (giftItem: object) => void
}

const GiftItem: FC<IGiftItemProps> = ({ item, onToggle }) => {
	const [isLarge, setIsLarge] = useState(false)
	const [cartList] = useLocalStorage("nova88Cart", [])
	const handleItemBtnTextChange = giftItem => {
		let text = ""
		if (!giftItem.stock) {
			text = "SOLD OUT"
		} else {
			const cartItem = cartList.find(item => item.giftId === giftItem.giftId)
			if (cartItem) {
				text = "ADDED TO CART"
			} else {
				text = "ADD TO CART"
			}
		}
		return text
	}
	const closeLargeImg = () => setIsLarge(false)
	const openLargeImg = () => setIsLarge(true)
	return (
		<div className={classNames("product", { empty: !item.stock })}>
			<div className="iconGroup">
				{item.tagList.map((tagItem, index) => (
					<div
						key={index}
						className={classNames("active", "icon", {
							"icon-fire": tagItem.tagName === "HOT",
							"icon-shinyblack": tagItem.tagName === "NEW",
							"icon-percent": tagItem.tagName === "FEATURED",
						})}>
						{tagItem.tagName === "FEATURED" ? "FEAT" : tagItem.tagName}
					</div>
				))}
			</div>
			<div>
				<img src={`${imageUrl}${item.giftPictureUrl}`} alt="any" />
			</div>
			<div className="btn">
				<button className="icon icon-heart-fill" />
				<button
					onClick={openLargeImg}
					className="icon icon-arrows-fullscreen"
				/>
			</div>
			<div className="icon icon-coin">{item.point}</div>
			<div className="product-name">{item.giftName}</div>
			<div className="qty">Qty:{item.stock}</div>
			<button
				onClick={() => onToggle(item)}
				className={classNames("icon", "active", {
					"icon-ban": !item.stock,
					"icon-checkmark":
						item.stock &&
						cartList.find(cartItem => cartItem.giftId === item.giftId),
					"icon-cart":
						item.stock &&
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
					onClick={() => onToggle(item)}
					className={classNames("icon", "active", {
						"icon-ban": !item.stock,
						"icon-checkmark":
							item.stock &&
							cartList.find(cartItem => cartItem.giftId === item.giftId),
						"icon-cart":
							item.stock &&
							!cartList.find(cartItem => cartItem.giftId === item.giftId),
					})}>
					{handleItemBtnTextChange(item)}
				</button>
			</div>
		</div>
	)
}

export default GiftItem
