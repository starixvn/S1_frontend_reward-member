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
]
export const fromList = ["Low → High cost", "High → Low cost", "A → Z", "Z → A"]

export const sortType = {
	"A → Z": { orderByField: "EnGiftName", desc: false },
	"Z → A": { orderByField: "EnGiftName", desc: true },
	"Low → High cost": { orderByField: "Point", desc: false },
	"High → Low cost": { orderByField: "Point", desc: true },
}
