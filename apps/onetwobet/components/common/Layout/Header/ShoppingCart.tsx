import { selectedCartNumber, selectedIsLogin } from '@api'
import { paths } from '@constants'
import { useAppSelector, usePopBox } from '@operations'
import { useRouter } from 'next/router'
import { useReadLocalStorage } from 'usehooks-ts'

const ShoppingCart = () => {
	const route = useRouter()
	const isLogin = useAppSelector(selectedIsLogin)
	const { setPopBoxType } = usePopBox()
	const cartData: null | any[] = useReadLocalStorage('nova88Cart')
	const cartNumber = useAppSelector(selectedCartNumber)
	const cartCount = cartData?.length ?? 0
	return (
		<div
			onClick={() => {
				if (!isLogin) {
					setPopBoxType({
						type: 'login',
					})
				} else {
					route.push(paths.cart)
				}
			}}
			className='shoppingCar'
		>
			<div className='icon icon-cart' />
			<span>
				{cartCount > 99 ? '99+' : `+${isLogin ? cartNumber : cartCount}`}
			</span>
		</div>
	)
}

export default ShoppingCart
