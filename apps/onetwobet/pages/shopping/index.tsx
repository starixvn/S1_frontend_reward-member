import { IGetGiftListArgs, selectedCurrencyId, selectedLangId, useLazyGetGiftListQuery } from '@api'
import Layout from '@apps/onetwobet/components/common/Layout'
import Wrapper from '@apps/onetwobet/components/common/Wrapper'
import { GiftList, GiftSelector, GiftSwiper, GiftTab } from '@apps/onetwobet/components/Shopping'
import { DEFAULT_SHOPPING_PAGE_SIZE_COUNT, fromEnum, SHOPPING_PAGE_SIZE_COUNT, sortType, tabOption } from '@constants'
import { useAppSelector, usePopBox } from '@operations'
import classNames from 'classnames'
import { useInView } from 'libs/core/src/lib/hooks/useInView'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// 可以將多個子元件需要的共通item從這個父元件取得再傳入給子元件
// 也能用useContext只讓部分元件使用, 但這個project統一使用redux而非useContext, 所以不建議這樣改
// 共通item如果沒有多個compoment都需要的話也不建議搬至redux中

// 點擊tab / filter時都需要重新getItemList from api

interface TabItem {
  lang?: string;
  tagId?: number;
  tagName?: string;
};

const Index = () => {
	const langId = useAppSelector(selectedLangId) // 語言參數, 取得產品用
	const currencyId = useAppSelector(selectedCurrencyId) // 貨幣參數, 取得產品用
	const { i18n, t } = useTranslation()
  const [inViewRef, isInView] = useInView()
  const [categoryList, setCategoryList] = useState([]) // 取得tab list用
	const [activeTabItem, setActiveTabItem] = useState<TabItem>({}) // active中的tab
	const [isFilterFavorite, setIsFilterFavorite] = useState(false)


  const { setPopBoxType } = usePopBox()
  const [args, setArgs] = useState<IGetGiftListArgs>({
    langId:'',
    currencyId:0,
		categoryIds: null,
		tags: null,
		orderByField: null,
		desc: false,
		pageSize: DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
	}) // 用來取得產品資訊的query object

  const [
		getGiftList,
		{ data: { data: giftList = [] } = {}, isFetching: isGetGiftListFetching },
	] = useLazyGetGiftListQuery() // 取得產品列表

  useEffect(() => {
    // 重新取得item資料
    // 當query參數或lang,currency被改變時觸發
    handleFilter({...args, langId, currencyId});
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

  // 應該移除
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
  ] // selector中的選項

  const getCategoryList = giftList => {
      const categoryList = [
        {
          categoryName: t('ALL'),
          categoryId: null,
        },
      ]
      if( Array.isArray(giftList) && giftList.length > 0){
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

  // 根據下拉選單內容修改args
  const handleSelectorItemChange = (selectorType, label) => {
		if (selectorType === 'category') {
      const categoryIds = categoryList.find(e => e.categoryName === label)
			setArgs(prev => ({
				...prev,
				categoryIds: categoryIds.categoryId !=null ? [categoryIds.categoryId] : null,
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
      // 修改arg以觸發useState, 更新itemList
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
<main className={classNames('shopping-page', {
						'other-layout': !(i18n.language === 'en'),
					})}
				>
					<GiftSwiper />
					<div className='products-group container-xxl'>
            <GiftTab
            activeItem={activeTabItem}
            setActiveItem={setActiveTabItem}
            setArgs={setArgs}
            setIsFilterFavorite={setIsFilterFavorite}/>
            <div className='select'>
						<div className='inputBox-null' />
						<GiftSelector
							type={t('Category')}
              itemList={categoryList}
							onChange={label => handleSelectorItemChange('category', label)}
						/>
						<GiftSelector
							type={t('From')}
              itemList={fromList}
              onChange={label => handleSelectorItemChange('from', label)}
						/>
            </div>
					<GiftList
						filterList={filterList}
            isFavoriteTab={activeTabItem.tagId === tabOption.FAVORITE}
            />
            <div ref={inViewRef} />
            <br />
					</div>
				</main>
			</Layout>
		</Wrapper>
	)
}

export default Index
