import { useRouter } from "next/router"
import Link from "next/link"
import React, { useState } from "react"
import LeftMenu from "components/about/components/LeftMenu"
import classNames from "classnames"
import { useTranslation } from "react-i18next"
import {
	defHowToEarnPointsTab,
	HowTabEnum,
	depositPointReward,
	turnoverPointReward,
} from "components/about/constants"
import { paths } from "common/constants"
import { langMapping } from "components/Index/constants"

const HowToEarnPoints = () => {
	const { pathname } = useRouter()
	const { t, i18n } = useTranslation()
	const [selectedTab, setSelectedTab] = useState(
		defHowToEarnPointsTab[HowTabEnum.DEPOSIT_POINTS]
	)
	const currency = langMapping[i18n.language]

	return (
		<main>
			<div className="container-xxl myCoins-page">
				<div className="row">
					<div className="col col-lg-2 col-xl-3">
						<LeftMenu activePath={pathname} />
					</div>
					<div className="col col-lg-10 col-xl-9">
						<div className="page-content">
							<div className="titleGroup">
								<div className="title">{t("HOW_TO_EARN_POINTS")}</div>
								<div className="txt">
									{t("titleTip1")}
									<div>{t("titleTip2")}</div>
								</div>
							</div>

							<div className="tAndC-content">
								<div className="btnGroup">
									{Object.values(defHowToEarnPointsTab).map(item => (
										<button
											key={item.displayKey}
											onClick={() => {
												setSelectedTab(item)
											}}
											className={classNames(item.className, {
												active: selectedTab.key === item.key,
											})}>
											{t(item.displayKey)}
										</button>
									))}
								</div>

								<div className="tAndC-info active">
									<div className="info-title">{t(selectedTab.displayKey)}</div>

									{selectedTab.key === HowTabEnum.DEPOSIT_POINTS && (
										<DepositPointInfo currency={currency} />
									)}

									{selectedTab.key === HowTabEnum.TURNOVER_POINTS && (
										<TurnoverPointInfo currency={currency} />
									)}

									{selectedTab.key === HowTabEnum.VIP_REWARDS_POINTS && (
										<VIPRewardsPointInfo />
									)}

									<div>{t("DEPOSIT_TEXT3")}</div>
									<div>
										{t("VIP_REWARDS_TEXT")}
										<span className="orange">{t("88_Rewards")}</span>
										{t("account")}
									</div>
									<div>
										<ul>
											<li>{t("Cal_Text_1")}</li>
											<li>{t("Cal_Text_2")}</li>
											<li>{t("Cal_Text_3")}</li>
										</ul>
									</div>
									<div>
										{t("Cal_Text_4")}
										<span className="orange"> 6,988 </span>
										{t("Cal_Text_5")}
									</div>
									<div className="info-title">{t("Any_question")}</div>
									<div>
										{t("Please_check")}
										<Link href={paths.about.sub.rewardfaq.root}>
											<a className="blue"> {t("FAQ")} </a>
										</Link>
										{t("here_or_contact_our")}{" "}
										<a
											className="blue"
											target="_blank"
											href="https://direct.lc.chat/11638088/"
											rel="noreferrer">
											{t("24/7_Customer_Support")}
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default HowToEarnPoints

const DepositPointInfo = ({ currency }) => {
	const { t, i18n } = useTranslation()

	return (
		<>
			<div>{t("DepositPointTitle1")}</div>
			<table className="medal">
				<tbody>
					<tr>
						<td colSpan={2}>{t("HowToEarnDepositPoint")}</td>
					</tr>
					<tr>
						<td>{t("DepositAmount")}</td>
						<td>{t("PointsEarned")}</td>
					</tr>
					<tr>
						<td>
							<span>
								{t(currency)} {depositPointReward[currency]}{" "}
								{i18n.language === "th" && t("THB2")}
							</span>
							<p>({t("AllDepositType")})</p>
						</td>
						<td>x 1.0</td>
					</tr>
				</tbody>
			</table>
			<div>{t("DepositPointContent1")}</div>
			<div>{t("DepositPointContent2")}</div>
		</>
	)
}

const TurnoverPointInfo = ({ currency }) => {
	const { t, i18n } = useTranslation()

	return (
		<>
			<div>{t("TurnoverPointTitle1")}</div>
			<table className="medal">
				<tbody>
					<tr>
						<td colSpan={4}>{t("HowToEarnTurnoverRewardsPoints")}</td>
					</tr>
					<tr>
						<td>{t("PRODUCTS")}</td>
						<td>{t("PROVIDER")}</td>
						<td>{t("VALID_TURNOVER")}</td>
						<td>{t("POINTS")}</td>
					</tr>
					<tr>
						<td className="head">{t("SPORTS")}</td>
						<td>{t("SABASportsEsports")}</td>
						<td>
							{t(currency)} {turnoverPointReward[currency].sports}{" "}
							{i18n.language === "th" && t("THB2")}
						</td>
						<td>1</td>
					</tr>
					<tr>
						<td className="head">{t("LIVE_CASINO")}</td>
						<td>{t("AllProviders")}</td>
						<td>
							{t(currency)} {turnoverPointReward[currency].liveCasino}{" "}
							{i18n.language === "th" && t("THB2")}
						</td>
						<td>1</td>
					</tr>
					<tr>
						<td className="head">{t("SLOT")}</td>
						<td>{t("ExcludedMega888")}</td>
						<td>
							{t(currency)} {turnoverPointReward[currency].slot}{" "}
							{i18n.language === "th" && t("THB2")}
						</td>
						<td>1</td>
					</tr>
					<tr>
						<td className="head">{t("FISHING")}</td>
						<td>{t("AllProviders")}</td>
						<td>
							{t(currency)} {turnoverPointReward[currency].fishing}{" "}
							{i18n.language === "th" && t("THB2")}
						</td>
						<td>1</td>
					</tr>
					<tr>
						<td className="head">{t("TABLE_GAMES")}</td>
						<td>{t("TableGamesProvider")}</td>
						<td>
							{t(currency)} {turnoverPointReward[currency].tableGames}{" "}
							{i18n.language === "th" && t("THB2")}
						</td>
						<td>1</td>
					</tr>
					<tr>
						<td className="head">{t("GAMES")}</td>
						<td>{t("GamesProvider")}</td>
						<td>
							{t(currency)} {turnoverPointReward[currency].games}{" "}
							{i18n.language === "th" && t("THB2")}
						</td>
						<td>1</td>
					</tr>
					<tr>
						<td className="head">{t("LOTTERY")}</td>
						<td>{t("LotteryProvider")}</td>
						<td>
							{t(currency)} {turnoverPointReward[currency].lottery}{" "}
							{i18n.language === "th" && t("THB2")}
						</td>
						<td>1</td>
					</tr>
					<tr>
						<td className="head">{t("VIRTUAL_SPORTS")}</td>
						<td>{t("VirtualSportsProvider")}</td>
						<td>
							{t(currency)} {turnoverPointReward[currency].virtualSports}{" "}
							{i18n.language === "th" && t("THB2")}
						</td>
						<td>1</td>
					</tr>
				</tbody>
			</table>
			<div>{t("TurnoverPointContent1")}</div>
			<div>{t("TurnoverPointContent2")}</div>
		</>
	)
}

const VIPRewardsPointInfo = () => {
	const { t } = useTranslation()

	return (
		<>
			<div>{t("VIPRewardsPointTitle1")}</div>
			<div>{t("VIPRewardsPointTitle2")}</div>
			<table className="medal">
				<tbody>
					<tr>
						<td colSpan={3}>{t("HOW_TO_EARN_VIP_REWARDS_POINTS")}</td>
					</tr>
					<tr>
						<td>{t("VIP_TIER")}</td>
						<td>{t("VIP_TIER_UPGRADE")}</td>
						<td>{t("BIRTHDAY_REWARDS")}</td>
					</tr>
					<tr>
						<td className="head">{t("VINTAGE_CLUB")}</td>
						<td>{t("N/A")}</td>
						<td>88 {t("Points")}</td>
					</tr>
					<tr>
						<td className="head">{t("SILVER_CLUB")}</td>
						<td>500 {t("Points")}</td>
						<td>188 {t("Points")}</td>
					</tr>
					<tr>
						<td className="head">{t("GOLD_CLUB")}</td>
						<td>800 {t("Points")}</td>
						<td>288 {t("Points")}</td>
					</tr>
					<tr>
						<td className="head">{t("TITANIUM_CLUB")}</td>
						<td>1,000 {t("Points")}</td>
						<td>388 {t("Points")}</td>
					</tr>
					<tr>
						<td className="head">{t("DIAMOND_CLUB")}</td>
						<td>1,500 {t("Points")}</td>
						<td>688 {t("Points")}</td>
					</tr>
					<tr>
						<td className="head">{t("NOVA_CLUB")}</td>
						<td>2,000 {t("Points")}</td>
						<td>888 {t("Points")}</td>
					</tr>
				</tbody>
			</table>
			<div>{t("VIPRewardsPointContent1")}</div>
		</>
	)
}
