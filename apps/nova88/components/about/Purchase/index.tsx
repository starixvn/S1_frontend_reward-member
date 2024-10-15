import { useRouter } from "next/router"
import React, { useState } from "react"
import LeftMenu from "@apps/nova88/components/about/components/LeftMenu"
import PurchaseRecord from "@apps/nova88/components/about/components/PurchaseRecord"
import { useTranslation } from "react-i18next"
import { useGetMyPurchaseQuery } from "@apps/nova88/service/api/storeApi"
import classNames from "classnames"

const Purchase = () => {
	const { pathname } = useRouter()
	const { t } = useTranslation()
	const [args, setArgs] = useState({
		PageNumber: 1,
		PageSize: 10,
	})
	const {
		data: { data: { list: purchaseData } = {} } = {},
		isFetching: isGetMyPurchaseFetching,
	} = useGetMyPurchaseQuery(args, { refetchOnMountOrArgChange: true })

	const [isForwardSort, setIsForwardSort] = useState(false)

	const handlePageNumberChange = i => {
		setArgs(prev => ({
			...prev,
			PageNumber: i,
		}))
	}
	const handleSortList = () => {
		if (!purchaseData?.datas) return
		const purchaseArray = [...purchaseData["datas"]]
		return purchaseArray.sort((a, b) => {
			if (isForwardSort) {
				return a.createTimeInCurrencyTimeZone > b.createTimeInCurrencyTimeZone
					? 1
					: -1
			} else {
				return a.createTimeInCurrencyTimeZone < b.createTimeInCurrencyTimeZone
					? 1
					: -1
			}
		})
	}
	const purchaseList = handleSortList()
	return (
		<main>
			<div className="container-xxl myCoins-page">
				<div className="row">
					<div className="col col-lg-2 col-xl-3">
						<LeftMenu activePath={pathname} />
					</div>
					<div className="col col-lg-10 col-xl-9">
						<div className="page-content">
							<div className="title">
								{t("MyPurchase")}
								<div
									onClick={() => setIsForwardSort(!isForwardSort)}
									className="time">
									{t("Date")}
									<i
										className={classNames("icon", "icon-arrow_drop_down", {
											active: isForwardSort,
										})}
									/>
								</div>
							</div>
							{!isGetMyPurchaseFetching && (
								<PurchaseRecord
									purchaseList={purchaseList}
									totalPage={purchaseData?.totalPages}
									activePageNumber={purchaseData?.pageNumber}
									onChange={handlePageNumberChange}
									isForwardSort={isForwardSort}
									onToggle={() => setIsForwardSort(!isForwardSort)}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Purchase
