import {
	IGetGiftListArgs,
	selectedCurrencyId,
	selectedIsLogin,
	selectedLangId,
	useLazyGetGiftTagsQuery,
} from '@api'
import { DEFAULT_SHOPPING_PAGE_SIZE_COUNT, tabOption } from '@constants'
import { useAppSelector, usePopBox } from '@operations'
import classNames from 'classnames'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Loading from '../common/Loading'

interface IGiftTabProps {
	activeItem?: { lang?: string; tagId?: number; tagName?: string }
	setActiveItem: React.Dispatch<
		React.SetStateAction<{ lang?: string; tagId?: number; tagName?: string }>
	>
	setArgs: React.Dispatch<React.SetStateAction<IGetGiftListArgs>>
	setIsFilterFavorite: React.Dispatch<React.SetStateAction<boolean>>
}

export const GiftTab: FC<IGiftTabProps> = ({
	activeItem,
	setActiveItem,
	setArgs,
	setIsFilterFavorite,
}) => {
	const { i18n, t } = useTranslation()
	const isLogin = useSelector(selectedIsLogin)
	const { setPopBoxType } = usePopBox()
	const langId = useAppSelector(selectedLangId)
	const currencyId = useAppSelector(selectedCurrencyId)
	const [
		getGiftTags,
		{ data: { data: giftTabs = [] } = {}, isLoading: isGetGiftTabsLoading },
	] = useLazyGetGiftTagsQuery()

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

	useEffect(() => {
		if (giftTabList && giftTabList.length > 0) {
			setActiveItem(giftTabList[0])
		}
	}, [])

	useEffect(() => {
		getGiftTabsList()
		if (isLogin) {
			setIsFilterFavorite(false)
			if (giftTabList && giftTabList.length > 0) {
				setActiveItem(giftTabList[0])
			}
		}
	}, [isLogin, isGetGiftTabsLoading])

	const handleTabChange = activeTab => {
		setActiveItem(activeTab)
		if (activeTab.tagId === tabOption.FAVORITE) {
			setArgs(prev => ({
				...prev,
				tags: null,
				pageSize: DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
			}))
			setIsFilterFavorite(true)
		} else {
			setArgs(prev => ({
				...prev,
				tags: activeTab.tagId ? [activeTab.tagId] : null,
				pageSize: DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
			}))
			setIsFilterFavorite(false)
		}
	}

	return (
		<>
			{isGetGiftTabsLoading ? (
				<Loading />
			) : (
				<div className='products-menu'>
					{giftTabList?.map(item => (
						<a
							className={classNames({
								active: activeItem?.tagId === item.tagId,
							})}
							onClick={() => handleTabChange && handleTabChange(item)}
							key={item.tagId}
						>
							{t(item.tagName)}
						</a>
					))}
				</div>
			)}
		</>
	)
}
