import React, { FC, useRef, useState } from "react"
import { imageUrl } from "config"
import classNames from "classnames"
import { useLocalStorage, useOnClickOutside } from "usehooks-ts"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "store"
import { selectedIsLogin } from "service/slice/auth"
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
}

const GiftItem: FC<IGiftItemProps> = ({
	item,
	onToggleCart,
	onToggleFavorite,
	realCartList,
}) => {
	const { t } = useTranslation()
	const [isLarge, setIsLarge] = useState(false)
	const [cartList] = useLocalStorage("nova88Cart", [])
	const isLogin = useAppSelector(selectedIsLogin)
	const giftItemRef = useRef()
	const handleClickOutside = () => {
		setIsLarge(false)
	}
	useOnClickOutside(giftItemRef, handleClickOutside)
	const handleItemBtnTextChange = giftItem => {
		let text = ""
		if (!giftItem.stock) {
			text = t("SoldOut")
		} else {
			const cartItem = (isLogin ? realCartList : cartList)?.find(
				item => item.giftId === giftItem.giftId
			)
			if (cartItem) {
				text = t("AddedToCart")
			} else {
				text = t("AddToCart")
			}
		}
		return text
	}
	const showGiftItemBtn = () => (
		<button
			onClick={() => onToggleCart(item)}
			className={classNames("icon", "active", {
				"icon-ban": !item.stock,
				"icon-checkmark":
					item.stock &&
					(isLogin ? realCartList : cartList)?.find(
						cartItem => cartItem.giftId === item.giftId
					),
				"icon-cart":
					item.stock &&
					!(isLogin ? realCartList : cartList)?.find(
						cartItem => cartItem.giftId === item.giftId
					),
			})}>
			{handleItemBtnTextChange(item)}
		</button>
	)
	return (
		<div
			ref={giftItemRef}
			className={classNames("product", {
				empty: !item.stock,
			})}>
			<div className="iconGroup">
				{item.tagList.map((tagItem, index) => (
					<div
						key={index}
						className={classNames("active", "icon", {
							"icon-fire": tagItem.tagName === "HOT",
							"icon-shinyblack": tagItem.tagName === "NEW",
							"icon-thumb": tagItem.tagName === "FEATURED",
						})}>
						{tagItem.tagName === "FEATURED" ? "FEA" : tagItem.tagName}
					</div>
				))}
			</div>
			<div>
				<img
					onClick={() => (window.innerWidth >= 768 ? setIsLarge(true) : null)}
					src={`${imageUrl}${item.giftPictureUrl}`}
					alt="any"
				/>
			</div>
			<div className="btn">
				<button
					onClick={() => onToggleFavorite(item)}
					className={classNames("icon", "icon-heart-fill", {
						active: item.isFavorite,
					})}
				/>
			</div>
			<div className="product-name">{item.giftName ?? item.enGiftName}</div>
			<div className="product-description">{item.giftDescription}</div>
			<div className="icon icon-coin">
				&nbsp;{numberFormat(item.point, 0, false)}
			</div>

			<div className="qty">{item.showStock && `${t("Qty")}:${item.stock}`}</div>
			{showGiftItemBtn()}
			<div className={classNames("bigPup", { active: isLarge })}>
				<div>
					<img src={`${imageUrl}${item.giftPictureUrl}`} alt="any" />
				</div>
				{showGiftItemBtn()}
			</div>
		</div>
	)
}

export default GiftItem
