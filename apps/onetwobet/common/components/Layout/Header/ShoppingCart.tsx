import React from "react"
import { useRouter } from "next/router"
import { useReadLocalStorage } from "usehooks-ts"
import { paths } from "@apps/onetwobet/common/constants"
import { useAppSelector } from "@apps/onetwobet/store"
import { selectedIsLogin } from "@apps/onetwobet/service/slice/auth"
import { usePopBox } from "@apps/onetwobet/common/hooks"
import { selectedCartNumber } from "@apps/onetwobet/service/slice/cart"

const ShoppingCart = () => {
	const route = useRouter()
	const isLogin = useAppSelector(selectedIsLogin)
	const { setPopBoxType } = usePopBox()
	const cartData: null | any[] = useReadLocalStorage("nova88Cart")
	const cartNumber = useAppSelector(selectedCartNumber)
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
			<span>
				{cartCount > 99 ? "99+" : `+${isLogin ? cartNumber : cartCount}`}
			</span>
		</div>
	)
}

export default ShoppingCart
