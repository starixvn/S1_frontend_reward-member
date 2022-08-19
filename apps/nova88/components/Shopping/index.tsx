import React, { useEffect, useState } from "react"
import GiftTab from "./GiftTab"
import GiftSwiper from "./GiftSwiper"
import Loading from "common/components/Loading"
import {
	useGetGiftTagsQuery,
	useLazyGetGiftListQuery,
	useLazyGetGiftTagsQuery,
	useSetFavoriteMutation,
} from "service/api/storeApi"
import { useLocalStorage } from "usehooks-ts"
import { useInView, usePopBox } from "common/hooks"
import {
	sliderList,
	fromList,
	sortType,
	tabOption,
	PAGE_SIZE_COUNT,
	DEFAULT_PAGE_SIZE_COUNT,
} from "./constants"
import { IGetGiftListArgs } from "service/api/storeApi/type"
import GiftSelector from "./GiftSelector"
import GiftList from "./GiftList"
import { useSelector } from "react-redux"
import { selectedIsLogin } from "service/slice/auth"
import { useSetShoppingCartMutation } from "service/api/redemptionApi"
import { useAppDispatch } from "store"
import { setCartNumber } from "service/slice/cart"
import { useTranslation } from "react-i18next"
import classNames from "classnames"

interface IGetCarListArgs {
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
}

const Shopping = () => {
	const dispatch = useAppDispatch()
	const { i18n } = useTranslation()
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

	// const { data: { data: giftTabs } = {}, isFetching: isGetGiftTabsFetching } =
	// 	useGetGiftTagsQuery(null)
	const [
		getGiftTags,
		{ data: { data: giftTabs = [] } = {}, isFetching: isGetGiftTabsFetching },
	] = useLazyGetGiftTagsQuery()
	const getGiftTabsList = async () => {
		try {
			await getGiftTags(null).unwrap()
		} catch (error) {
			setPopBoxType({
				type: "warn",
				props: { content: error.message },
			})
		}
	}
	const giftTabList =
		giftTabs && giftTabs.length > 0
			? [
					{
						lang: giftTabs[0].lang,
						tagId: 0,
						tagName: "ALL",
					},
					...giftTabs,
					{
						lang: giftTabs[0].lang,
						tagId: 999,
						tagName: "FAVORITE",
					},
			  ]
			: null
	const [
		getGiftList,
		{ data: { data: giftList = [] } = {}, isFetching: isGetGiftListFetching },
	] = useLazyGetGiftListQuery()

	const [setShoppingCart] = useSetShoppingCartMutation()
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
	const [realCartList, setRealCartList] = useState<IGetCarListArgs[]>([])
	const getCartList = async args => {
		try {
			await setShoppingCart(args)
				.unwrap()
				.then(res => {
					setRealCartList(res.data)
					dispatch(setCartNumber(res.data.length))
				})
		} catch (error) {
			setPopBoxType({
				type: "warn",
				props: { content: error.message },
			})
		}
	}
	const [activeTabItem, setActiveTabItem] = useState({})
	const [cartList, setCartList] = useLocalStorage("nova88Cart", [])
	const [isFilterFavorite, setIsFilterFavorite] = useState(false)
	const isLogin = useSelector(selectedIsLogin)
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
	useEffect(() => {
		if (giftTabList && giftTabList.length > 0) {
			setActiveTabItem(giftTabList[0])
		}
	}, [isGetGiftTabsFetching])
	useEffect(() => {
		getGiftTabsList()
	}, [isLogin])
	const handleFavoriteToggle = async item => {
		if (isLogin) {
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
		} else {
			setPopBoxType({
				type: "login",
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
	const handleGiftItemToggle = async giftItem => {
		if (!giftItem.stock && giftItem.showStock) return
		if (isLogin) {
			const item = realCartList?.find(item => item.giftId === giftItem.giftId)
			if (item) {
				await setShoppingCart({ giftIds: [giftItem.giftId], isAdd: 0 })
					.unwrap()
					.then(res => {
						setRealCartList(res.data)
						dispatch(setCartNumber(res.data.length))
					})
			} else {
				await setShoppingCart({ giftIds: [giftItem.giftId], isAdd: 1 })
					.unwrap()
					.then(res => {
						setRealCartList(res.data)
						dispatch(setCartNumber(res.data.length))
					})
			}
		} else {
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
	}

	const handleTabChange = activeTab => {
		setActiveTabItem(activeTab)
		if (activeTab.tagId === tabOption.FAVORITE) {
			setArgs(prev => ({
				...prev,
				tags: null,
			}))

			setIsFilterFavorite(true)
		} else {
			setArgs(prev => ({
				...prev,
				tags: activeTab.tagId ? [activeTab.tagId] : null,
			}))
			setIsFilterFavorite(false)
		}
	}

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
	}, [args, isLogin])
	useEffect(() => {
		if (isLogin) {
			getCartList({ giftIds: [], isAdd: 0 })
		}
	}, [isLogin])
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
		<main
			className={classNames("shopping-page", {
				"other-layout": i18n.language !== "en",
			})}>
			<GiftSwiper />
			<div className="products-group container-xxl">
				<div className="row">
					<GiftTab
						tabList={giftTabList}
						activeItem={activeTabItem}
						onChange={handleTabChange}
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
						activeTabItem={activeTabItem}
						realCartList={realCartList}
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
