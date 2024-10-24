import classNames from 'classnames'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface IGiftTabProps {
	tabList: { lang: string; tagId: number; tagName: string }[]
	activeItem?: { lang?: string; tagId?: number; tagName?: string }
	onChange?: (obj) => void
}

const GiftTab: FC<IGiftTabProps> = ({
	tabList,
	activeItem,
	onChange = null,
}) => {
	const { t } = useTranslation()
	return (
		<div className='products-menu'>
			{tabList?.map(item => (
				<a
					className={classNames({ active: activeItem?.tagId === item.tagId })}
					onClick={() => onChange && onChange(item)}
					key={item.tagId}
				>
					{t(item.tagName)}
				</a>
			))}
		</div>
	)
}

export default GiftTab
