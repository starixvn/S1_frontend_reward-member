import React, { FC } from "react"
import { useTranslation } from "react-i18next"

interface IInputBoxProps {
	icon: string
	value: string
	onBlur: (HTMLInputElement) => void
	onChange: (HTMLInputElement) => void
	placeHolder: string
	iconActions: string[]
	isShowTip: boolean
	tipContent: string
	hotKey: string
	link: string
}

const InputBox: FC<IInputBoxProps> = ({
	icon = "",
	value = "",
	onBlur = null,
	onChange = null,
	placeHolder = "",
	iconActions = [],
	isShowTip = "",
	tipContent = "",
	hotKey = "",
	link = "",
}) => {
	const { t } = useTranslation()
	return (
		<div className="inputModule">
			<div className="inputTxt">
				{icon && <i className={`icon ${icon}`} />}
				<input
					onChange={onChange}
					onBlur={onBlur}
					value={value}
					type={placeHolder === t("PassWord") ? "password" : "text"}
					placeholder={placeHolder}
				/>
				{iconActions.length > 0 && (
					<div className="iconModule">
						{iconActions.map((value, key) => (
							<i key={key} className={`icon ${value}`} />
						))}
					</div>
				)}
			</div>
			{tipContent && (
				<div className={`tip ${isShowTip ? "active" : ""}`}>{tipContent}</div>
			)}
			{hotKey && <a href={link}>{hotKey}</a>}
		</div>
	)
}

export default InputBox
