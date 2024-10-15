import React from "react"
import Wrapper from "@apps/onetwobet/common/components/Wrapper"
import Layout from "@apps/onetwobet/common/components/Layout"
import Purchase from "@apps/onetwobet/components/about/Purchase"

const Page = () => {
	return (
		<Wrapper authRequired>
			<Layout>
				<Purchase />
			</Layout>
		</Wrapper>
	)
}

export default Page
