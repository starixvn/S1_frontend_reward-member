import { Dropdown } from '@apps/onetwobet/components/common/Dropdown'
import { FC } from 'react'

const { Option } = Dropdown

interface IGiftSelectorProps {
	type: string
	itemList: { categoryId: number; categoryName: string }[] | string[]
	onChange: (id: number) => void
}

export const GiftSelector: FC<IGiftSelectorProps> = ({
	type,
	itemList,
	onChange,
}) => {
	return (
		<Dropdown placeholder={type} onChange={e => onChange(e)}>
			{itemList.map(obj => (
				<Option key={obj.categoryId} value={obj.categoryName}>
					{obj.categoryName}
				</Option>
			))}
		</Dropdown>
	)
}
