/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react"
import { popBoxContext } from "../Wrapper"
import PopBoxLogin from "./PopBox.login"

const PopBox = () => {
	const { popBox } = useContext(popBoxContext)
	let { content } = popBox
	switch (popBox.popBoxType) {
		case "login":
			content = <PopBoxLogin />
			break
		case "error":
			content = "errorContent"
			break
		default:
			break
	}
	return <></>
}

export default PopBox
