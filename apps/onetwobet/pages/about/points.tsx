import Layout from '@apps/onetwobet/components/common/Layout'
import Wrapper from '@apps/onetwobet/components/common/Wrapper'
import Points from '@apps/onetwobet/components/about/Points'

const Page = () => {
	return (
		<Wrapper authRequired>
			<Layout>
				<Points />
			</Layout>
		</Wrapper>
	)
}

export default Page
