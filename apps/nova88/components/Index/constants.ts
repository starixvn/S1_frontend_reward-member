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
export const DEFAULT_PAGE_SIZE_COUNT = 5

export const monthObj = {
	1: "JANUARY",
	2: "FEBRUARY",
	3: "MARCH",
	4: "APRIL",
	5: "MAY",
	6: "JUNE",
	7: "JULY",
	8: "AUGUST",
	9: "SEPTEMBER",
	10: "OCTOBER",
	11: "NOVEMBER",
	12: "DECEMBER",
}
