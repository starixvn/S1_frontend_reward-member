import React from "react"
import Wrapper from "common/components/Wrapper"
import Layout from "common/components/Layout"
import Cart from "components/Cart"

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
