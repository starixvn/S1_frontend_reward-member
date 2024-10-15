import React from "react"
import Shopping from "@apps/onetwobet/components/Shopping"
import Wrapper from "@apps/onetwobet/common/components/Wrapper"
import Layout from "@apps/onetwobet/common/components/Layout"

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
