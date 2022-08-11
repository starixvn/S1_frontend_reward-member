import { IAxiosResponse } from "service/axiosBaseQuery"

export interface giftData {
	giftId: number
	giftName: string
	enGiftName: string
	categoryId: number
	categoryName: string
	giftDescription: string
	giftPictureUrl: string
	isFavorite: boolean
	tagList: {
		tagId: number
		tagName: string
		lang: string
	}[]
	point: number
	priceWorth: number
	showStock: boolean
	stock: number
}
export interface IGetGiftListArgs {
	langId: string
	categoryIds: null | number[]
	tags: null | number[]
	orderByField: any
	desc: boolean
	pageSize: number
}

export interface ISetFavoriteArgs {
	langId: string
	giftId: null | number
	isFavorite: boolean
}
export interface IGetMyPurchesArgs {
	PageNumber: number
	PageSize: number
}

export interface myCoinData {
	custId: number
	pointBalance: number
	pointEarned: number
	pointUsed: number
	pointLocked: number
	detail: {
		pointType: number
		pointTypeName: string
		plusSummary: number
		minusSummary: number
		totalSummary: number
		detailRewardCoin: null
	}[]
}
export interface myPurchesData {
	list: {
		datas: {
			siteId: number
			custId: number
			currencyId: number
			isoCode: string
			transId: string
			giftId: string
			giftName: string
			point: number
			status: number
			statusName: string
			createTime: string
			timeZone: string
			createTimeInCurrencyTimeZone: string
		}[]
		pageNumber: number
		totalPages: number
		rowCount: number
	}
}
interface pointBalance {
	pointBalance: number
}

export type IGetGiftListResponse = IAxiosResponse<giftData[]>
export type ISetFavoriteResponse = IAxiosResponse<null>
export type IGetMyCoinResponse = IAxiosResponse<myCoinData>
export type IGetMyPurchesResponse = IAxiosResponse<myPurchesData>
export type IGetPointBalanceResponse = IAxiosResponse<pointBalance>
