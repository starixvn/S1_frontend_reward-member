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
import GiftList from './GiftList'
import GiftSelector from './GiftSelector'
import { GiftTab } from './GiftTab'
import { GiftSwiper } from './GiftSwiper'

const Shopping = () => {
	const isLogin = useSelector(selectedIsLogin)
	const langId = useAppSelector(selectedLangId)
	const currencyId = useAppSelector(selectedCurrencyId)
	const { i18n, t } = useTranslation()
	const { setPopBoxType } = usePopBox()
	const [inViewRef, isInView] = useInView()
	const [args, setArgs] = useState({
		categoryIds: null,
		tags: null,
		orderByField: null,
		desc: false,
		pageSize: DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
	})
	const [categoryList, setCategoryList] = useState([])
	const [activeTabItem, setActiveTabItem] = useState({})
	const [isFilterFavorite, setIsFilterFavorite] = useState(false)
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
	const [
		getGiftTags,
		{ data: { data: giftTabs = [] } = {}, isLoading: isGetGiftTabsLoading },
	] = useLazyGetGiftTagsQuery()
	const [
		getGiftList,
		{ data: { data: giftList = [] } = {}, isFetching: isGetGiftListFetching },
	] = useLazyGetGiftListQuery()
	const [setFavorite] = useSetFavoriteMutation()

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
			handleFilter({ ...args, tags: null, langId, currencyId })
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
						onToggleFavorite={handleFavoriteToggle}
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
