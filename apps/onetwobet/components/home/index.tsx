import {
	IGetGiftListArgs,
	selectedCurrencyId,
	selectedIsLogin,
	selectedLangId,
	useLazyGetGiftListQuery,
} from '@api'
import { DEFAULT_HOME_PAGE_SIZE_COUNT } from '@constants'
import { useAppSelector, usePopBox } from '@operations'
import classNames from 'classnames'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import AppDownload from './AppDownload'
import Products from './Products'
import TopIntroduce from './TopIntroduce'
import { GiftSwiper } from '../Shopping/GiftSwiper'

const Home = () => {
	const { i18n, t } = useTranslation()
	const { setPopBoxType } = usePopBox()
	const isLogin = useSelector(selectedIsLogin)
	const langId = useAppSelector(selectedLangId)
	const currencyId = useAppSelector(selectedCurrencyId)
	const [
		getGiftList,
		{ data: { data: giftList = [] } = {}, isFetching: isGetGiftListFetching },
	] = useLazyGetGiftListQuery()

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

	useEffect(() => {
		handleFilter({
			langId,
			currencyId,
			categoryIds: null,
			tags: null,
			orderByField: null,
			desc: false,
			pageSize: DEFAULT_HOME_PAGE_SIZE_COUNT,
		})
	}, [langId, currencyId])

	return (
		<main
			className={classNames({
				'other-layout': !(i18n.language === 'en'),
			})}
		>
			<GiftSwiper />
			{!isLogin && (
				<div
					onClick={() => {
						setPopBoxType({
							type: 'login',
						})
					}}
					id='indexLogin'
					className='btn-login'
				>
					{t('Login').toUpperCase()}
				</div>
			)}

			<TopIntroduce />

			<Products giftList={giftList} isLoading={isGetGiftListFetching} />

			<AppDownload />
		</main>
	)
}

export default Home
