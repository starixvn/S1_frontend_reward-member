import React, { useEffect, useState } from "react"
import QRCode from "qrcode.react"
import classNames from "classnames"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/router"
import GiftSwiper from "components/Shopping/GiftSwiper"
import { monthObj } from "./constants"
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
import { selectedIsLogin, selectedLangId } from "service/slice/auth"
import { imageUrl, siteInfo } from "config"
import { DEFAULT_PAGE_SIZE_COUNT } from "./constants"
import { paths } from "common/constants"
import { useGetAppLinkQuery } from "service/api/playerApi"
import { defAppType } from "service/api/playerApi/def"
import { useSetShoppingCartMutation } from "service/api/redemptionApi"
import { setCartNumber } from "service/slice/cart"
import { useAppDispatch, useAppSelector } from "store"
import { ISetShoppingCarData } from "service/api/redemptionApi/type"

const Index = () => {
	const dispatch = useAppDispatch()
	const { i18n, t } = useTranslation()
	const route = useRouter()
	const { setPopBoxType } = usePopBox()
	const [cartList, setCartList] = useLocalStorage("nova88Cart", [])
	const isLogin = useSelector(selectedIsLogin)
	const langId = useAppSelector(selectedLangId)
	const [setShoppingCart] = useSetShoppingCartMutation()
	const [setFavorite] = useSetFavoriteMutation()
	const { data: { data: appLinks } = {} } = useGetAppLinkQuery(null)
	const [
		getGiftList,
		{ data: { data: giftList = [] } = {}, isFetching: isGetGiftListFetching },
	] = useLazyGetGiftListQuery()

	const [realCartList, setRealCartList] = useState<ISetShoppingCarData[]>([])

	const getCartList = async args => {
		try {
			await setShoppingCart(args)
				.unwrap()
				.then(res => {
					setRealCartList(res.data)
					dispatch(setCartNumber(res.data.length))
				})
		} catch (error) {
			setPopBoxType({
				type: "warn",
				props: { content: error.message },
			})
		}
	}

	const getAppLink = (type: number) =>
		appLinks?.find(el => el.appType === type)?.downloadLink

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

	const handleFavoriteToggle = async item => {
		if (isLogin) {
			try {
				await setFavorite({
					langId: i18n.language,
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

	const handleGiftItemToggle = async giftItem => {
		if (!giftItem.stock && giftItem.showStock) return
		if (isLogin) {
			const item = realCartList?.find(item => item.giftId === giftItem.giftId)
			if (item) {
				await setShoppingCart({ giftIds: [giftItem.giftId], isAdd: 0 })
					.unwrap()
					.then(res => {
						setRealCartList(res.data)
						dispatch(setCartNumber(res.data.length))
					})
			} else {
				await setShoppingCart({ giftIds: [giftItem.giftId], isAdd: 1 })
					.unwrap()
					.then(res => {
						setRealCartList(res.data)
						dispatch(setCartNumber(res.data.length))
					})
			}
		} else {
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
	}

	const goToMore = () => route.push(paths.shopping)

	const month = monthObj[new Date().getMonth() + 1]

	useEffect(() => {
		if (isLogin) {
			getCartList({ giftIds: [], isAdd: 0 })
			handleFilter({
				...{
					categoryIds: null,
					tags: null,
					orderByField: null,
					desc: false,
					pageSize: DEFAULT_PAGE_SIZE_COUNT,
				},
				langId: i18n.language,
			})
		}
	}, [isLogin])

	useEffect(() => {
		handleFilter({
			...{
				categoryIds: null,
				tags: null,
				orderByField: null,
				desc: false,
				pageSize: DEFAULT_PAGE_SIZE_COUNT,
			},
			langId: i18n.language,
		})
	}, [i18n.language])

	return (
		<main
			className={classNames({
				"other-layout": i18n.language !== "en",
			})}>
			<GiftSwiper />
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
							<img
								onClick={() => {
									route.push(paths.shopping)
								}}
								src={`${imageUrl}/img/rewardimg.jpg`}
								alt=""
							/>
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
						realCartList={realCartList}
					/>
				</div>
				{isGetGiftListFetching && <Loading />}
			</div>

			<button className="btn-more" onClick={goToMore}>
				{t("More")}...
			</button>

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
									<QRCode
										value={getAppLink(defAppType.Andriod)}
										renderAs="svg"
										size={80}
										includeMargin={true}
									/>
									<a
										href={getAppLink(defAppType.Andriod)}
										target="_blank"
										rel="noreferrer noopener">
										<button>{t("Download").toUpperCase()}</button>
									</a>
								</div>
								<div className="qrCode">
									<div className="icon icon-appleinc">
										<span>{t("IOS")}</span>
									</div>
									<QRCode
										value={getAppLink(defAppType.IOS)}
										renderAs="svg"
										size={80}
										includeMargin={true}
									/>
									<a
										href={getAppLink(defAppType.IOS)}
										target="_blank"
										rel="noreferrer noopener">
										<button>{t("Download").toUpperCase()}</button>
									</a>
								</div>
							</div>
						</div>
						<img src={`${imageUrl}/img/appbg.jpg`} alt="" />
					</div>
					<div className="col-md-5 col-xl-5">
						<div className="affiliate-txt">
							<a
								href={`${siteInfo.affiliateLink}/?lang=${langId}`}
								target="_blank"
								rel="noreferrer"
								className="title">
								{t("DownloadBgText1")}
							</a>
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
