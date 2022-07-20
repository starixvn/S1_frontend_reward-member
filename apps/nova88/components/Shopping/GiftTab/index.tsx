import React, { FC } from "react"
import classNames from "classnames"

interface IGiftTabProps {
	tabList: { id: number; label: string }[]
	activeItem: { id: number; label: string }
	onChange: (obj) => void
	onGoToMore: () => void
}

const GiftTab: FC<IGiftTabProps> = ({
	tabList,
	activeItem,
	onChange,
	onGoToMore,
}) => {
	return (
		<div className="products-menu">
			{tabList.map(item => (
				<a
					className={classNames({ active: activeItem.id === item.id })}
					onClick={() => onChange(item)}
					key={item.id}>
					{item.label}
				</a>
			))}
			<button onClick={onGoToMore}>More...</button>
		</div>
	)
}

export default GiftTab
