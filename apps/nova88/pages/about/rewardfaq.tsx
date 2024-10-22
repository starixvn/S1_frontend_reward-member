import Faq from '@apps/nova88/components/about/Faq'
import Layout from '@apps/nova88/components/common/Layout'
import Wrapper from '@apps/nova88/components/common/Wrapper'

const Page = () => {
	return (
		<Wrapper authRequired={false}>
			<Layout>
				<Faq />
			</Layout>
		</Wrapper>
	)
}

export async function getStaticProps(context) {
	return {
		props: {}, // will be passed to the page component as props
	}
}

export default Page
