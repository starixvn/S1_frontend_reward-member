import React, { FC } from "react"
import { Dropdown } from "common/components/Dropdown"
import { useTranslation } from "react-i18next"

const { Option } = Dropdown

interface IGiftSelectorProps {
	placeHolder: string
	itemList: string[]
	onChange: (id: number) => void
}

const GiftSelector: FC<IGiftSelectorProps> = ({
	placeHolder,
	itemList,
	onChange,
}) => {
	const { t } = useTranslation()
	return (
		<Dropdown placeholder={placeHolder} onChange={e => onChange(e)}>
			{itemList.map((value, index) => (
				<Option key={index} value={value}>
					{t(value)}
				</Option>
			))}
		</Dropdown>
	)
}

export default GiftSelector
