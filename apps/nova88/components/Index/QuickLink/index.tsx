import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import classNames from "classnames"
import {
	buttonTypeList,
	defDisplayPage,
	defLinkType,
	sideBarIconName,
} from "../constants"
import { useGetSocialChannelMutation } from "service/api/siteApi"
import { useLocalStorage } from "usehooks-ts"
import { REWARD88_LANG } from "common/constants/localStorage"
import { defLangOptions } from "common/components/Layout/Header/LangDropdown.def"
import QRCode from "qrcode.react"
import { useGetAppLinkQuery } from "service/api/playerApi"
import { usePopBox } from "common/hooks"

const QuickLink = () => {
	const [getSocialChannelQuery] = useGetSocialChannelMutation()
	const [tabStatus, setTabStatus] = useState({
		isOpenDownload: false,
		isOpenContactUs: false,
	})
	const [socialChannelList, setSocialChannelList] = useState([])
	const [localStorageLangId] = useLocalStorage(REWARD88_LANG, null)
	const [activeIcon, setActiveIcon] = useState(null)
	const { setPopBoxType } = usePopBox()
	const currencyId = defLangOptions.find(item =>
		item.lang.find(obj => {
			return obj.value === localStorageLangId
		})
	)?.currencyId

	const switchIconActive = _mouseOverIcon => {
		setActiveIcon(_mouseOverIcon)
	}

	const removeIconActive = () => {
		setActiveIcon(null)
	}

	const showContactList = async () => {
		try {
			await getSocialChannelQuery({
				langId: localStorageLangId,
				currencyId: currencyId,
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

	const { t } = useTranslation()
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
					{t("ANDROID")?.toUpperCase()}
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
