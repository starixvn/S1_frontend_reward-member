import React, { FC } from "react"
import classNames from "classnames"
import { useTranslation } from "react-i18next"

interface IGiftTabProps {
	tabList: { id: number; label: string }[]
	activeItem?: { id: number; label: string }
	onChange?: (obj) => void
	onGoToMore: () => void
}

const GiftTab: FC<IGiftTabProps> = ({
	tabList,
	activeItem,
	onChange = null,
	onGoToMore,
}) => {
	const { t } = useTranslation()
	return (
		<div className="products-menu">
			{tabList.map(item => (
				<a
					className={classNames({ active: activeItem?.id === item.id })}
					onClick={() => onChange && onChange(item)}
					key={item.id}
				>
					{t(item.label)}
				</a>
			))}
			<button onClick={onGoToMore}>{t("More")}...</button>
		</div>
	)
}

export default GiftTab
