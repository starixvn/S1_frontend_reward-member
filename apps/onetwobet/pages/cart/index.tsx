import React from "react"
import Wrapper from "@apps/onetwobet/common/components/Wrapper"
import Layout from "@apps/onetwobet/common/components/Layout"
import Cart from "@apps/onetwobet/components/Cart"

const Index = () => {
	return (
		<Wrapper authRequired>
			<Layout>
				<Cart />
			</Layout>
		</Wrapper>
	)
}

export default Index
