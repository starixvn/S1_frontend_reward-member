import Purchase from '@apps/nova88/components/about/Purchase'
import Layout from '@apps/nova88/components/common/Layout'
import Wrapper from '@apps/nova88/components/common/Wrapper'

const Page = () => {
	return (
		<Wrapper authRequired>
			<Layout>
				<Purchase />
			</Layout>
		</Wrapper>
	)
}

export default Page
