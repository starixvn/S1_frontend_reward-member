import { Dropdown } from '@apps/nova88/components/common/Dropdown'
import { FC } from 'react'

const { Option } = Dropdown

interface IGiftSelectorProps {
	placeHolder: string
	itemList: { categoryId: number; categoryName: string }[] | string[]
	onChange: (id: number) => void
}

const GiftSelector: FC<IGiftSelectorProps> = ({
	placeHolder,
	itemList,
	onChange,
}) => {
	return (
		<Dropdown placeholder={placeHolder} onChange={e => onChange(e)}>
			{itemList.map(obj => (
				<Option key={obj.categoryId} value={obj.categoryName}>
					{obj.categoryName}
				</Option>
			))}
		</Dropdown>
	)
}

export default GiftSelector
