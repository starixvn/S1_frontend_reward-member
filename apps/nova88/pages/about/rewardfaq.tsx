import React from "react"
import Wrapper from "common/components/Wrapper"
import Layout from "common/components/Layout"
import Faq from "components/about/Faq"
import i18next from "i18next"

const Page = ({ trans }) => {
	console.log(trans)
	return (
		<Wrapper authRequired={false}>
			<Layout>
				<Faq />
			</Layout>
		</Wrapper>
	)
}

export async function getStaticProps(context) {
	const trans = {
		BannerAdText6: i18next.t("BannerAdText6"),
	}

	return {
		props: {
			trans,
		}, // will be passed to the page component as props
	}
}

export default Page
