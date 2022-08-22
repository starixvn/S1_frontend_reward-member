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

export const defHowToEarnPointsTab = {
	[HowTabEnum.DEPOSIT_POINTS]: {
		key: HowTabEnum.DEPOSIT_POINTS,
		displayKey: "DEPOSIT_POINTS",
		className: "icon icon-coin",
	},
	[HowTabEnum.TURNOVER_POINTS]: {
		key: HowTabEnum.TURNOVER_POINTS,
		displayKey: "TURNOVER_POINTS",
		className: "icon icon-diamond",
	},
	[HowTabEnum.VIP_REWARDS_POINTS]: {
		key: HowTabEnum.VIP_REWARDS_POINTS,
		displayKey: "VIP_REWARDS_POINTS",
		className: "icon icon-medal",
	},
}

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

export const depositPointReward = {
	MYR: "600",
	THB: "6,000",
	IDR: "2,000,000",
}

export const turnoverPointReward = {
	MYR: {
		sports: "3,500",
		liveCasino: "5,000",
		slot: "3,000",
		fishing: "3,000",
		tableGames: "3,000",
		games: "3,000",
		lottery: "3,000",
		virtualSports: "3,000",
	},
	THB: {
		sports: "35,000",
		liveCasino: "50,000",
		slot: "30,000",
		fishing: "30,000",
		tableGames: "30,000",
		games: "30,000",
		lottery: "30,000",
		virtualSports: "30,000",
	},
	IDR: {
		sports: "12,000,000",
		liveCasino: "17,000,000",
		slot: "10,000,000",
		fishing: "10,000,000",
		tableGames: "10,000,000",
		games: "10,000,000",
		lottery: "10,000,000",
		virtualSports: "10,000,000",
	},
}
