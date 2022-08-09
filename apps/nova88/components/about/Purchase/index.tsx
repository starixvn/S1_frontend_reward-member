import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import LeftMenu from "components/about/components/LeftMenu"
import PurchaseRecord from "components/about/components/PurchaseRecord"
import { useTranslation } from "react-i18next"
import { useGetMyPurchaseQuery } from "service/api/storeApi"
import { useAppSelector } from "store"
import { selectedIsLogin } from "service/slice/auth"
import { usePopBox } from "../../../common/hooks"

const Purchase = () => {
	const { pathname } = useRouter()
	const { setPopBoxType } = usePopBox()
	const { t } = useTranslation()
	const [args, setArgs] = useState({
		PageNumber: 1,
		PageSize: 0,
	})
	const {
		data: { data: { list: purchaseData } = {} } = {},
		isFetching: isGetMyPurchaseFetching,
	} = useGetMyPurchaseQuery(args, { refetchOnMountOrArgChange: true })
	const isLogin = useAppSelector(selectedIsLogin)
	const [isForwardSort, setIsForwardSort] = useState(false)
	useEffect(() => {
		if (isLogin) {
			setArgs({
				PageNumber: 1,
				PageSize: 10,
			})
		} else {
			setArgs({
				PageNumber: 1,
				PageSize: 0,
			})
		}
	}, [isLogin, setPopBoxType])
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
								{t("My_PURCHASE")}
								<div className="time">
									{t("Date")}
									<i className="icon icon-arrow_drop_down" />
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
