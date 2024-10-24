import Layout from '@apps/nova88/components/common/Layout'
import Wrapper from '@apps/nova88/components/common/Wrapper'
import Home from '@apps/nova88/components/Index'

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
