import { useRouter } from "next/router"
import React, { useEffect } from "react"
import LeftMenu from "@apps/onetwobet/components/about/components/LeftMenu"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import PointRecord from "@apps/onetwobet/components/about/components/PointRecord"
import Loading from "@apps/onetwobet/common/components/Loading"
import { useLazyGetMyCoinQuery } from "@apps/onetwobet/service/api/storeApi"
import { usePopBox } from "@apps/onetwobet/common/hooks"
import { useAppSelector } from "@apps/onetwobet/store"
import {
	selectedIsLogin,
	selectedProfile,
} from "@apps/onetwobet/service/slice/auth"
import { imageUrl } from "@apps/onetwobet/config"
import {
	getAvailablePoints,
	getUsedPoints,
} from "@apps/onetwobet/components/about/utils"
import { clubList } from "../constants"
import { numberFormat } from "@apps/onetwobet/common/utils/func"

const Points = () => {
	const { pathname } = useRouter()
	const profile = useSelector(selectedProfile)
	const { t } = useTranslation()
	const [
		getMyCoin,
		{
			data: { data: { detail: coinList = [] } = {} } = {},
			isFetching: isGetMyCoinFetching,
		},
	] = useLazyGetMyCoinQuery()
	const { setPopBoxType } = usePopBox()
	const isLogin = useAppSelector(selectedIsLogin)

	const handleGetMyCoin = async args => {
		try {
			await getMyCoin(args).unwrap()
		} catch (error) {
			setPopBoxType({
				type: "warn",
				props: { content: error.message },
			})
		}
	}

	useEffect(() => {
		if (isLogin) {
			handleGetMyCoin(null)
		}
	}, [isLogin])

	const availablePoints = getAvailablePoints(coinList)
	const usedPoints = getUsedPoints(coinList)
	const balance = Number(availablePoints) + Number(usedPoints)
	const clubText = clubList.find(
		item => item.id === profile?.userLevel
	)?.displayKey

	return (
		<main>
			<div className="container-xxl myCoins-page">
				<div className="row">
					<div className="col col-lg-2 col-xl-3">
						<LeftMenu activePath={pathname} />
					</div>
					<div className="col col-lg-10 col-xl-9">
						<div className="page-content">
							<div className="title">{t("MyPoints").toUpperCase()}</div>
							{!isGetMyCoinFetching ? (
								<div className="memberFile">
									<div className="myDocument">
										<div className="memberID">
											<i></i>
											<i></i>
											<span>{profile?.userName}</span>
										</div>
										<div className="vipAnimation">
											<a href="">
												<img
													src={`${imageUrl}/img/vip0${profile?.userLevel}.png`}
													alt=""
												/>
											</a>
										</div>
										<div className="level">{t(clubText)}</div>
										<div className="icon icon-coin">
											{numberFormat(balance, 0, true)}
										</div>
									</div>
									<PointRecord
										coinList={coinList}
										availablePoints={availablePoints}
										usedPoints={usedPoints}
										balance={balance}
									/>
								</div>
							) : (
								<Loading />
							)}
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Points
