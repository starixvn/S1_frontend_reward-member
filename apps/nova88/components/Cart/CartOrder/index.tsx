import React, { FC } from "react"
import Link from "next/link"
import classnames from "classnames"
import { useTranslation } from "react-i18next"
import { numberFormat } from "common/utils/func"
import { paths } from "common/constants"

interface ICartOrderProps {
	profile: {
		langId: string
		userName: string
		accountName?: string
		actStatus?: number
		addressCity?: string
		addressCountry?: string
		addressLineFirst?: string
		addressLineSecond?: string
		addressPostCode?: string
		addressState?: string
		areaCode?: string
		birth_d?: string
		birth_m?: string
		country?: string
		birth_y?: string
		currencyId?: number
		email?: string
		emailReward?: number
		emailVerified?: boolean
		enablePromotion?: number
		isLineBinding?: boolean
		isResetPwd?: boolean
		lastLogin?: string
		perCountry?: string
		phoneNo?: string
		phoneReward?: number
		phoneVerified?: boolean
		regTime?: string
		userLevel?: number
	}
	checkedItem: {
		categoryId?: number
		categoryName?: string
		enGiftName?: string
		giftDescription?: string
		giftId?: number
		giftName?: string
		giftPictureUrl?: string
		isFavorite?: boolean
		number?: number
		point?: number
		priceWorth?: number
		showStock?: boolean
		stock?: number
		tagList?: object[]
	}
	totalCal: number
	pointBalance: number
	isShowTip: boolean
	setIsShowTip: (isShowTip: boolean) => void
	noteInput: string
	setNoteInput: (note: string) => void
	isChecked: boolean
	isShowOrderItem: boolean
	onSubmit: () => void
}

const Order: FC<ICartOrderProps> = ({
	profile,
	checkedItem,
	totalCal,
	pointBalance,
	isShowTip,
	setIsShowTip,
	noteInput,
	setNoteInput,
	isChecked,
	isShowOrderItem,
	onSubmit,
}) => {
	const { t } = useTranslation()
	return (
		<div className="cart-oder">
			<div>
				<div>
					<span>{t("Username")}</span>
					<span>{profile?.userName}</span>
				</div>
				<div>
					<span>{t("AvailablePoints").toUpperCase()}</span>
					<span className="icon icon-coin">
						{numberFormat(pointBalance, 2)}
					</span>
				</div>
			</div>
			<div>
				{isShowOrderItem && (
					<div>
						<span>{checkedItem.giftName}</span>
						<span className="icon icon-coin minus">
							{numberFormat(
								checkedItem.point *
									(checkedItem.number ? checkedItem.number : 1),
								2
							)}
						</span>
					</div>
				)}
				<div>
					<span>{t("ShippingAndHandling")}</span>
					<span>{t("Free").toUpperCase()}</span>
				</div>
				{/*+ insufficient 當points不夠時狀態*/}
				<div className="wire"></div>
				<div className="total null">
					<span>{t("GRAND_TOTAL")}</span>

					<span
						className={classnames("icon", "icon-coin", {
							minus: totalCal < 0,
						})}>
						{numberFormat(totalCal, 2, false)}
					</span>
				</div>
				{totalCal < 0 && (
					<div className="tip active">{t("InsufficientPointsTip")}</div>
				)}
			</div>
			{profile?.addressCity ? (
				<div>
					<div className="cart-address">
						<span>{t("SHIPPING_ADDRESS")}</span>
						<a
							onClick={() => setIsShowTip(!isShowTip)}
							className="icon icon-information"></a>
						<div className={classnames("cart-tip", { active: isShowTip })}>
							{t("AddressUpdateTip")}
						</div>
					</div>
					<div className="address">
						<p>
							{profile.addressLineFirst}
							{profile.addressLineSecond}
						</p>
						<p>
							{profile.addressCity}
							{profile.addressPostCode}
						</p>
						<p>
							{profile.addressState},{profile.addressCountry}
						</p>
					</div>
				</div>
			) : (
				<div>
					<Link href={`/${profile?.langId}/${paths.profile}`}>
						<button className="btn-add">{t("ADD_ADDRESS")}</button>
					</Link>
				</div>
			)}

			<input
				onChange={e => setNoteInput(e.target.value)}
				value={noteInput}
				type="text"
				placeholder={t("Note")}
			/>
			<div className="txt"></div>
			<button
				onClick={onSubmit}
				className={classnames("btn-checkout", {
					null: !isChecked,
				})}>
				{t("Checkout").toUpperCase()}
			</button>
		</div>
	)
}

export default Order
