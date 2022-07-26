import React, { FC } from "react"
import { usePopBox } from "common/hooks"
import { useTranslation } from "react-i18next"

interface IPopBoxWarnProps {
	content?: string
}

const PopBoxWarn: FC<IPopBoxWarnProps> = ({ content }) => {
	const { closePopBox } = usePopBox()
	const { t } = useTranslation()
	return (
		<div className="note-pop">
			<div onClick={closePopBox} className="icon icon-close"></div>
			<div className="note">
				<div className="icon icon-notification"></div>
				<div className="title">{t("ImportantNote")}</div>
				<div className="txt">{content}</div>
				<button className="btn-close" onClick={closePopBox}>
					{t("CLOSE")}
				</button>
			</div>
		</div>
	)
}

export default PopBoxWarn
