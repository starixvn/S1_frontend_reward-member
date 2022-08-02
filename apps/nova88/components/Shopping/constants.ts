import { imageUrl } from "config"
export const sliderList = [
	{ id: 1, img: `${imageUrl}/img/banner.jpg` },
	{ id: 2, img: `${imageUrl}/img/banner.jpg` },
	{ id: 3, img: `${imageUrl}/img/banner.jpg` },
]
export enum tabOption {
	ALL = 0,
	HOT,
	NEW,
	FEATURED,
	FAVORITE,
}

export const tabList = [
	{ id: tabOption.ALL, label: "ALL" },
	{ id: tabOption.HOT, label: "HOT" },
	{ id: tabOption.NEW, label: "NEW" },
	{ id: tabOption.FEATURED, label: "FEATURED" },
	{ id: tabOption.FAVORITE, label: "FAVORITE" },
]
export const fromList = [
	"LowToHighCost",
	"HighToLowCost",
	"LowToHighLetter",
	"HighToLowLetter",
]

export const sortType = {
	LowToHighLetter: { orderByField: "EnGiftName", desc: false },
	HighToLowLetter: { orderByField: "EnGiftName", desc: true },
	LowToHighCost: { orderByField: "Point", desc: false },
	HighToLowCost: { orderByField: "Point", desc: true },
}
