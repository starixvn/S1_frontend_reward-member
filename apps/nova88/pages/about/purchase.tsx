import React from "react"
import Wrapper from "@apps/nova88/common/components/Wrapper"
import Layout from "@apps/nova88/common/components/Layout"
import Purchase from "@apps/nova88/components/about/Purchase"

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
