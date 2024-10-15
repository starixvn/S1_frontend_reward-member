import React, { FC } from "react"
import { usePopBox } from "@apps/onetwobet/common/hooks"
import { useTranslation } from "react-i18next"

interface IPopBoxDefaultProps {
	content?: string
}

const PopBoxDefault: FC<IPopBoxDefaultProps> = ({ content }) => {
	const { closePopBox } = usePopBox()
	const { t } = useTranslation()
	return (
		<div className="note-pop">
			<div onClick={closePopBox} className="icon icon-close"></div>
			<div className="note">
				<div className="txt">{content}</div>
				<button className="btn-close" onClick={closePopBox}>
					{t("CLOSE")}
				</button>
			</div>
		</div>
	)
}

export default PopBoxDefault
