import React from "react"
import { useRouter } from "next/router"
import { useReadLocalStorage } from "usehooks-ts"
import { paths } from "common/constants"
import { useAppSelector } from "store"
import { selectedIsLogin } from "service/slice/auth"
import { usePopBox } from "common/hooks"

const ShoppingCart = () => {
	const route = useRouter()
	const isLogin = useAppSelector(selectedIsLogin)
	const { setPopBoxType } = usePopBox()
	const cartData: null | any[] = useReadLocalStorage("nova88Cart")
	const cartCount = cartData?.length ?? 0
	// onClick={() => {
	//   if (item.authRequired && !isLogin) {
	//     setPopBoxType({
	//       type: "login",
	//     })
	//   } else {
	//     route.push(item.path)
	//   }
	// }}
	return (
		<div
			onClick={() => {
				if (!isLogin) {
					setPopBoxType({
						type: "login",
					})
				} else {
					route.push(paths.cart)
				}
			}}
			className="shoppingCar">
			<div className="icon icon-cart" />
			<span>{cartCount > 99 ? "99+" : `+${isLogin ? cartCount : 0}`}</span>
		</div>
	)
}

export default ShoppingCart
