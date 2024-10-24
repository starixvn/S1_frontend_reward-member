import {
	checkSignInAsync,
	getCustProfileAsync,
	getPointBalanceAsync,
	getStaticFileDomainAsync,
	selectedIsLogin,
	selectUrlMethodInitialized,
	setCartNumber,
	useSetShoppingCartMutation,
} from '@api'
import { paths } from '@constants'
import { useInitI18nLanguageEffect } from '@core'
import { useAppDispatch, useAppSelector, usePopBox } from '@operations'
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'

interface IWrapperProps {
	authRequired: boolean
	children: ReactNode
}

const Wrapper: FC<IWrapperProps> = ({ authRequired, children }) => {
	const route = useRouter()
	const dispatch = useAppDispatch()
	const isLogin = useAppSelector(selectedIsLogin)
	const isUrlMethodInitialized = useAppSelector(selectUrlMethodInitialized)

	const [cartList] = useLocalStorage('nova88Cart', [])
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
				type: 'warn',
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

	useEffect(() => {
		if (!isUrlMethodInitialized) {
			dispatch(getStaticFileDomainAsync())
		}
	}, [isUrlMethodInitialized])

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
