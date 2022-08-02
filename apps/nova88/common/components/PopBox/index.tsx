import React, { FC, useMemo, useRef } from "react"
import PopBoxWarn from "./PopBox.warn"
import { usePopBox } from "common/hooks"
import PopBoxLogin from "./PopBoxLogin"
import { useOnClickOutside } from "usehooks-ts"

const PopBox: FC = () => {
	const ref = useRef(null)
	const {
		popBoxType: { type, props = {} },
		closePopBox,
	} = usePopBox()

	const content = useMemo(() => {
		let element = null

		switch (type) {
			case "login":
				element = <PopBoxLogin {...props} />
				break
			case "warn":
				element = <PopBoxWarn {...props} />
				break
			default:
				element = null
				break
		}
		return element
	}, [props, type])

	useOnClickOutside(ref, () => {
		closePopBox()
	})

	if (!type) {
		return null
	}

	return (
		<div id="popup" className={type ? "active" : ""}>
			<div ref={ref}>{content}</div>
		</div>
	)
}

export default PopBox
