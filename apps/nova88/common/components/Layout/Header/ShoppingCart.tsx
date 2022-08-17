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
			{/*todo:等api做好需調整isLogin等於true返回值(0的位置）*/}
			<span>{cartCount > 99 ? "99+" : `+${isLogin ? 0 : cartCount}`}</span>
		</div>
	)
}

export default ShoppingCart
