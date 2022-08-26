export enum tabOption {
	ALL = 0,
	FAVORITE = 999,
}

export enum fromEnum {
	LOW_TO_HIGH_COST = 1,
	HIGH_TO_LOW_COST,
	LOW_TO_HIGH_LETTER,
	HIGH_TO_LOW_LETTER,
}

export const fromList = [
	{ categoryId: fromEnum.LOW_TO_HIGH_COST, categoryName: "LowToHighCost" },
	{ categoryId: fromEnum.HIGH_TO_LOW_COST, categoryName: "HighToLowCost" },
	{ categoryId: fromEnum.LOW_TO_HIGH_LETTER, categoryName: "LowToHighLetter" },
	{ categoryId: fromEnum.HIGH_TO_LOW_LETTER, categoryName: "HighToLowLetter" },
]

export const sortType = [
	{ orderByField: "Point", desc: false },
	{ orderByField: "Point", desc: true },
	{ orderByField: "EnGiftName", desc: false },
	{ orderByField: "EnGiftName", desc: true },
]

export const DEFAULT_PAGE_SIZE_COUNT = 10
export const PAGE_SIZE_COUNT = 5
