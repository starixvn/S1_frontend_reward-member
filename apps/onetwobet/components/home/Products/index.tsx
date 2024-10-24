import React, { Dispatch, SetStateAction } from "react"
import GiftList from "@apps/onetwobet/components/Shopping/GiftList"
import Loading from "@apps/onetwobet/components/common/Loading"
import { monthObj, paths } from "@constants"
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next"
import {
  IGiftData,
  ISetShoppingCarData,
  selectedIsLogin,
  setCartNumber,
  useSetFavoriteMutation,
  useSetShoppingCartMutation
} from "@api"
import { useSelector } from "react-redux"
import { useAppDispatch, usePopBox } from "@operations"
import { useLocalStorage } from "usehooks-ts"

interface IProducts {
  giftList:Array<IGiftData>
  realCartList:Array<ISetShoppingCarData>
  setRealCartList:Dispatch<SetStateAction<ISetShoppingCarData[]>>
  isLoading:boolean
}

const Products = ({giftList,realCartList,setRealCartList,isLoading}:IProducts) => {
  	const route = useRouter()
  	const { t } = useTranslation()
  	const { setPopBoxType } = usePopBox()
  	const dispatch = useAppDispatch()
  	const [cartList, setCartList] = useLocalStorage('nova88Cart', [])

  	const [setShoppingCart] = useSetShoppingCartMutation()
  	const [setFavorite] = useSetFavoriteMutation()

  	const month = monthObj[new Date().getMonth() + 1]
  	const isLogin = useSelector(selectedIsLogin)

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

  const goToMore = () => route.push(paths.shopping)

  return (
    <>
      <div className='products-group container-xxl'>
        <div className='row'>
          <div className='products-menu'>
            <a className='active'>
              {t('HotPicksForTheMonthOf')}
              <span>{t(month)}</span>
            </a>
            <button onClick={goToMore}>{t('More')}...</button>
          </div>
          <GiftList
            filterList={giftList}
            onToggleCart={handleGiftItemToggle}
            onToggleFavorite={handleFavoriteToggle}
            realCartList={realCartList}
          />
        </div>
        {isLoading && <Loading />}
      </div>

      <button className='btn-more' onClick={goToMore}>
        {t('More')}...
      </button>
    </>
  )
}

export default Products
