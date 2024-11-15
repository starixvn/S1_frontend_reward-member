import { IGetGiftListArgs, selectedCurrencyId, selectedIsLogin, selectedLangId, useLazyGetGiftListQuery } from '@api'
import Layout from '@apps/onetwobet/components/common/Layout'
import Wrapper from '@apps/onetwobet/components/common/Wrapper'
import { GiftList, GiftSelector, GiftSwiper, GiftTab } from '@apps/onetwobet/components/Shopping'
import Empty from '@apps/onetwobet/components/Shopping/Empty'
import { DEFAULT_SHOPPING_PAGE_SIZE_COUNT, fromEnum, sortType, tabOption } from '@constants'
import { useAppSelector, usePopBox } from '@operations'
import classNames from 'classnames'
import { useInView } from 'libs/core/src/lib/hooks/useInView'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

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
  const isLogin = useSelector(selectedIsLogin) // 登入參數, 取得產品用
	const langId = useAppSelector(selectedLangId) // 語言參數, 取得產品用
	const currencyId = useAppSelector(selectedCurrencyId) // 貨幣參數, 取得產品用
	const { i18n, t } = useTranslation()
  const [inViewRef, isInView] = useInView()
  const [categoryList, setCategoryList] = useState([]) // 取得tab list用
	const [activeTabItem, setActiveTabItem] = useState<TabItem>({}) // active中的tab

  const { setPopBoxType } = usePopBox()
  const [args, setArgs] = useState<IGetGiftListArgs>({
    langId:'',
    currencyId:0,
		categoryIds: null,
		tags: null,
		orderByField: null,
		desc: false,
		pageSize: DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
	}) // 顯示產品id, 分頁等資訊

  const [
		getGiftList,
		{ data: { data: giftList = [] } = {}, isFetching: isGetGiftListFetching },
	] = useLazyGetGiftListQuery() // 取得產品列表

  useEffect(() => {
    // 重新取得item資料
    handleFilter(args);
  }, [args])

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

  // 取得categoryList
  // 預設值的all, 加上giftList foreach加入的結果
  // revision
  const getCategoryList = giftList => {
		const categoryList = [
			{
				categoryName: t('ALL'),
				categoryId: null,
			},
		]
		giftList?.forEach(obj => {
			const found = categoryList.find(obj => obj.categoryId === obj.categoryId)
      !found && categoryList.push({
				categoryName: obj.categoryName,
				categoryId: obj.categoryId,
			})
		})
		return categoryList
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

	return (
		<Wrapper authRequired={false}>
			<Layout>
<main className={classNames('shopping-page', {
						'other-layout': !(i18n.language === 'en'),
					})}
				>
					<GiftSwiper />
					<div className='products-group container-xxl'>
            <GiftTab activeItem={{}} setActiveItem={setActiveTabItem}/>
            <div className='select'>
						<div className='inputBox-null' />
						<GiftSelector
							type={t('Category')}
							onChange={label => handleSelectorItemChange('category', label)}
						/>
						<GiftSelector
							type={t('From')}
							onChange={label => handleSelectorItemChange('from', label)}
						/>
            </div>
					<GiftList
						filterList={giftList}
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
