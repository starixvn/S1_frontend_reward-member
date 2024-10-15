import React from "react"
import Shopping from "@apps/nova88/components/Shopping"
import Wrapper from "@apps/nova88/common/components/Wrapper"
import Layout from "@apps/nova88/common/components/Layout"

const Index = () => {
	return (
		<Wrapper authRequired={false}>
			<Layout>
				<Shopping />
			</Layout>
		</Wrapper>
	)
}

export default Index
