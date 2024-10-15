import React from "react"
import Wrapper from "@apps/nova88/common/components/Wrapper"
import Layout from "@apps/nova88/common/components/Layout"
import HowToEarnPoints from "@apps/nova88/components/about/Howtoearnpoints"

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
