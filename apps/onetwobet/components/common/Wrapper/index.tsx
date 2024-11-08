import {
	checkSignInAsync,
	getCustProfileAsync,
	getPointBalanceAsync,
	getStaticFileDomainAsync,
	selectedIsLogin,
	selectUrlMethodInitialized,
	setShoppingCartAsync,
} from '@api'
import { paths } from '@constants'
import {
	useSynchronizeCookiesEffect,
	useSynchronizeI18nLanguageEffect,
} from '@core'
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
	const { setPopBoxType } = usePopBox()
	const [LSCartList, setLSCartList] = useLocalStorage('onetwobetCart', [])

	useSynchronizeI18nLanguageEffect()
	useSynchronizeCookiesEffect()

	// * 當切換頁面的時候確認登入狀態
	useEffect(() => {
		dispatch(checkSignInAsync())
	}, [route.pathname])

	// * 當登入後撈取使用者資訊
	useEffect(() => {
		if (isLogin) {
			dispatch(getCustProfileAsync())
			dispatch(getPointBalanceAsync())
			dispatch(setShoppingCartAsync({ giftIds: LSCartList.map(o=> o.giftId), isAdd: 1 }))
				.unwrap()
				.then(() => setLSCartList([]))
				.catch(err =>
					setPopBoxType({ type: 'warn', props: { content: err.message } })
				)
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
