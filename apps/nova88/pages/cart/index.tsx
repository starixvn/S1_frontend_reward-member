import Cart from '@apps/nova88/components/Cart'
import Layout from '@apps/nova88/components/common/Layout'
import Wrapper from '@apps/nova88/components/common/Wrapper'

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
