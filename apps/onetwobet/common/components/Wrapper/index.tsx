import { FC, ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAppDispatch, useAppSelector } from "@apps/onetwobet/store"
import {
	checkSignInAsync,
	getCustProfileAsync,
} from "@apps/onetwobet/service/slice/auth/thunk"
import { selectedIsLogin } from "@apps/onetwobet/service/slice/auth"
import { paths } from "@apps/onetwobet/common/constants"
import { useInitI18nLanguageEffect } from "@apps/onetwobet/common/hooks/useInitI18nLanguageEffect"
import { useLocalStorage } from "usehooks-ts"
import { getPointBalanceAsync } from "@apps/onetwobet/service/slice/cart/thunk"
import { useSetShoppingCartMutation } from "../../../service/api/redemptionApi"
import { setCartNumber } from "../../../service/slice/cart"
import { ISetShoppingCarData } from "../../../service/api/redemptionApi/type"
import { usePopBox } from "../../hooks"

interface IWrapperProps {
	authRequired: boolean
	children: ReactNode
}

const Wrapper: FC<IWrapperProps> = ({ authRequired, children }) => {
	const dispatch = useAppDispatch()
	const route = useRouter()
	const [cartList] = useLocalStorage("nova88Cart", [])
	const isLogin = useAppSelector(selectedIsLogin)
	const [setShoppingCart] = useSetShoppingCartMutation()
	const { setPopBoxType } = usePopBox()

	useInitI18nLanguageEffect()

	const getAllCartList = async () => {
		try {
			await setShoppingCart({ giftIds: [], isAdd: 1 })
				.unwrap()
				.then(res => {
					dispatch(setCartNumber(res.data.length))
				})
		} catch (error) {
			setPopBoxType({
				type: "warn",
				props: { content: error.message },
			})
		}
	}

	// * 當切換頁面的時候確認登入狀態
	useEffect(() => {
		dispatch(checkSignInAsync())
	}, [route.pathname])

	// * 當登入後撈取使用者資訊
	useEffect(() => {
		if (isLogin) {
			dispatch(getCustProfileAsync())
			dispatch(getPointBalanceAsync())
			const giftIdList = []
			cartList.forEach(item => {
				giftIdList.push(item.giftId)
			})
			getAllCartList()
			// setCartList({ giftIds: giftIdList, isAdd: 1 }).then(() => {
			// 	getAllCartList()
			// })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLogin])

	// * 如果 checkSignIn 尚未 return response
	if (isLogin === null) {
		return null
	}

	// * 如果需要登入且 response 為 未登入
	if (authRequired && isLogin === false) {
		route.push(paths.home)
	}

	return <>{children}</>
}

export default Wrapper
