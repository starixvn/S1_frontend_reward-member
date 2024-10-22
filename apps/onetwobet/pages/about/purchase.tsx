import Layout from '@apps/onetwobet/components/common/Layout'
import Wrapper from '@apps/onetwobet/components/common/Wrapper'
import Purchase from '@apps/onetwobet/components/about/Purchase'

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
