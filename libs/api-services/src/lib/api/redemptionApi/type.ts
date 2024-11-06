import { IGiftTagsData } from './../storeApi/type'

export interface ICreateRedemptionArgs {
	giftId: number
	point: number
}

export interface ISetShoppingCartArgs {
	giftIds: number[]
	isAdd: number
}

export interface ISetShoppingCarData {
	giftId: number
	giftName: string
	siteId: number
	siteName: string
	currencyId: number
	isoCode: string
	categoryId: number
	lang: string
	description: string
	pictureUrl: string
	status: number
	tags?: IGiftTagsData[]
	point: number
	priceWorth: number
	showStock: boolean
	stock: number
	sort: number
}
