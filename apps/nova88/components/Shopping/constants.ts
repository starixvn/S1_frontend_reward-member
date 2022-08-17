import { imageUrl } from "config"
export const sliderList = [
	{ id: 1, img: `${imageUrl}/img/banner.jpg` },
	{ id: 2, img: `${imageUrl}/img/banner.jpg` },
	{ id: 3, img: `${imageUrl}/img/banner.jpg` },
]
export enum tabOption {
	ALL = 0,
	FAVORITE = 999,
}

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

export const DEFAULT_PAGE_SIZE_COUNT = 10
export const PAGE_SIZE_COUNT = 5
