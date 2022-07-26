export const sliderList = [
	{ id: 1, img: "https://store.0814media.net/img/banner.jpg" },
	{ id: 2, img: "https://store.0814media.net/img/banner.jpg" },
	{ id: 3, img: "https://store.0814media.net/img/banner.jpg" },
]

export const tabList = [
	{ id: 0, label: "ALL" },
	{ id: 1, label: "HOT" },
	{ id: 2, label: "NEW" },
	{ id: 3, label: "FEATURED" },
	{ id: 4, label: "FAVORITE" },
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
