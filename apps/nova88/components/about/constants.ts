import { paths } from "common/constants"

export enum AboutTabEnum {
	POINTS = 1,
	PURCHASE = 2,
	HOW_TO_EARN_POINTS = 3,
	FQA = 4,
}

export const mineMenuList: {
	id: number
	displayKey: string
	path: string
	authRequired?: boolean
}[] = [
	{
		id: AboutTabEnum.POINTS,
		displayKey: "MY POINTS",
		path: paths.about.sub.points.root,
		authRequired: paths.about.sub.points.authRequired,
	},
	{
		id: AboutTabEnum.PURCHASE,
		displayKey: "MY PURCHASE",
		path: paths.about.sub.purchase.root,
		authRequired: paths.about.sub.purchase.authRequired,
	},
	{
		id: AboutTabEnum.HOW_TO_EARN_POINTS,
		displayKey: "HOW TO EARN POINTS",
		path: paths.about.sub.howtoearnpoints.root,
	},
	{
		id: AboutTabEnum.FQA,
		displayKey: "FQA",
		path: paths.about.sub.rewardfaq.root,
	},
]

export enum HowTabEnum {
	DEPOSIT_POINTS = "DEPOSIT POINTS",
	TURNOVER_POINTS = "TURNOVER POINTS",
	VIP_REWARDS_POINTS = "VIP REWARDS POINTS",
}

export const howTabList = [
	{
		displayKey: "DEPOSIT POINTS",
		activeTab: HowTabEnum.DEPOSIT_POINTS,
		className: "icon icon-coin",
	},
	{
		displayKey: "TURNOVER POINTS",
		activeTab: HowTabEnum.TURNOVER_POINTS,
		className: "icon icon-diamond",
	},
	{
		displayKey: "VIP REWARDS POINTS",
		activeTab: HowTabEnum.VIP_REWARDS_POINTS,
		className: "icon icon-medal",
	},
]

export enum clubListEnum {
	VINTAGE = 1,
	SILVER,
	GOLD,
	TITANIUM,
	DIAMOND,
	NOVA,
}

export const clubList = [
	{ id: clubListEnum.VINTAGE, displayKey: "VINTAGE_CLUB" },
	{ id: clubListEnum.SILVER, displayKey: "SILVER_CLUB" },
	{ id: clubListEnum.GOLD, displayKey: "GOLD_CLUB" },
	{ id: clubListEnum.TITANIUM, displayKey: "TITANIUM_CLUB" },
	{ id: clubListEnum.DIAMOND, displayKey: "DIAMOND_CLUB" },
	{ id: clubListEnum.NOVA, displayKey: "NOVA_CLUB" },
]
