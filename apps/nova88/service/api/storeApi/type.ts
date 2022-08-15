import { IAxiosResponse } from "service/axiosBaseQuery"

export interface IGiftData {
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

export interface IMyCoinDataData {
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
export interface IMyPurchesData {
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
interface IPointBalance {
	pointBalance: number
}

export type IGetGiftListResponse = IAxiosResponse<IGiftData[]>
export type ISetFavoriteResponse = IAxiosResponse<null>
export type IGetMyCoinResponse = IAxiosResponse<IMyCoinDataData>
export type IGetMyPurchesResponse = IAxiosResponse<IMyPurchesData>
export type IGetPointBalanceResponse = IAxiosResponse<IPointBalance>
