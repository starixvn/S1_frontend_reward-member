import React, { FC } from "react"
import { useTranslation } from "react-i18next"
import { numberFormat } from "common/utils/func"

interface IPointRecordProps {
	coinList: {
		detailRewardCoin: null
		minusSummary: number
		plusSummary: number
		pointType: number
		pointTypeName: string
		totalSummary: number
	}[]
	availablePoints: string | number
	usedPoints: string | number
	balance: string | number
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
				<div>{t("Category").toUpperCase()}</div>
				<div>{t("PointsEarned")}</div>
			</div>

			<div className="coinList">
				{coinList?.map(item => (
					<div key={item.pointType} className="log">
						<div>{t(item.pointTypeName)}</div>
						<div>{numberFormat(item.totalSummary, 2)}</div>
					</div>
				))}
				<div className="log available">
					<div>{t("PointsAvailable")}</div>
					<div className="bold">{numberFormat(availablePoints, 2)}</div>
				</div>
				<div className="log used">
					<div>{t("PointsUsed")}</div>
					<div className="bold">{numberFormat(usedPoints, 2)}</div>
				</div>
				<div className="log balance">
					<div className="bold">{t("PointsBalance")}</div>
					<div className="bold">{numberFormat(balance, 2)}</div>
				</div>
			</div>
		</div>
	)
}

export default PointRecord
