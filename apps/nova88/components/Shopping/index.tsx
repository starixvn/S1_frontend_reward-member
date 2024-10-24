import {
	IGetGiftListArgs,
	ISetShoppingCarData,
	selectedIsLogin,
	selectedLangId,
	setCartNumber,
	useLazyGetGiftListQuery,
	useLazyGetGiftTagsQuery,
	useSetFavoriteMutation,
	useSetShoppingCartMutation,
} from '@api'
import Loading from '@apps/nova88/components/common/Loading'
import {
	DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
	fromEnum,
	SHOPPING_PAGE_SIZE_COUNT,
	sortType,
	tabOption,
} from '@constants'
import { useInView } from '@core'
import { useAppDispatch, useAppSelector, usePopBox } from '@operations'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useLocalStorage } from 'usehooks-ts'
import GiftList from './GiftList'
import GiftSelector from './GiftSelector'
import GiftSwiper from './GiftSwiper'
import GiftTab from './GiftTab'

const Shopping = () => {
	const dispatch = useAppDispatch()
	const isLogin = useSelector(selectedIsLogin)
	const lang = useAppSelector(selectedLangId)
	const { i18n, t } = useTranslation()
	const { setPopBoxType } = usePopBox()
	const [inViewRef, isInView] = useInView()
	const [cartList, setCartList] = useLocalStorage('nova88Cart', [])
	const [args, setArgs] = useState({
		categoryIds: null,
		tags: null,
		orderByField: null,
		desc: false,
		pageSize: DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
	})
	const [categoryList, setCategoryList] = useState([])
	const [realCartList, setRealCartList] = useState<ISetShoppingCarData[]>([])
	const [activeTabItem, setActiveTabItem] = useState({})
	const [isFilterFavorite, setIsFilterFavorite] = useState(false)
	const [currentLangId, setCurrentLangId] = useState('')
	const fromList = [
		{ categoryId: fromEnum.LOW_TO_HIGH_COST, categoryName: t('LowToHighCost') },
		{ categoryId: fromEnum.HIGH_TO_LOW_COST, categoryName: t('HighToLowCost') },
		{
			categoryId: fromEnum.LOW_TO_HIGH_LETTER,
			categoryName: t('LowToHighLetter'),
		},
		{
			categoryId: fromEnum.HIGH_TO_LOW_LETTER,
			categoryName: t('HighToLowLetter'),
		},
	]
	const [sortFromList, setSortFromList] = useState(fromList)
	const [
		getGiftTags,
		{ data: { data: giftTabs = [] } = {}, isLoading: isGetGiftTabsLoading },
	] = useLazyGetGiftTagsQuery()
	const [
		getGiftList,
		{ data: { data: giftList = [] } = {}, isFetching: isGetGiftListFetching },
	] = useLazyGetGiftListQuery()
	const [setShoppingCart] = useSetShoppingCartMutation()
	const [setFavorite] = useSetFavoriteMutation()

	const getGiftTabsList = async langId => {
		try {
			await getGiftTags({ langId }).unwrap()
		} catch (error) {
			setPopBoxType({
				type: 'warn',
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
						tagName: 'ALL',
					},
					...giftTabs,
					{
						lang: giftTabs[0].lang,
						tagId: 999,
						tagName: 'FAVORITE',
					},
			  ]
			: [
					{
						lang: i18n.language,
						tagId: 0,
						tagName: 'ALL',
					},
					{
						lang: i18n.language,
						tagId: 999,
						tagName: 'FAVORITE',
					},
			  ]
	const handleFilter = async (args: IGetGiftListArgs) => {
		try {
			await getGiftList(args).unwrap()
		} catch (error) {
			setPopBoxType({
				type: 'warn',
				props: { content: error.message },
			})
		}
	}

	const getCartList = async args => {
		try {
			await setShoppingCart(args)
				.unwrap()
				.then(res => {
					setRealCartList(prev => [...prev, ...res.data])
					dispatch(setCartNumber(res.data.length))
				})
		} catch (error) {
			setPopBoxType({
				type: 'warn',
				props: { content: error.message },
			})
		}
	}

	const getCategoryList = giftList => {
		const tempList = []
		const categoryList = [
			{
				categoryName: t('ALL'),
				categoryId: null,
			},
		]
		giftList?.forEach(obj => {
			tempList.push({
				categoryName: obj.categoryName,
				categoryId: obj.categoryId,
			})
		})
		tempList.forEach(item => {
			const found = categoryList.find(obj => obj.categoryId === item.categoryId)
			!found && categoryList.push(item)
		})
		return categoryList
	}

	const handleFavoriteToggle = async item => {
		if (isLogin) {
			try {
				await setFavorite({
					langId: i18n.language,
					giftId: item.giftId,
					isFavorite: !item.isFavorite,
				}).unwrap()
			} catch (error) {
				setPopBoxType({
					type: 'warn',
					props: { content: error.message },
				})
			}
		} else {
			setPopBoxType({
				type: 'login',
			})
		}
	}

	const handleSelectorItemChange = (selectorType, label) => {
		if (selectorType === 'category') {
			handleFilter({
				...args,
				categoryIds:
					categoryList.find(e => e.categoryName === label).categoryId !== null
						? [categoryList.find(e => e.categoryName === label).categoryId]
						: null,
				langId: i18n.language,
			})
			setArgs(prev => ({
				...prev,
				categoryIds:
					categoryList.find(e => e.categoryName === label).categoryId !== null
						? [categoryList.find(e => e.categoryName === label).categoryId]
						: null,
				pageSize: DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
				langId: i18n.language,
			}))
		} else if (selectorType === 'from') {
			const getOrderByFieldValue = () => {
				const res = sortFromList.find(
					e => t(e.categoryName) === label
				).categoryId
				return sortType[res - 1].orderByField
			}
			const getDescValue = () => {
				const res = sortFromList.find(
					e => t(e.categoryName) === label
				).categoryId
				return sortType[res - 1].desc
			}
			handleFilter({
				...args,
				orderByField: getOrderByFieldValue(),
				desc: getDescValue(),
				langId: i18n.language,
			})
			setArgs(prev => ({
				...prev,
				orderByField: getOrderByFieldValue(),
				desc: getDescValue(),
				pageSize: DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
				langId: i18n.language,
			}))
		}
	}

	const handleGiftItemToggle = async giftItem => {
		if (!giftItem.stock) return
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
			handleFilter({ ...args, tags: null, langId: i18n.language })
			setArgs(prev => ({
				...prev,
				tags: null,
				pageSize: DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
				langId: i18n.language,
			}))
			setIsFilterFavorite(true)
		} else {
			handleFilter({
				...args,
				tags: activeTab.tagId ? [activeTab.tagId] : null,
				langId: i18n.language,
			})
			setArgs(prev => ({
				...prev,
				tags: activeTab.tagId ? [activeTab.tagId] : null,
				pageSize: DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
				langId: i18n.language,
			}))
			setIsFilterFavorite(false)
		}
	}

	const init = async () => {
		try {
			const data = await getGiftList({ ...args, langId: i18n.language })
			const giftList = data.data.data
			setCategoryList(getCategoryList(giftList))
		} catch (error) {
			setPopBoxType({
				type: 'warn',
				props: { content: error.message },
			})
		}
		if (giftTabList && giftTabList.length > 0) {
			setActiveTabItem(giftTabList[0])
		}
		setCurrentLangId(i18n.language)
	}

	const filterList = isFilterFavorite
		? giftList.filter(obj => obj.isFavorite === true)
		: giftList

	const handleFromList = () => {
		for (let i = 0; i < sortFromList.length; i++) {
			sortFromList[i].categoryName = t(fromList[i].categoryName)
		}
		setSortFromList(sortFromList)
	}

	const langEnList = ['en', 'th_en', 'id_en']

	useEffect(() => {
		init()
	}, [])

	useEffect(() => {
		getGiftTabsList(i18n.language)
		if (isLogin) {
			getGiftTabsList(lang)
			handleFilter({
				...{
					categoryIds: null,
					tags: null,
					orderByField: null,
					desc: false,
					pageSize: args.pageSize,
				},
				langId: lang,
			})
			const giftIdList = []
			cartList.forEach(item => {
				giftIdList.push(item.giftId)
			})
			getCartList({ giftIds: giftIdList, isAdd: 1 })
			setCartList([])
			setIsFilterFavorite(false)
			if (giftTabList && giftTabList.length > 0) {
				setActiveTabItem(giftTabList[0])
			}
		}
	}, [isLogin, isGetGiftTabsLoading, i18n.language, lang])

	useEffect(() => {
		handleFilter({ ...args, langId: i18n.language })
	}, [i18n.language, args])

	useEffect(() => {
		if (currentLangId !== i18n.language) {
			handleFilter({ ...args, langId: i18n.language, categoryIds: null }).then(
				() => {
					setCategoryList(getCategoryList(giftList))
					setCurrentLangId(i18n.language)
					handleFromList()
				}
			)
		}
	}, [isGetGiftListFetching])

	useEffect(() => {
		const isLast = args.pageSize > giftList.length + SHOPPING_PAGE_SIZE_COUNT

		if (isLast || isGetGiftListFetching) return

		if (isInView) {
			setArgs(({ pageSize, ...prev }) => ({
				...prev,
				pageSize: pageSize + SHOPPING_PAGE_SIZE_COUNT,
			}))
		}
	}, [isInView])

	return (
		<main
			className={classNames('shopping-page', {
				'other-layout': !langEnList.includes(i18n.language),
			})}
		>
			<GiftSwiper />
			<div className='products-group container-xxl'>
				<div className='row'>
					{isGetGiftTabsLoading ? (
						<Loading />
					) : (
						<GiftTab
							tabList={giftTabList}
							activeItem={activeTabItem}
							onChange={handleTabChange}
						/>
					)}

					<div className='select'>
						<div className='inputBox-null' />
						<GiftSelector
							placeHolder={t('Category')}
							itemList={categoryList}
							onChange={label => handleSelectorItemChange('category', label)}
						/>
						<GiftSelector
							placeHolder={t('From')}
							itemList={sortFromList}
							onChange={label => handleSelectorItemChange('from', label)}
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
				<div ref={inViewRef} />
				<br />
			</div>
		</main>
	)
}
export default Shopping
