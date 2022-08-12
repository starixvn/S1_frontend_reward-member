import React from "react"
import Shopping from "components/Shopping"
import Wrapper from "common/components/Wrapper"
import Layout from "common/components/Layout"

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
