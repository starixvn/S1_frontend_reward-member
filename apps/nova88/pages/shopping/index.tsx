import Layout from '@apps/nova88/components/common/Layout'
import Wrapper from '@apps/nova88/components/common/Wrapper'
import Shopping from '@apps/nova88/components/Shopping'

const Index = () => {
	return (
		<Wrapper authRequired={false}>
			<Layout>
				<Shopping />
			</Layout>
		</Wrapper>
	)
}

export default Index
