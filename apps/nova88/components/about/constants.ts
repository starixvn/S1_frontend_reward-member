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
}[] = [
	{
		id: AboutTabEnum.POINTS,
		displayKey: "MY POINTS",
		path: "/about/points",
	},
	{
		id: AboutTabEnum.PURCHASE,
		displayKey: "MY PURCHASE",
		path: "/about/purchase",
	},
	{
		id: AboutTabEnum.HOW_TO_EARN_POINTS,
		displayKey: "HOW TO EARN POINTS",
		path: "/about/howtoearnpoints",
	},
	{
		id: AboutTabEnum.FQA,
		displayKey: "FQA",
		path: "/about/rewardfaq",
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
