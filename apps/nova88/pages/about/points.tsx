import React from "react"
import Wrapper from "common/components/Wrapper"
import Layout from "common/components/Layout"
import Points from "components/about/Points"

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
