import React from "react"
import Wrapper from "@apps/nova88/common/components/Wrapper"
import Layout from "@apps/nova88/common/components/Layout"
import Cart from "@apps/nova88/components/Cart"

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
