import Layout from '@apps/onetwobet/components/common/Layout'
import Wrapper from '@apps/onetwobet/components/common/Wrapper'
import HowToEarnPoints from '@apps/onetwobet/components/about/Howtoearnpoints'

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
