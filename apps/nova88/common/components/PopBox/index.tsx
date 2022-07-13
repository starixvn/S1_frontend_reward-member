import React, { FC, useMemo } from "react"
import PopBoxLogin from "./PopBox.login"
import { usePopBox } from "common/hooks"

const PopBox: FC = () => {
	const {
		popBoxType: { type, props = {} },
	} = usePopBox()

	const content = useMemo(() => {
		let element = null

		switch (type) {
			case "login":
				element = <PopBoxLogin {...props} />
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
	}, [props, type])

	if (!type) {
		return null
	}

	return (
		<div id="popup" className={type ? "active" : ""}>
			{content}
		</div>
	)
}

export default PopBox
