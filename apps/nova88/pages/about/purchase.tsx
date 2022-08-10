import React from "react"
import Wrapper from "common/components/Wrapper"
import Layout from "common/components/Layout"
import Purchase from "components/about/Purchase"

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
