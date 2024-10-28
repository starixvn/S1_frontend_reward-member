import Layout from '@apps/onetwobet/components/common/Layout'
import Wrapper from '@apps/onetwobet/components/common/Wrapper'
import Home from 'apps/onetwobet/components/home'

export function Index() {
	return (
		<Wrapper authRequired={false}>
			<Layout>
				<Home />
			</Layout>
		</Wrapper>
	)
}

export default Index
