import React from "react"
import Wrapper from "@apps/onetwobet/common/components/Wrapper"
import Layout from "@apps/onetwobet/common/components/Layout"
import Faq from "@apps/onetwobet/components/about/Faq"

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
