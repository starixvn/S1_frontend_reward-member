import {
	IGetGiftListArgs,
	ISetShoppingCarData,
	selectedCurrencyId,
	selectedIsLogin,
	selectedLangId,
	setCartNumber,
	useLazyGetGiftListQuery,
	useSetShoppingCartMutation,
} from '@api'
import GiftSwiper from '@apps/onetwobet/components/Shopping/GiftSwiper'
import {
	DEFAULT_HOME_PAGE_SIZE_COUNT,
} from '@constants'
import { useAppDispatch, useAppSelector, usePopBox } from '@operations'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useLocalStorage } from 'usehooks-ts'
import Products from "./Products"
import TopIntroduce from "./TopIntroduce"
import AppDownload from "./AppDownload"

const Home = () => {
	const dispatch = useAppDispatch()
	const { i18n, t } = useTranslation()
	const { setPopBoxType } = usePopBox()
	const [cartList, setCartList] = useLocalStorage('nova88Cart', [])
	const isLogin = useSelector(selectedIsLogin)
	const langId = useAppSelector(selectedLangId)
	const currencyId = useAppSelector(selectedCurrencyId)
	const [setShoppingCart] = useSetShoppingCartMutation()
	const [
		getGiftList,
		{ data: { data: giftList = [] } = {}, isFetching: isGetGiftListFetching },
	] = useLazyGetGiftListQuery()

  const [realCartList, setRealCartList] = useState<ISetShoppingCarData[]>([])

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
		if (isLogin) {
			const giftIdList = []
			cartList.forEach(item => {
				giftIdList.push(item.giftId)
			})
			getCartList({ giftIds: giftIdList, isAdd: 1 })
			setCartList([])
		}
	}, [isLogin])

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

      <Products giftList={giftList} realCartList={realCartList} setRealCartList={setRealCartList} isLoading={isGetGiftListFetching} />

      <AppDownload />

		</main>
	)
}

export default Home
