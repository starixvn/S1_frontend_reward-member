import { FC, ReactNode, useEffect } from "react"
import { useRouter } from "next/router"
import { useAppDispatch, useAppSelector } from "store"
import { checkSignInAsync, getCustProfileAsync } from "service/slice/auth/thunk"
import { selectedIsLogin } from "service/slice/auth"

interface IWrapperProps {
	authRequired: boolean
	children: ReactNode
}

const Wrapper: FC<IWrapperProps> = ({ authRequired, children }) => {
	const dispatch = useAppDispatch()
	const route = useRouter()

	const isLogin = useAppSelector(selectedIsLogin)
	// * 當切換頁面的時候確認登入狀態
	useEffect(() => {
		dispatch(checkSignInAsync())
	}, [route.pathname])

	// * 當登入後撈取使用者資訊
	useEffect(() => {
		if (isLogin) {
			dispatch(getCustProfileAsync())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLogin])

	// * 如果 checkSignIn 尚未 return response
	if (isLogin === null) {
		return null
	}

	// * 如果需要登入且 response 為 未登入
	if (authRequired && isLogin === false) {
		route.push("/")
	}

	return <>{children}</>
}

export default Wrapper
