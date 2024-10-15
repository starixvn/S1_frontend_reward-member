import React from "react"
import Wrapper from "@apps/nova88/common/components/Wrapper"
import Layout from "@apps/nova88/common/components/Layout"
import Points from "@apps/nova88/components/about/Points"

const Page = () => {
	return (
		<Wrapper authRequired>
			<Layout>
				<Points />
			</Layout>
		</Wrapper>
	)
}

export default Page
