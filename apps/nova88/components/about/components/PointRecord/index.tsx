import React, { FC } from "react"
import { useTranslation } from "react-i18next"

interface IPointRecordProps {
	coinList: {
		detailRewardCoin: null
		minusSummary: number
		plusSummary: number
		pointType: number
		pointTypeName: string
		totalSummary: number
	}[]
	availablePoints: string
	usedPoints: string
	balance: string
}

const PointRecord: FC<IPointRecordProps> = ({
	coinList,
	availablePoints,
	usedPoints,
	balance,
}) => {
	const { t } = useTranslation()
	return (
		<div className="coinRecord">
			<div className="header">
				<div>{t("CATEGORY")}</div>
				<div>{t("POINTS_EARNED")}</div>
			</div>

			<div className="coinList">
				{coinList?.map(item => (
					<div key={item.pointType} className="log">
						<div>{t(item.pointTypeName)}</div>
						<div>{item.totalSummary.toFixed(2)}</div>
					</div>
				))}
				<div className="log available">
					<div>{t("POINTS_AVAILABLE")}</div>
					<div className="bold">{availablePoints}</div>
				</div>
				<div className="log used">
					<div>{t("POINTS_USED")}</div>
					<div className="bold">{usedPoints}</div>
				</div>
				<div className="log balance">
					<div className="bold">{t("POINTS_BALANCE")}</div>
					<div className="bold">{balance}</div>
				</div>
			</div>
		</div>
	)
}

export default PointRecord
