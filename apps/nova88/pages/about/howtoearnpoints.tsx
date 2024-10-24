import HowToEarnPoints from '@apps/nova88/components/about/Howtoearnpoints'
import Layout from '@apps/nova88/components/common/Layout'
import Wrapper from '@apps/nova88/components/common/Wrapper'

const Page = () => {
	return (
		<Wrapper authRequired={false}>
			<Layout>
				<HowToEarnPoints />
			</Layout>
		</Wrapper>
	)
}

export default Page
