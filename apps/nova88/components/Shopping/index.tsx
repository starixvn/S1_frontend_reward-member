import React, { useState } from "react"
import GiftSwiper from "./GiftSwiper"
import GiftTab from "./GiftTab"
import { useGetGiftListQuery } from "service/api/storeApi"
import { useRouter } from "next/router"
import GiftSelector from "./GiftSelector"
import GiftList from "./GiftList"
import { useLocalStorage } from "usehooks-ts"
import Loading from "../../common/components/Loading"
import { sliderList, tabList, fromList, sortType } from "./constants"
const Shopping = () => {
	const [giftListQuery, setGiftListQuery] = useState({
		langId: "en",
		categoryIds: [1],
		tags: null,
		orderByField: null,
		desc: false,
	})
	//call api
	const {
		data: { data: giftList = [] } = {},
		isFetching: isGetGiftListFetching,
	} = useGetGiftListQuery(giftListQuery)
	const router = useRouter()
	const [activeTabItem, setActiveTabItem] = useState(tabList[0])
	const [cartList, setCartList] = useLocalStorage("nova88Cart", [])
	const getCategoryList = () => {
		const categoryList = []
		giftList?.forEach(obj => categoryList.push(obj.categoryName))
		return categoryList
	}

	const handleSelectorItemChange = (selectorType, label) => {
		if (selectorType === "category") {
			setGiftListQuery(prev => ({
				...prev,
				categoryIds: [getCategoryList().indexOf(label) + 1],
			}))
		} else if (selectorType === "from") {
			setGiftListQuery(prev => ({
				...prev,
				orderByField: sortType[label].orderByField,
				desc: sortType[label].desc,
			}))
		}
	}

	const handleGiftItemToggle = giftItem => {
		if (!giftItem.stock) return
		const item = cartList.find(item => item.giftId === giftItem.giftId)
		if (item) {
			let tempList = []
			tempList = cartList.filter(item => item.giftId !== giftItem.giftId)
			setCartList(tempList)
		} else {
			cartList.push(giftItem)
			setCartList(cartList)
		}
	}

	const handleTabChange = activeTab => {
		setActiveTabItem(activeTab)
		setGiftListQuery(prev => ({
			...prev,
			tags: activeTab.id ? [activeTab.id] : null,
		}))
	}

	const GoToMore = () => router.push("/")

	return (
		<main className="shopping-page">
			<GiftSwiper sliderList={sliderList} />
			<div className="products-group container-xxl">
				<div className="row">
					<GiftTab
						tabList={tabList}
						activeItem={activeTabItem}
						onChange={handleTabChange}
						onGoToMore={GoToMore}
					/>
					<div className="select">
						<div className="inputBox-null" />
						<GiftSelector
							placeHolder="Category"
							itemList={getCategoryList()}
							onChange={label => handleSelectorItemChange("category", label)}
						/>
						<GiftSelector
							placeHolder="From"
							itemList={fromList}
							onChange={label => handleSelectorItemChange("from", label)}
						/>
					</div>
					<GiftList filterList={giftList} onToggle={handleGiftItemToggle} />
				</div>
				{isGetGiftListFetching && <Loading />}
			</div>
		</main>
	)
}
export default Shopping
