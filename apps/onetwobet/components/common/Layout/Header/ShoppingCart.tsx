import { selectedCartList, selectedIsLogin } from '@api'
import { paths } from '@constants'
import { useAppSelector, usePopBox } from '@operations'
import { useRouter } from 'next/router'
import { useLocalStorage } from 'usehooks-ts'

const ShoppingCart = () => {
	const route = useRouter()
	const isLogin = useAppSelector(selectedIsLogin)
	const { setPopBoxType } = usePopBox()
	const [LSCartList] = useLocalStorage('onetwobetCart', [])
	const cartList = useAppSelector(selectedCartList)
	const cartCount = isLogin ? cartList.length : LSCartList.length
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
			<span>{cartCount > 99 ? '99+' : `+${cartCount}`}</span>
		</div>
	)
}

export default ShoppingCart
