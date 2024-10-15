import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import classNames from "classnames"
import {
	buttonTypeList,
	defCurrencyList,
	defDisplayPage,
	defLinkType,
	langMapping,
	sideBarIconName,
} from "../constants"
import { useGetSocialChannelMutation } from "@apps/nova88/service/api/siteApi"
import QRCode from "qrcode.react"
import { useGetAppLinkQuery } from "@apps/nova88/service/api/playerApi"
import { usePopBox } from "@apps/nova88/common/hooks"
import { useAppSelector } from "../../../store"
import { selectedIsLogin, selectedProfile } from "../../../service/slice/auth"
import { useSelector } from "react-redux"

const QuickLink = () => {
	const { t, i18n } = useTranslation()
	const profile = useSelector(selectedProfile)
	const [getSocialChannelQuery] = useGetSocialChannelMutation()
	const [tabStatus, setTabStatus] = useState({
		isOpenDownload: false,
		isOpenContactUs: false,
	})
	const [socialChannelList, setSocialChannelList] = useState([])
	const [activeIcon, setActiveIcon] = useState(null)
	const isLogin = useAppSelector(selectedIsLogin)
	const { setPopBoxType } = usePopBox()

	const switchIconActive = _mouseOverIcon => {
		setActiveIcon(_mouseOverIcon)
	}

	const removeIconActive = () => {
		setActiveIcon(null)
	}

	const showContactList = async () => {
		try {
			await getSocialChannelQuery({
				langId: isLogin ? profile.langId : i18n.language,
				currencyId: isLogin
					? profile.currencyId
					: defCurrencyList[langMapping[i18n.language]],
				displayPage: defDisplayPage.ContactUs,
			})
				.unwrap()
				.then(res => setSocialChannelList(res.data))
		} catch (error) {
			setPopBoxType({
				type: "warn",
				props: { content: error.message },
			})
		}
	}

	const iconList = socialChannelList.map((el, idx) => {
		const qrCode = el.linkType === defLinkType.qrCode && (
			<div key={`sidebar-link-${el.channelName}`}>
				{el.title}
				<QRCode
					value={el.link}
					renderAs="svg"
					size={120}
					includeMargin={true}
				/>
			</div>
		)

		if (buttonTypeList.includes(el.channelName)) {
			return (
				<button
					key={`sidebar-link-${idx}`}
					onClick={() => el.onClick() ?? null}
					className={`${sideBarIconName[el.channelName]}${
						activeIcon === idx ? " active" : ""
					}`}
					onMouseOver={switchIconActive.bind(this, idx)}
					onFocus={() => 0}
					onMouseOut={removeIconActive.bind(this)}
					onBlur={() => 0}>
					{qrCode}
				</button>
			)
		}

		return (
			<a
				key={`sidebar-link-${idx}`}
				href={el.link}
				target="_blank"
				rel="noreferrer"
				className={`${sideBarIconName[el.channelName]}${
					activeIcon === idx ? " active" : ""
				}`}
				onMouseOver={switchIconActive.bind(this, idx)}
				onFocus={() => 0}
				onMouseOut={removeIconActive.bind(this)}
				onBlur={() => 0}>
				{qrCode}
			</a>
		)
	})
	return (
		<>
			<div
				onMouseEnter={() => {
					setTabStatus(prev => ({ ...prev, isOpenDownload: true }))
					showContactList()
				}}
				className={classNames("quickLinkNew1", {
					active: tabStatus.isOpenDownload,
				})}>
				<i className="icon icon-arrow-left2"></i>
				<div>{t("ContactUs")}</div>
			</div>
			<div
				onMouseLeave={() =>
					setTabStatus(prev => ({ ...prev, isOpenDownload: false }))
				}
				className={classNames("quickLinkNew2", {
					active: !tabStatus.isOpenDownload,
				})}>
				<i className="icon icon-arrow-right2"></i>
				{iconList}
			</div>
			<QuickdownloadLink t={t} />
		</>
	)
}
export const QuickdownloadLink = ({ t }) => {
	const [active, setActive] = useState(false)
	const [appLinkDatas, setAppLinkData] = useState({})
	const { data: { data: appLinks } = {}, isFetching: isGetAppLinkFetching } =
		useGetAppLinkQuery(null)
	useEffect(() => {
		if (appLinks && appLinks.length > 0) {
			const newData = appLinks.reduce((acc, cur) => {
				return { ...acc, [cur.appTypeName]: cur }
			}, {})
			setAppLinkData(newData)
		}
	}, [isGetAppLinkFetching])

	const showQRcode = url => {
		if (typeof window !== undefined) window.open(url)
	}

	if (Object.keys(appLinkDatas).length === 0) return null

	return (
		<>
			<DownloadBar
				t={t}
				className={active ? "active" : ""}
				onMouseOver={() => setActive(true)}
			/>
			<IconBar
				t={t}
				className={active ? "" : "active"}
				appLinkDatas={appLinkDatas}
				showQRcode={showQRcode}
				onMouseLeave={() => setActive(false)}
			/>
		</>
	)
}

export const DownloadBar = ({ t, className, onMouseOver }) => {
	return (
		<div
			className={`quickLinkNew3 ${className}`}
			onMouseOver={onMouseOver}
			onFocus={() => 0}>
			<i className="icon icon-arrow-right2" />
			<div>{t("Download")}</div>
		</div>
	)
}

export const IconBar = ({
	t,
	showQRcode,
	className,
	appLinkDatas,
	onMouseLeave,
}) => {
	const andriodDownLoadUrl = appLinkDatas?.Andriod?.downloadLink ?? ""
	const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? ""

	return (
		<div className={`quickLinkNew4 ${className}`} onMouseLeave={onMouseLeave}>
			<i className="icon icon-arrow-left2" />
			{IOSDownloadUrl && (
				<button
					className="icon icon-appleinc"
					onClick={() => showQRcode(IOSDownloadUrl)}>
					{t("IOS")?.toUpperCase()}
					<div>
						<QRCode
							value={IOSDownloadUrl}
							renderAs="svg"
							size={112}
							includeMargin={true}
						/>
					</div>
				</button>
			)}

			{andriodDownLoadUrl && (
				<button
					className="icon icon-android"
					onClick={() => showQRcode(andriodDownLoadUrl)}>
					{t("Android")?.toUpperCase()}
					<div>
						<QRCode
							value={andriodDownLoadUrl}
							renderAs="svg"
							size={112}
							includeMargin={true}
						/>
					</div>
				</button>
			)}
		</div>
	)
}

export default QuickLink
