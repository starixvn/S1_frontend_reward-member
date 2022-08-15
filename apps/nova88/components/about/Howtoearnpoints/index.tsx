import { useRouter } from "next/router"
import Link from "next/link"
import React, { useState } from "react"
import LeftMenu from "components/about/components/LeftMenu"
import classNames from "classnames"
import { useTranslation } from "react-i18next"
import { howTabList } from "components/about/constants"
import { paths } from "common/constants"

const HowToEarnPoints = () => {
	const { pathname } = useRouter()
	const { t } = useTranslation()
	const [howActiveTab, setHowActiveTab] = useState(howTabList[0].activeTab)
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
									{howTabList.map((item, key) => (
										<button
											key={key}
											onClick={() => {
												setHowActiveTab(item.activeTab)
											}}
											className={classNames(item.className, {
												active: howActiveTab === item.activeTab,
											})}>
											{t(item.displayKey)}
										</button>
									))}
								</div>
								<div
									className={classNames("tAndC-info", {
										active: howActiveTab === "DEPOSIT POINTS",
									})}>
									<div className="info-title">{t("DEPOSIT_POINTS")}</div>
									<div>{t("ContentTitleTip1")}</div>
									<table className="medal">
										<tbody>
											<tr>
												<td colSpan={2}>{t("HOW_TO_EARN_DEPOSIT_POINTS")}</td>
											</tr>
											<tr>
												<td>{t("DEPOSIT_AMOUNT")}</td>
												<td>{t("PointsEarned")}</td>
											</tr>
											<tr>
												<td>
													{t("MYR")} 600
													<p>{t("All_Deposit_Type")}</p>
												</td>
												<td>x 1.0</td>
											</tr>
										</tbody>
									</table>
									<div>{t("DEPOSIT_TEXT1")}</div>
									<div>{t("DEPOSIT_TEXT2")}</div>
									<div>{t("DEPOSIT_TEXT3")}</div>
									<div>
										{t("VIP_REWARDS_TEXT")}
										<span className="orange">{t("88_Rewards")}</span>{" "}
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
										<span className="orange">6,988</span>
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
								<div
									className={classNames("tAndC-info", {
										active: howActiveTab === "TURNOVER POINTS",
									})}>
									<div className="info-title">{t("TURNOVER_POINTS")}</div>
									<div>{t("ContentTitleTip2")}</div>
									<table className="medal">
										<tbody>
											<tr>
												<td colSpan={4}>
													{t("HOW_TO_EARN_TURNOVER_REWARDS_POINTS")}
												</td>
											</tr>
											<tr>
												<td>{t("SPORTS")}</td>
												<td>{t("PROVIDER")}</td>
												<td>{t("VALID_TURNOVER")}</td>
												<td>{t("POINTS")}</td>
											</tr>
											<tr>
												<td className="head">{t("LIVE_CASINO")}</td>
												<td>{t("PROVIDER_TEXT1")}</td>
												<td>{t("MYR")} 5,000</td>
												<td>1</td>
											</tr>
											<tr>
												<td className="head">{t("SLOT")}</td>
												<td>{t("PROVIDER_TEXT2")}</td>
												<td>{t("MYR")} 3,000</td>
												<td>1</td>
											</tr>
											<tr>
												<td className="head">{t("FISHING")}</td>
												<td>{t("PROVIDER_TEXT1")}</td>
												<td>{t("MYR")} 3,000</td>
												<td>1</td>
											</tr>
											<tr>
												<td className="head">{t("TABLE_GAMES")}</td>
												<td>{t("PROVIDER_TEXT3")}</td>
												<td>{t("MYR")} 3,000</td>
												<td>1</td>
											</tr>
											<tr>
												<td className="head">{t("GAMES")}</td>
												<td>{t("PROVIDER_TEXT4")}</td>
												<td>{t("MYR")} 3,000</td>
												<td>1</td>
											</tr>
											<tr>
												<td className="head">{t("LOTTERY")}</td>
												<td>{t("PROVIDER_TEXT5")}</td>
												<td>{t("MYR")} 3,000</td>
												<td>1</td>
											</tr>
											<tr>
												<td className="head">{t("VIRTUAL_SPORTS")}</td>
												<td>{t("PROVIDER_TEXT6")}</td>
												<td>{t("MYR")} 3,000</td>
												<td>1</td>
											</tr>
										</tbody>
									</table>
									<div>{t("TURNOVER_TEXT1")}</div>
									<div>{t("TURNOVER_TEXT2")}</div>
									<div>{t("TURNOVER_TEXT3")}</div>
									<div>
										{t("VIP_REWARDS_TEXT")}
										<span className="orange">{t("88_Rewards")}</span>{" "}
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
										<span className="orange">6,988</span> {t("Cal_Text_5")}
									</div>
									<div className="info-title">{t("Any_question")}</div>
									<div>
										{t("Please_check")} <a className="blue">{t("FAQ")}</a>{" "}
										{t("here_or_contact_our")}{" "}
										<a className="blue">{t("24/7_Customer_Support")}</a>
									</div>
								</div>
								<div
									className={classNames("tAndC-info", {
										active: howActiveTab === "VIP REWARDS POINTS",
									})}>
									<div className="info-title">{t("VIP_REWARDS_POINTS")}</div>
									<div>{t("ContentTitleTip3")}</div>
									<div>{t("ContentTitleTip4")}</div>
									<table className="medal">
										<tbody>
											<tr>
												<td colSpan={3}>
													{t("HOW_TO_EARN_VIP_REWARDS_POINTS")}
												</td>
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
												<td>{t("TITANIUM_CLUB")}</td>
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
									<div>{t("VIP_REWARDS_TEXT1")}</div>
									<div>{t("VIP_REWARDS_TEXT2")}</div>
									<div>
										{t("VIP_REWARDS_TEXT")}
										<span className="orange">{t("88_Rewards")}</span>{" "}
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
										<span className="orange">6,988</span>
										{t("Cal_Text_5")}
									</div>
									<div className="info-title">{t("Any_question")}</div>
									<div>
										{t("Please_check")}
										<a className="blue">{t("FAQ")}</a>
										{t("here_or_contact_our")}
										<a className="blue">{t("24/7_Customer_Support")}</a>
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
