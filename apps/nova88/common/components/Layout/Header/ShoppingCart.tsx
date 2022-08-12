import React from "react"
import { useRouter } from "next/router"
import { useReadLocalStorage } from "usehooks-ts"
import { paths } from "common/constants"

const ShoppingCart = () => {
	const route = useRouter()
	const cartData: null | any[] = useReadLocalStorage("nova88Cart")
	const cartCount = cartData?.length ?? 0

	return (
		<div onClick={() => route.push(paths.cart)} className="shoppingCar">
			<div className="icon icon-cart" />
			<span>{cartCount > 99 ? "99+" : `${cartCount}`}</span>
		</div>
	)
}

export default ShoppingCart
