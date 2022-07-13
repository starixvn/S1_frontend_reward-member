import React from "react"
import Header from "./Header"
import PopBox from "../../../components/popups/popBox"

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<PopBox />
			{children}
		</>
	)
}

export default Layout
