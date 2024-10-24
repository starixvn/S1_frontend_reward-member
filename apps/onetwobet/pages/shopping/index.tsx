import Layout from '@apps/onetwobet/components/common/Layout'
import Wrapper from '@apps/onetwobet/components/common/Wrapper'
import Shopping from '@apps/onetwobet/components/Shopping'

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
