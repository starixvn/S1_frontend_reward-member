import React, { useEffect, useState } from "react"
import GiftTab from "./GiftTab"
import GiftSwiper from "./GiftSwiper"
import Loading from "common/components/Loading"
import {
	useLazyGetGiftListQuery,
	useSetFavoriteMutation,
} from "service/api/storeApi"
import { useLocalStorage } from "usehooks-ts"
import { useRouter } from "next/router"
import { useInView, usePopBox } from "common/hooks"
import {
	sliderList,
	tabList,
	fromList,
	sortType,
	tabOption,
	PAGE_SIZE_COUNT,
	DEFAULT_PAGE_SIZE_COUNT,
} from "./constants"
import { IGetGiftListArgs } from "service/api/storeApi/type"
import GiftSelector from "./GiftSelector"
import GiftList from "./GiftList"

const Shopping = () => {
	const { setPopBoxType } = usePopBox()
	const [inViewRef, isInView] = useInView()

	const [args, setArgs] = useState<IGetGiftListArgs>({
		langId: "en",
		categoryIds: null,
		tags: null,
		orderByField: null,
		desc: false,
		pageSize: DEFAULT_PAGE_SIZE_COUNT,
	})

	const [categoryList, setCategoryList] = useState([])

	const [
		getGiftList,
		{ data: { data: giftList = [] } = {}, isFetching: isGetGiftListFetching },
	] = useLazyGetGiftListQuery()

	const [setFavorite] = useSetFavoriteMutation()

	const handleFilter = async (args: IGetGiftListArgs) => {
		try {
			await getGiftList(args).unwrap()
		} catch (error) {
			setPopBoxType({
				type: "warn",
				props: { content: error.message },
			})
		}
	}
	const router = useRouter()
	const [activeTabItem, setActiveTabItem] = useState(tabList[0])
	const [cartList, setCartList] = useLocalStorage("nova88Cart", [])
	const [isFilterFavorite, setIsFilterFavorite] = useState(false)
	const getCategoryList = giftList => {
		const tempList = []
		const categoryList = []
		giftList?.forEach(obj => {
			tempList.push(obj.categoryName)
		})
		tempList.forEach(e => {
			!categoryList.includes(e) && categoryList.push(e)
		})
		return categoryList
	}

	const handleFavoriteToggle = async item => {
		try {
			await setFavorite({
				langId: "en",
				giftId: item.giftId,
				isFavorite: !item.isFavorite,
			}).unwrap()
		} catch (error) {
			setPopBoxType({
				type: "warn",
				props: { content: error.message },
			})
		}
	}
	const handleSelectorItemChange = (selectorType, label) => {
		if (selectorType === "category") {
			setArgs(prev => ({
				...prev,
				categoryIds: [categoryList.indexOf(label) + 1],
			}))
		} else if (selectorType === "from") {
			setArgs(prev => ({
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
		if (activeTab.id === tabOption.FAVORITE) {
			setArgs(prev => ({
				...prev,
				tags: null,
			}))

			setIsFilterFavorite(true)
		} else {
			setArgs(prev => ({
				...prev,
				tags: activeTab.id ? [activeTab.id] : null,
			}))
			setIsFilterFavorite(false)
		}
	}

	const goToMore = () => router.push("/")
	const init = async () => {
		try {
			const data = await getGiftList(args)
			const giftList = data.data.data
			setCategoryList(getCategoryList(giftList))
		} catch (error) {
			setPopBoxType({
				type: "warn",
				props: { content: error.message },
			})
		}
	}
	useEffect(() => {
		init()
	}, [])

	useEffect(() => {
		handleFilter(args)
	}, [args])

	useEffect(() => {
		const isLast = args.pageSize > giftList.length + PAGE_SIZE_COUNT
		if (isLast || isGetGiftListFetching) return

		if (isInView) {
			setArgs(({ pageSize, ...prev }) => ({
				...prev,
				pageSize: pageSize + PAGE_SIZE_COUNT,
			}))
		}
	}, [isInView])

	const filterList = isFilterFavorite
		? giftList.filter(obj => obj.isFavorite === true)
		: giftList

	return (
		<main className="shopping-page">
			<GiftSwiper sliderList={sliderList} />
			<div className="products-group container-xxl">
				<div className="row">
					<GiftTab
						tabList={tabList}
						activeItem={activeTabItem}
						onChange={handleTabChange}
						onGoToMore={goToMore}
					/>
					<div className="select">
						<div className="inputBox-null" />
						<GiftSelector
							placeHolder="Category"
							itemList={categoryList}
							onChange={label => handleSelectorItemChange("category", label)}
						/>
						<GiftSelector
							placeHolder="From"
							itemList={fromList}
							onChange={label => handleSelectorItemChange("from", label)}
						/>
					</div>
					<GiftList
						filterList={filterList}
						onToggleCart={handleGiftItemToggle}
						onToggleFavorite={handleFavoriteToggle}
					/>
				</div>
				{isGetGiftListFetching && <Loading />}

				<div ref={inViewRef} />

				<br />
			</div>
		</main>
	)
}
export default Shopping
