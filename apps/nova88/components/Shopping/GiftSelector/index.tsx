import React, { FC } from "react"
import { Dropdown } from "common/components/Dropdown"

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
	return (
		<Dropdown placeholder={placeHolder} onChange={e => onChange(e)}>
			{itemList.map((value, index) => (
				<Option key={index} value={value}>
					{value}
				</Option>
			))}
		</Dropdown>
	)
}

export default GiftSelector
