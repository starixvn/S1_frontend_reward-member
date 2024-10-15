import React from "react"
import Wrapper from "@apps/nova88/common/components/Wrapper"
import Layout from "@apps/nova88/common/components/Layout"
import Faq from "@apps/nova88/components/about/Faq"

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
