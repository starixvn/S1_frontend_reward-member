import React, { FC } from "react"
import Pagination from "common/components/Pagination"
import classNames from "classnames"
import { useTranslation } from "react-i18next"
import Empty from "components/about/components/Empty"
interface IPurchaseRecordProps {
	purchaseList: {
		createTime: string
		createTimeInCurrencyTimeZone: string
		currencyId: number
		custId: number
		giftId: string
		giftName: string
		isoCode: string
		point: number
		siteId: number
		status: number
		statusName: string
		timeZone: string
		transId: string
	}[]
	totalPage: number | undefined
	activePageNumber: number
	onChange: (n: number) => void
	isForwardSort: boolean
	onToggle: () => void
}

const PurchaseRecord: FC<IPurchaseRecordProps> = ({
	purchaseList,
	totalPage,
	activePageNumber,
	onChange,
	isForwardSort,
	onToggle,
}) => {
	const { t } = useTranslation()
	const handlePurchaseTime = time => {
		const pos = time.indexOf("+")
		const tempStr = time.substring(0, pos)
		return tempStr.replace("T", " ")
	}

	return (
		<>
			<div className="coinRecord-group">
				<div className="header">
					<div onClick={() => onToggle()} className="time">
						Redeem Time(GMT+8)
						<i
							className={classNames("icon", "icon-arrow_drop_down", {
								active: isForwardSort,
							})}
						/>
					</div>
					<div className="item">Item Code</div>
					<div className="name">Product Name</div>
					<div>Points Used</div>
					<div>Status</div>
				</div>
				<div className="coinList">
					{purchaseList && purchaseList.length > 0 ? (
						purchaseList.map(item => (
							<div key={item.transId} className="log">
								<div className="time">
									{handlePurchaseTime(item.createTimeInCurrencyTimeZone)}
								</div>
								<div className="item">{item.giftId}</div>
								<div className="name">{item.giftName}</div>
								<div>{item.point.toFixed(2)}</div>
								<div className="whiteBold">{item.statusName}</div>
							</div>
						))
					) : (
						<Empty />
					)}
				</div>
				<Pagination
					currentPage={activePageNumber}
					totalPages={totalPage}
					onChange={onChange}
				/>
			</div>
			<div className="mobile-coinList">
				{purchaseList && purchaseList.length > 0 ? (
					purchaseList.map(item => (
						<div key={item.transId} className="mobile-log">
							<ul>
								<li>
									<span>Redeem Time(GMT+8)</span>
									{handlePurchaseTime(item.createTimeInCurrencyTimeZone)}
								</li>
								<li>
									<span>Item Code</span>
									{item.giftId}
								</li>
								<li className="name">
									<span>Product Name</span>
									{item.giftName}
								</li>
								<li>
									<span>Points Used</span>
									{item.point}
								</li>
								<li>
									<span>Status</span>
									{item.statusName}
								</li>
							</ul>
						</div>
					))
				) : (
					<div className="mobile-noData active">
						<i className="icon icon-alarm" />
						{t("NoData")}
					</div>
				)}
			</div>
		</>
	)
}

export default PurchaseRecord
