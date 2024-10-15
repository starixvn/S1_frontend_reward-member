import Wrapper from "@apps/nova88/common/components/Wrapper"
import Layout from "@apps/nova88/common/components/Layout"
import Home from "@apps/nova88/components/Index"
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
