import Wrapper from "@apps/onetwobet/common/components/Wrapper"
import Layout from "@apps/onetwobet/common/components/Layout"
import Home from "@apps/onetwobet/components/Index"
import React from "react"

export function Index() {
	return (
		<Wrapper authRequired={false}>
			<Layout>
				<Home />
			</Layout>
		</Wrapper>
	)
}

export default Index
