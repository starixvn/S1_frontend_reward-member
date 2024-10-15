import React from "react"
import Wrapper from "@apps/onetwobet/common/components/Wrapper"
import Layout from "@apps/onetwobet/common/components/Layout"
import HowToEarnPoints from "@apps/onetwobet/components/about/Howtoearnpoints"

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
