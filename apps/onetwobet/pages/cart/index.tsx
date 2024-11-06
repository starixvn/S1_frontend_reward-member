import { ISetShoppingCarData, selectedCartList } from '@api'
import {
	CartAffiliate,
	CartFeatured,
	CartList,
	CartOrder,
} from '@apps/onetwobet/components/Cart'
import Layout from '@apps/onetwobet/components/common/Layout'
import Wrapper from '@apps/onetwobet/components/common/Wrapper'
import { useAppSelector } from '@operations'
import { useEffect, useState } from 'react'

const Index = () => {
	const cartList = useAppSelector(selectedCartList)
	const [checkedItem, setCheckedItem] = useState<ISetShoppingCarData>(null)

	useEffect(() => {
		if (checkedItem && !cartList.some(o => o.giftId === checkedItem.giftId)) {
			setCheckedItem(null)
		}
	}, [cartList])

	return (
		<Wrapper authRequired>
			<Layout>
				<main className='cart-page container-xxl'>
					<div className='row'>
						<CartList checkedItem={checkedItem} onToggle={setCheckedItem} />
						<CartOrder checkedItem={checkedItem} />
					</div>
					<div className='recommend row'>
						<CartAffiliate />
						<CartFeatured />
					</div>
				</main>
			</Layout>
		</Wrapper>
	)
}

export default Index
