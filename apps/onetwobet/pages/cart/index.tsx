import Layout from '@apps/onetwobet/components/common/Layout'
import Wrapper from '@apps/onetwobet/components/common/Wrapper'
import Cart from '@apps/onetwobet/components/Cart'

const Index = () => {
	return (
		<Wrapper authRequired>
			<Layout>
				<Cart />
			</Layout>
		</Wrapper>
	)
}

export default Index
