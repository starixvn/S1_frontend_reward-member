import React, { useEffect, useMemo } from "react"
import PopBoxLogin from "./PopBox.login"
import { useDispatch, useSelector } from "react-redux"
import { popBoxActions } from "../../store/popBoxSlice"

const PopBox = () => {
	const popBoxType = useSelector(state => state.popBox.popBoxType)
	const popBoxProps = useSelector(state => state.popBox.popBoxProps)

	const content = useMemo(() => {
		let element = null
		switch (popBoxType) {
			case "login":
				element = <PopBoxLogin {...popBoxProps} />
				break
			case "error":
				//todo:errorContent
				element = null
				break
			default:
				element = null
				break
		}
		return element
	}, [popBoxType])

	if (!popBoxType) {
		return null
	}

	return (
		<div id="popup" className={popBoxType ? "active" : ""}>
			{content}
		</div>
	)
}

export default PopBox
