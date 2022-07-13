import React from "react"
import PopBox from "../PopBox"
import Header from "./Header"

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
