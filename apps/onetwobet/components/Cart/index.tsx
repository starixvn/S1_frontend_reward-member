import {
	IGetGiftListArgs,
	ISetShoppingCarData,
	selectedCartNumber,
	selectedIsLogin,
	selectedPointBalance,
	selectedProfile,
	setCartNumber,
	setPointBalance,
	useCreateRedemptionMutation,
	useGetGiftTagsQuery,
	useLazyGetGiftListQuery,
	useLazyGetPointBalanceQuery,
	useSetShoppingCartMutation,
} from '@api'
import Loading from '@apps/onetwobet/components/common/Loading'
import GiftList from '@apps/onetwobet/components/Shopping/GiftList'
import { imageUrl, siteInfo } from '@apps/onetwobet/config'
import { DEFAULT_SHOPPING_PAGE_SIZE_COUNT, paths } from '@constants'
import { useAppDispatch, useAppSelector, usePopBox } from '@operations'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useLocalStorage } from 'usehooks-ts'
import CartList from './CartList'
import Order from './CartOrder'

interface ICheckOutArgs {
	categoryId?: number
	categoryName?: string
	enGiftName?: string
	giftDescription?: string
	giftId?: number
	giftName?: string
	giftPictureUrl?: string
	isFavorite?: boolean
	number?: number
	point?: number
	priceWorth?: number
	showStock?: boolean
	stock?: number
	tagList?: object[]
}

const Cart = () => {
	const dispatch = useAppDispatch()
	const cartNumber = useAppSelector(selectedCartNumber)
	const pointBalance = useAppSelector(selectedPointBalance)
	const profile = useSelector(selectedProfile)
	const isLogin = useSelector(selectedIsLogin)
	const { langId, currencyId } = profile
	const { t } = useTranslation()
	const { setPopBoxType } = usePopBox()
	const route = useRouter()
	const [cartState, setCartState] = useLocalStorage('nova88Cart', [])
	const { data: { data: giftTabs } = {}, isFetching: isGetGiftTabsFetching } =
		useGetGiftTagsQuery({ langId, currencyId })
	const [getPointBalance] = useLazyGetPointBalanceQuery()
	const [createRedemption] = useCreateRedemptionMutation()
	const [setShoppingCart] = useSetShoppingCartMutation()
	const [
		getGiftList,
		{ data: { data: giftList = [] } = {}, isFetching: isGetGiftListFetching },
	] = useLazyGetGiftListQuery()
	const [cartList, setCartList] = useState([])
	const [checkedItem, setCheckedItem] = useState<ICheckOutArgs>({})
	const [isShowTip, setIsShowTip] = useState(false)
	const [noteInput, setNoteInput] = useState('')
	const [realCartList, setRealCartList] = useState<ISetShoppingCarData[]>([])
	const featuredNameList = [
		'FEATURED',
		'精选',
		'FITUR',
		'DILIHATKAN',
		'สนใจเป็นพิเศษ',
	]
	const handleGetPointBalance = async () => {
		try {
			const res: { data: { pointBalance: number } } = await getPointBalance(
				null
			).unwrap()
			dispatch(setPointBalance(res.data.pointBalance))
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
				type: 'warn',
				props: { content: error.message },
			})
		}
	}

	const getFilterGiftList = () => {
		const filterList = []
		giftList.forEach((obj, index) => {
			if (index < 4) {
				filterList.push(obj)
			}
		})
		return filterList
	}

	const filterList = getFilterGiftList()

	const handleCheckBoxToggle = (e, item) => {
		const result = { ...item }
		if (!result.number) {
			result['number'] = 1
		}

		setCheckedItem(result)
	}

	const isShowOrderItem =
		checkedItem.giftId &&
		(isLogin ? realCartList : cartList).find(
			obj => obj.giftId === checkedItem.giftId
		)

	const totalCal = useMemo(() => {
		const userReward = pointBalance
		const cartReward = checkedItem.number * checkedItem.point
		if (isShowOrderItem) {
			return userReward - cartReward
		}
		return userReward
	}, [pointBalance, checkedItem, isShowOrderItem])

	const isChecked = Boolean(
		checkedItem.giftId &&
			totalCal >= 0 &&
			profile.addressCity &&
			checkedItem.stock > 0
	)
	const handleCartItemRemove = async item => {
		if (isLogin) {
			await setShoppingCart({ giftIds: [item.giftId], isAdd: 0 })
				.unwrap()
				.then(res => {
					setRealCartList(res.data)
					dispatch(setCartNumber(res.data.length))
				})
		} else {
			const newList = cartList.filter(obj => obj.giftId !== item.giftId)
			item.giftId === checkedItem.giftId && setCheckedItem({})
			setCartState(newList)
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

	const handleSubmit = async () => {
		if (isChecked) {
			try {
				await createRedemption({
					giftId: checkedItem.giftId,
					point: checkedItem.point * checkedItem.number,
				})
					.unwrap()
					.then(res => {
						if (res.errorCode === 0) {
							setPopBoxType({
								type: 'default',
								props: { content: t('SubmitTip') },
							})
							dispatch(setCartNumber(cartNumber - 1))
						}
					})
				const newList = (isLogin ? realCartList : cartState).filter(obj => {
					return obj.giftId !== checkedItem.giftId
				})
				isLogin ? setRealCartList(newList) : setCartState(newList)
				setCheckedItem({})
				setNoteInput('')
				handleGetPointBalance()
			} catch (error) {
				setPopBoxType({
					type: 'warn',
					props: { content: error.message },
				})
			}
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
		if (giftTabs && giftTabs.length > 0) {
			const targetTab = giftTabs.find(obj =>
				featuredNameList.includes(obj.tagName)
			)
			handleFilter({
				langId,
				currencyId,
				categoryIds: null,
				tags: [targetTab?.tagId],
				orderByField: null,
				desc: false,
				pageSize: DEFAULT_SHOPPING_PAGE_SIZE_COUNT,
			})
		}
	}, [isGetGiftTabsFetching, langId, currencyId])

	useEffect(() => {
		setCartList(cartState)
	}, [cartState])

	return (
		<main className='cart-page container-xxl'>
			<div className='row'>
				<div className='col-lg-8 col-lg-8'>
					<div className='cart-txt'>
						<i className='icon icon-cart'></i>
						<div className='title'>
							{t('ShoppingCart')}
							<span>
								{isLogin ? cartNumber : cartList.length} {t('Items1')}
							</span>
						</div>
						<div>{t('ShoppingCartTip')}</div>
					</div>
					<div className='cart-list'>
						<div className='cart-head'>
							<div className='cart-check'>
								<span>{t('CheckoutLater')}</span>
							</div>
							<div className='cart-info'>
								<div>{t('Items2')}</div>
								<div>{t('Quantity')}</div>
								<div>{t('Points')}</div>
							</div>
							<div className='cart-del'></div>
						</div>
						{(isLogin ? realCartList : cartList)?.length > 0 ? (
							<CartList
								cartList={isLogin ? realCartList : cartList}
								checkedItem={checkedItem}
								onToggle={handleCheckBoxToggle}
								onRemove={handleCartItemRemove}
							/>
						) : (
							<div className={'cart-null active'}>
								<i className='icon icon-cart'></i>
								<div>{t('EmptyText1')}</div>
								<button
									onClick={() => {
										route.push(paths.shopping)
									}}
								>
									{t('EmptyText2')}
								</button>
							</div>
						)}
					</div>
				</div>
				<div className='col-lg-4 col-xl-4'>
					<div className='cart-txt'>
						<div className='title'>{t('OrderSummary')}</div>
						<div>{t('OrderSummaryTip')}</div>
					</div>
					{/*購物Points明細*/}
					<Order
						profile={profile}
						checkedItem={checkedItem}
						totalCal={totalCal}
						pointBalance={pointBalance}
						isShowTip={isShowTip}
						setIsShowTip={setIsShowTip}
						noteInput={noteInput}
						setNoteInput={setNoteInput}
						isChecked={isChecked}
						isShowOrderItem={isShowOrderItem}
						onSubmit={handleSubmit}
					/>
				</div>
			</div>
			<div className='recommend row'>
				<div className='col-lg-5 col-xl-5'>
					<div className='affiliate-txt'>
						<a
							href={`${siteInfo.affiliateLink}/?lang=${langId}`}
							target='_blank'
							rel='noreferrer'
							className='title'
						>
							{t('AffiliatesProgram')}
						</a>
						{t('AffiliatesProgramTip')}
					</div>
					<div>
						<img src={`${imageUrl}/img/affiliatebg-1.jpg`} alt='img' />
					</div>
				</div>
				<div className='products-group col-lg-7 col-xl-7'>
					<div className='row'>
						<div className='products-menu'>
							<a>{t('FEATURED')}</a>
							<button
								onClick={() => {
									route.push(paths.shopping)
								}}
							>
								{t('More')}...
							</button>
						</div>
						<GiftList
							filterList={filterList}
							onToggleCart={handleGiftItemToggle}
							realCartList={realCartList}
						/>
						{isGetGiftListFetching && <Loading />}
					</div>
				</div>
			</div>
		</main>
	)
}

export default Cart
