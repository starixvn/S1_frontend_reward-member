import React, { useState } from "react"
import PopBox from "common/components/PopBox"
import Header from "./Header"
import Footer from "./Footer"
import Submenu from "./Submenu"

const Layout = ({ children }) => {
	const [isSubmenuOpen, setSubmenuOpen] = useState<boolean>(false)

	return (
		<>
			<Header setSubmenuOpen={setSubmenuOpen} />
			<PopBox />
			{children}
			<Footer />
			<Submenu isSubmenuOpen={isSubmenuOpen} />
		</>
	)
}

export default Layout
