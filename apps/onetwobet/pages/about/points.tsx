import React from "react"
import Wrapper from "@apps/onetwobet/common/components/Wrapper"
import Layout from "@apps/onetwobet/common/components/Layout"
import Points from "@apps/onetwobet/components/about/Points"

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
