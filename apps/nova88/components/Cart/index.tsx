import React, { useEffect, useMemo, useState } from "react"
import { useLocalStorage } from "usehooks-ts"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import { selectedProfile } from "service/slice/auth"
import GiftTab from "components/Shopping/GiftTab"
import GiftList from "components/Shopping/GiftList"
import {
	useGetGiftListQuery,
	useLazyGetPointBalanceQuery,
} from "service/api/storeApi"
import Loading from "common/components/Loading"
import CartList from "./CartList"
import Order from "./CartOrder"
import { useTranslation } from "react-i18next"
import { usePopBox } from "common/hooks"
import { useLazyCreateRedemptionQuery } from "service/api/redemptionApi"
import { imageUrl } from "../../config"

interface ICheckOutArgs {
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

const Cart = () => {
	const { t } = useTranslation()
	const { setPopBoxType } = usePopBox()
	const [giftListQuery] = useState({
		langId: "en",
		categoryIds: null,
		tags: [3],
		orderByField: null,
		desc: false,
	})
	const {
		data: { data: giftList = [] } = {},
		isFetching: isGetGiftListFetching,
	} = useGetGiftListQuery(giftListQuery)
	const [getPointBalance] = useLazyGetPointBalanceQuery()
	const [createRedemption] = useLazyCreateRedemptionQuery()
	const [cartState, setCartState] = useLocalStorage("nova88Cart", [])
	const [cartList, setCartList] = useState([])
	const route = useRouter()
	const profile = useSelector(selectedProfile)
	const [checkedItem, setCheckedItem] = useState<ICheckOutArgs>({})
	const [isShowTip, setIsShowTip] = useState(false)
	const [noteInput, setNoteInput] = useState("")
	const [pointBalance, setPointBalance] = useState(0)
	const handleGetPointBalance = async args => {
		try {
			const res: { data: { pointBalance: number } } = await getPointBalance(
				args
			).unwrap()
			setPointBalance(res.data.pointBalance)
		} catch (error) {
			setPopBoxType({
				type: "warn",
				props: { content: error.message },
			})
		}
	}

	useEffect(() => {
		handleGetPointBalance(null)
	}, [profile])

	const handleDropDownChange = (quantity, item) => {
		const cartListTarget = cartList?.find(obj => obj.giftId === item.giftId)
		cartListTarget.number = quantity
		if (checkedItem?.giftId === item.giftId) {
			setCheckedItem(prev => ({
				...prev,
				number: quantity,
			}))
		}
		setCartState(cartList)
	}
	const handleCheckBoxToggle = (e, item) => {
		if (!item.number) {
			item["number"] = 1
		}
		setCheckedItem(item)
	}
	const isShowOrderItem =
		checkedItem.giftId &&
		cartList.find(obj => obj.giftId === checkedItem.giftId)

	const totalCal = useMemo(() => {
		const userReward = pointBalance
		const cartReward = checkedItem.number * checkedItem.point
		if (isShowOrderItem) {
			return userReward - cartReward
		}
		return userReward
	}, [pointBalance, checkedItem, isShowOrderItem])

	const isChecked = Boolean(
		checkedItem.giftId && totalCal >= 0 && profile.addressCity
	)
	const handleCartItemRemove = item => {
		const newList = cartList.filter(obj => obj.giftId !== item.giftId)
		item.giftId === checkedItem.giftId && setCheckedItem({})
		setCartState(newList)
	}

	const handleGiftItemToggle = giftItem => {
		if (!giftItem.stock) return
		const item = cartList.find(item => item.giftId === giftItem.giftId)
		if (item) {
			const tempList = cartList.filter(item => item.giftId !== giftItem.giftId)
			setCartState(tempList)
		} else {
			cartList.push(giftItem)
			setCartState(cartList)
		}
	}

	const handleSubmit = async () => {
		if (isChecked) {
			try {
				await createRedemption({
					giftId: checkedItem.giftId,
					point: checkedItem.point * checkedItem.number,
				})
				const newList = cartState.filter(obj => {
					return obj.giftId !== checkedItem.giftId
				})
				setCartState(newList)
				setCheckedItem({})
				setNoteInput("")
				handleGetPointBalance(null)
			} catch (error) {
				setPopBoxType({
					type: "warn",
					props: { content: error.message },
				})
			}
		}
	}

	useEffect(() => {
		setCartList(cartState)
	}, [cartState])
	return (
		<main className="cart-page container-xxl">
			<div className="row">
				<div className="col-lg-8 col-lg-8">
					<div className="cart-txt">
						<i className="icon icon-cart"></i>
						<div className="title">
							{t("ShoppingCart")}
							<span>
								{cartList.length} {t("Items1")}
							</span>
						</div>
						<div>{t("ShoppingCartTip")}</div>
					</div>
					<div className="cart-list">
						<div className="cart-head">
							<div className="cart-check">
								<span>{t("CheckoutLater")}</span>
							</div>
							<div className="cart-info">
								<div>{t("Items2")}</div>
								<div>{t("Quantity")}</div>
								<div>{t("Points")}</div>
							</div>
							<div className="cart-del"></div>
						</div>
						{cartList.length > 0 ? (
							<CartList
								cartList={cartList}
								checkedItem={checkedItem}
								onToggle={handleCheckBoxToggle}
								onChange={handleDropDownChange}
								onRemove={handleCartItemRemove}
							/>
						) : (
							<div className={"cart-null active"}>
								<i className="icon icon-cart"></i>
								<div>{t("EmptyText1")}</div>
								<button
									onClick={() => {
										route.push("/Shopping")
									}}
								>
									{t("EmptyText2")}
								</button>
							</div>
						)}
					</div>
				</div>
				<div className="col-lg-4 col-xl-4">
					<div className="cart-txt">
						<div className="title">{t("OrderSummary")}</div>
						<div>{t("OrderSummaryTip")}</div>
					</div>
					{/*購物Points明細*/}
					<Order
						profile={profile}
						checkedItem={checkedItem}
						totalCal={totalCal}
						pointBalance={pointBalance}
						isShowTip={isShowTip}
						setIsShowTip={setIsShowTip}
						onGoToProfile={() =>
							route.replace(`https://www.nova88.net/en/profile`)
						}
						noteInput={noteInput}
						setNoteInput={setNoteInput}
						isChecked={isChecked}
						isShowOrderItem={isShowOrderItem}
						onSubmit={handleSubmit}
					/>
				</div>
			</div>
			<div className="recommend row">
				<div className="col-lg-5 col-xl-5">
					<div className="affiliate-txt">
						<div className="title">{t("AffiliatesProgram")}</div>
						{t("AffiliatesProgramTip")}
					</div>
					<div>
						<img src={`${imageUrl}/img/affiliatebg-1.jpg`} alt="img" />
					</div>
				</div>
				<div className="products-group col-lg-7 col-xl-7">
					<div className="row">
						<GiftTab
							tabList={[{ id: 3, label: "FEATURED" }]}
							onGoToMore={() => route.push("/Shopping")}
						/>
						<GiftList
							filterList={giftList}
							onToggleCart={handleGiftItemToggle}
						/>
						{isGetGiftListFetching && <Loading />}
					</div>
				</div>
			</div>
		</main>
	)
}

export default Cart
