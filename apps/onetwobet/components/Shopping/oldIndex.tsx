import {
	IGetGiftListArgs,
	selectedCurrencyId,
	selectedIsLogin,
	selectedLangId,
	useLazyGetGiftListQuery,
	useLazyGetGiftTagsQuery,
	useSetFavoriteMutation,
} from '@api'
import Loading from '@apps/onetwobet/components/common/Loading'
import {
	DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
	fromEnum,
	SHOPPING_PAGE_SIZE_COUNT,
	sortType,
	tabOption,
} from '@constants'
import { useInView } from '@core'
import { useAppSelector, usePopBox } from '@operations'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { GiftList } from './GiftList'
import { GiftSelector } from './GiftSelector'
import { GiftTab } from './GiftTab'
import { GiftSwiper } from './GiftSwiper'

const Shopping = () => {
  const tempqqqr = true;
	const isLogin = useSelector(selectedIsLogin) // 登入參數, 取得產品用
	const langId = useAppSelector(selectedLangId) // 語言參數, 取得產品用
	const currencyId = useAppSelector(selectedCurrencyId) // 貨幣參數, 取得產品用
	const { i18n, t } = useTranslation() // 取得翻譯
	const { setPopBoxType } = usePopBox()
	const [inViewRef, isInView] = useInView() // lazyload用?
	const [args, setArgs] = useState({
		categoryIds: null,
		tags: null,
		orderByField: null,
		desc: false,
		pageSize: DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
	}) // 顯示產品id, 分頁等資訊
	const [categoryList, setCategoryList] = useState([]) // 取得tab list用
	const [activeTabItem, setActiveTabItem] = useState({}) // active中的tab
	const [isFilterFavorite, setIsFilterFavorite] = useState(false) // 是否在favorite list中

	const [
		getGiftTags,
		{ data: { data: giftTabs = [] } = {}, isLoading: isGetGiftTabsLoading },
	] = useLazyGetGiftTagsQuery() // 取得產品tab
	const [
		getGiftList,
		{ data: { data: giftList = [] } = {}, isFetching: isGetGiftListFetching },
	] = useLazyGetGiftListQuery() // 取得產品列表
	const [setFavorite] = useSetFavoriteMutation() // 設定喜愛

  // 取得gift tab list
	const getGiftTabsList = async () => {
		try {
			await getGiftTags({ langId, currencyId }).unwrap()
		} catch (error) {
			setPopBoxType({
				type: 'warn',
				props: { content: error.message },
			})
		}
	}

  // tab list obj, 預設加入all和favorite
  // gift tab list不為空值時也會加入
  // 最終顯示的gift tab list
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

  // filter click handler
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

	const handleSelectorItemChange = (selectorType, label) => {
		if (selectorType === 'category') {
			handleFilter({
				...args,
				categoryIds:
					categoryList.find(e => e.categoryName === label).categoryId !== null
						? [categoryList.find(e => e.categoryName === label).categoryId]
						: null,
				langId,
				currencyId,
			})
			setArgs(prev => ({
				...prev,
				categoryIds:
					categoryList.find(e => e.categoryName === label).categoryId !== null
						? [categoryList.find(e => e.categoryName === label).categoryId]
						: null,
				pageSize: DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
			}))
		} else if (selectorType === 'from') {
			const getOrderByFieldValue = () => {
				const res = fromList.find(e => e.categoryName === label).categoryId
				return sortType[res - 1].orderByField
			}
			const getDescValue = () => {
				const res = fromList.find(e => e.categoryName === label).categoryId
				return sortType[res - 1].desc
			}
			handleFilter({
				...args,
				orderByField: getOrderByFieldValue(),
				desc: getDescValue(),
				langId,
				currencyId,
			})
			setArgs(prev => ({
				...prev,
				orderByField: getOrderByFieldValue(),
				desc: getDescValue(),
				pageSize: DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
			}))
		}
	}

	const handleTabChange = activeTab => {
		setActiveTabItem(activeTab)
		if (activeTab.tagId === tabOption.FAVORITE) {
			handleFilter({
        ...args,
        tags: null,
        langId,
        currencyId })
			setArgs(prev => ({
				...prev,
				tags: null,
				pageSize: DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
			}))
			setIsFilterFavorite(true)
		} else {
			handleFilter({
        ...args,
        tags: activeTab.tagId ? [activeTab.tagId] : null,
				langId,
				currencyId,
			})
			setArgs(prev => ({
				...prev,
				tags: activeTab.tagId ? [activeTab.tagId] : null,
				pageSize: DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
			}))
			setIsFilterFavorite(false)
		}
	}

	const init = async () => {
		try {
			const data = await getGiftList({ ...args, langId, currencyId })
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
	}

	const filterList = isFilterFavorite
		? giftList.filter(obj => obj.isFavorite === true)
		: giftList

	useEffect(() => {
		init()
	}, [])

	useEffect(() => {
		getGiftTabsList()
		if (isLogin) {
			setIsFilterFavorite(false)
			if (giftTabList && giftTabList.length > 0) {
				setActiveTabItem(giftTabList[0])
			}
		}
	}, [isLogin, isGetGiftTabsLoading])

	useEffect(() => {
		handleFilter({ ...args, langId, currencyId })
	}, [args, langId, currencyId])

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
				'other-layout': !(i18n.language === 'en'),
			})}
		>
			<GiftSwiper />
			<div className='products-group container-xxl'>
				<div className='row'>

					{isGetGiftTabsLoading ? (
						<Loading />
					) : (
						<GiftTab
							activeItem={activeTabItem}
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
							itemList={fromList}
							onChange={label => handleSelectorItemChange('from', label)}
						/>
					</div>
					<GiftList
						filterList={filterList}
						activeTabItem={activeTabItem}
					/>
				</div>
				<div ref={inViewRef} />
				<br />
			</div>
		</main>
	)
}
export default Shopping
