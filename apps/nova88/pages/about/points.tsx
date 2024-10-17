import Points from '@apps/nova88/components/about/Points'
import Layout from '@apps/nova88/components/common/Layout'
import Wrapper from '@apps/nova88/components/common/Wrapper'

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
