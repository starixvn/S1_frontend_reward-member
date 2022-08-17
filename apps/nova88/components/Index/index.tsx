import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/router"
import GiftSwiper from "components/Shopping/GiftSwiper"
import { monthObj, sliderList } from "./constants"
import GiftList from "components/Shopping/GiftList"
import Loading from "common/components/Loading"
import { useLocalStorage } from "usehooks-ts"
import { usePopBox } from "common/hooks"
import {
	useLazyGetGiftListQuery,
	useSetFavoriteMutation,
} from "service/api/storeApi"
import { IGetGiftListArgs } from "service/api/storeApi/type"
import { useSelector } from "react-redux"
import { selectedIsLogin } from "service/slice/auth"
import { imageUrl } from "config"
import { DEFAULT_PAGE_SIZE_COUNT } from "./constants"
import { paths } from "common/constants"

const Index = () => {
	const { setPopBoxType } = usePopBox()
	const [
		getGiftList,
		{ data: { data: giftList = [] } = {}, isFetching: isGetGiftListFetching },
	] = useLazyGetGiftListQuery()

	const [setFavorite] = useSetFavoriteMutation()
	const isLogin = useSelector(selectedIsLogin)
	const handleFilter = async (args: IGetGiftListArgs) => {
		try {
			await getGiftList(args).unwrap()
		} catch (error) {
			setPopBoxType({
				type: "warn",
				props: { content: error.message },
			})
		}
	}
	const { t } = useTranslation()
	const route = useRouter()

	const [cartList, setCartList] = useLocalStorage("nova88Cart", [])
	const handleFavoriteToggle = async item => {
		if (isLogin) {
			try {
				await setFavorite({
					langId: "en",
					giftId: item.giftId,
					isFavorite: !item.isFavorite,
				}).unwrap()
			} catch (error) {
				setPopBoxType({
					type: "warn",
					props: { content: error.message },
				})
			}
		} else {
			setPopBoxType({
				type: "login",
			})
		}
	}
	const handleGiftItemToggle = giftItem => {
		if (!giftItem.stock && giftItem.showStock) return
		const item = cartList.find(item => item.giftId === giftItem.giftId)
		if (item) {
			let tempList = []
			tempList = cartList.filter(item => item.giftId !== giftItem.giftId)
			setCartList(tempList)
		} else {
			cartList.push(giftItem)
			setCartList(cartList)
		}
	}

	const goToMore = () => route.push(paths.shopping)
	useEffect(() => {
		handleFilter({
			langId: "en",
			categoryIds: null,
			tags: null,
			orderByField: null,
			desc: false,
			pageSize: DEFAULT_PAGE_SIZE_COUNT,
		})
	}, [])

	const month = monthObj[new Date().getMonth() + 1]
	return (
		<main>
			<GiftSwiper sliderList={sliderList} />
			{!isLogin && (
				<div
					onClick={() => {
						setPopBoxType({
							type: "login",
						})
					}}
					id="indexLogin"
					className="btn-login">
					{t("Login").toUpperCase()}
				</div>
			)}
			<div className="introduce container-xxl">
				<div className="row">
					<div className="dearMember col-xl-7">
						<div className="txt">
							<p>{t("BannerTitle")}</p>
							<div>{t("BannerAdText1")}</div>
							<button className="seeMore" type="button">
								{t("More")}
							</button>
							<div>{t("BannerAdText2")}</div>
							<div>{t("BannerAdText3")}</div>
							<div>{t("BannerAdText4")}</div>
							<button className="close" type="button">
								{t("Close")}..
							</button>
						</div>
						<img src={`${imageUrl}/img/introducebg.jpg`} alt="" />
						<img className="npc" src={`${imageUrl}/img/introduce.png`} alt="" />
					</div>
					<div className="col-xl-5">
						<div className="info">
							<div>{t("imgAdText1")}</div>
							<img src={`${imageUrl}/img/rewardimg.jpg`} alt="" />
						</div>
						<div className="info">
							<div>{t("imgAdText2")}</div>
							<img src={`${imageUrl}/img/rewardimg-1.jpg`} alt="" />
						</div>
					</div>
				</div>
			</div>
			<div className="indexImg">
				<div>
					<p>{t("BannerAdText5")}</p>
					{t("BannerAdText6")}
				</div>
				<img src={`${imageUrl}/img/imgbg.jpg`} alt="" />
			</div>
			<div className="saleImg">
				<div className="txt">
					<div>
						{t("YourJourneyToRewards")}
						<p>{t("StartsHere")}</p>
					</div>
					<div>{t("PopularCategory")}</div>
					<div>
						{t("Computing&Phone")}
						<button onClick={() => route.push(paths.shopping)}>
							{t("SHOP_NOW")}
						</button>
					</div>
				</div>
				<img src={`${imageUrl}/img/saleimgbg.jpg`} alt="" />
			</div>
			<div className="products-group container-xxl">
				<div className="row">
					<div className="products-menu">
						<a className="active">
							{t("HotPicksForTheMonthOf")}
							<span>{month}</span>
						</a>
						<button onClick={goToMore}>{t("More")}...</button>
					</div>
					<GiftList
						filterList={giftList}
						onToggleCart={handleGiftItemToggle}
						onToggleFavorite={handleFavoriteToggle}
					/>
				</div>
				{isGetGiftListFetching && <Loading />}
			</div>
			<div className="appDownload container-xxl">
				<div className="row">
					<div className="col-md-7 col-xl-7">
						<div className="download-txt">
							<img
								className="logo"
								src={`${imageUrl}/img/novalogo.png`}
								alt=""
							/>
							<div className="title">{t("ScanToDownload").toUpperCase()}</div>
							{t("AppBannerText").toUpperCase()}
							<div className="qr-group">
								<div className="qrCode">
									<div className="icon icon-android">
										<span>{t("Android")}</span>
									</div>
									<img src={`${imageUrl}/img/qrcode.svg`} alt="" />
									<button>{t("Download").toUpperCase()}</button>
								</div>
								<div className="qrCode">
									<div className="icon icon-appleinc">
										<span>{t("IOS")}</span>
									</div>
									<img src={`${imageUrl}/img/qrcode.svg`} alt="" />
									<button>{t("Download").toUpperCase()}</button>
								</div>
							</div>
						</div>
						<img src={`${imageUrl}/img/appbg.jpg`} alt="" />
					</div>
					<div className="col-md-5 col-xl-5">
						<div className="affiliate-txt">
							<div className="title">{t("DownloadBgText1")}</div>
							{t("DownloadBgText2")}
						</div>
						<img src={`${imageUrl}/img/affiliatebg.jpg`} alt="" />
					</div>
				</div>
			</div>
		</main>
	)
}

export default Index
