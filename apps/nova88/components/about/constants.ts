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
		displayKey: "MyPoints",
		path: paths.about.sub.points.root,
		authRequired: paths.about.sub.points.authRequired,
	},
	{
		id: AboutTabEnum.PURCHASE,
		displayKey: "MyPurchase",
		path: paths.about.sub.purchase.root,
		authRequired: paths.about.sub.purchase.authRequired,
	},
	{
		id: AboutTabEnum.HOW_TO_EARN_POINTS,
		displayKey: "HOW_TO_EARN_POINTS",
		path: paths.about.sub.howtoearnpoints.root,
	},
	{
		id: AboutTabEnum.FQA,
		displayKey: "FAQ",
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
		displayKey: "DEPOSIT_POINTS",
		activeTab: HowTabEnum.DEPOSIT_POINTS,
		className: "icon icon-coin",
	},
	{
		displayKey: "TURNOVER_POINTS",
		activeTab: HowTabEnum.TURNOVER_POINTS,
		className: "icon icon-diamond",
	},
	{
		displayKey: "VIP_REWARDS_POINTS",
		activeTab: HowTabEnum.VIP_REWARDS_POINTS,
		className: "icon icon-medal",
	},
]

export enum clubListEnum {
	VINTAGE = 1,
	SILVER = 2,
	GOLD = 3,
	TITANIUM = 4,
	DIAMOND = 5,
	NOVA = 6,
}

export const clubList = [
	{ id: clubListEnum.VINTAGE, displayKey: "VINTAGE_CLUB" },
	{ id: clubListEnum.SILVER, displayKey: "SILVER_CLUB" },
	{ id: clubListEnum.GOLD, displayKey: "GOLD_CLUB" },
	{ id: clubListEnum.TITANIUM, displayKey: "TITANIUM_CLUB" },
	{ id: clubListEnum.DIAMOND, displayKey: "DIAMOND_CLUB" },
	{ id: clubListEnum.NOVA, displayKey: "NOVA_CLUB" },
]
