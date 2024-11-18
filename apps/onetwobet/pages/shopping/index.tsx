import {
	IGetGiftListArgs,
	selectedCurrencyId,
	selectedLangId,
	useLazyGetGiftListQuery,
} from '@api'
import Layout from '@apps/onetwobet/components/common/Layout'
import Wrapper from '@apps/onetwobet/components/common/Wrapper'
import {
	GiftList,
	GiftSelector,
	GiftSwiper,
	GiftTab,
} from '@apps/onetwobet/components/Shopping'
import {
	DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
	fromEnum,
	SHOPPING_PAGE_SIZE_COUNT,
	sortType,
	tabOption,
} from '@constants'
import { useAppSelector, usePopBox } from '@operations'
import classNames from 'classnames'
import { useInView } from '@core'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface TabItem {
	lang?: string
	tagId?: number
	tagName?: string
}

const Index = () => {
	const langId = useAppSelector(selectedLangId)
	const currencyId = useAppSelector(selectedCurrencyId)
	const { i18n, t } = useTranslation()
	const [inViewRef, isInView] = useInView()
	const [categoryList, setCategoryList] = useState([])
	const [activeTabItem, setActiveTabItem] = useState<TabItem>({})
	const [isFilterFavorite, setIsFilterFavorite] = useState(false)

	const { setPopBoxType } = usePopBox()
	const [args, setArgs] = useState<IGetGiftListArgs>({
		langId: '',
		currencyId: 0,
		categoryIds: null,
		tags: null,
		orderByField: null,
		desc: false,
		pageSize: DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
	})

	const [
		getGiftList,
		{ data: { data: giftList = [] } = {}, isFetching: isGetGiftListFetching },
	] = useLazyGetGiftListQuery()

	useEffect(() => {
		handleFilter({ ...args, langId, currencyId })
	}, [args, langId, currencyId])

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

	const getCategoryList = giftList => {
		const categoryList = [
			{
				categoryName: t('ALL'),
				categoryId: null,
			},
		]
		if (Array.isArray(giftList) && giftList.length > 0) {
			giftList?.forEach(obj => {
				categoryList.push({
					categoryName: obj.categoryName,
					categoryId: obj.categoryId,
				})
			})
		}
		return categoryList
	}

	const filterList = isFilterFavorite
		? giftList.filter(obj => obj.isFavorite === true)
		: giftList

	const handleSelectorItemChange = (selectorType, label) => {
		if (selectorType === 'category') {
			const categoryIds = categoryList.find(e => e.categoryName === label)
			setArgs(prev => ({
				...prev,
				categoryIds:
					categoryIds.categoryId != null ? [categoryIds.categoryId] : null,
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
			setArgs(prev => ({
				...prev,
				orderByField: getOrderByFieldValue(),
				desc: getDescValue(),
				langId,
				currencyId,
				pageSize: DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
			}))
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
	}

	useEffect(() => {
		init()
	}, [])

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
		<Wrapper authRequired={false}>
			<Layout>
				<main
					className={classNames('shopping-page', {
						'other-layout': !(i18n.language === 'en'),
					})}
				>
					<GiftSwiper />
					<div className='products-group container-xxl'>
						<div className='row'>
							<GiftTab
								activeItem={activeTabItem}
								setActiveItem={setActiveTabItem}
								setArgs={setArgs}
								setIsFilterFavorite={setIsFilterFavorite}
							/>
							<div className='select'>
								<div className='inputBox-null' />
								<GiftSelector
									placeHolder={t('Category')}
									itemList={categoryList}
									onChange={label =>
										handleSelectorItemChange('category', label)
									}
								/>
								<GiftSelector
									placeHolder={t('From')}
									itemList={fromList}
									onChange={label => handleSelectorItemChange('from', label)}
								/>
							</div>
							<GiftList
								filterList={filterList}
								isFavoriteTab={activeTabItem.tagId === tabOption.FAVORITE}
							/>
						</div>
						<div ref={inViewRef} />
						<br />
					</div>
				</main>
			</Layout>
		</Wrapper>
	)
}

export default Index
