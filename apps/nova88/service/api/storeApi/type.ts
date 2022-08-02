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

export type IGetGiftListResponse = IAxiosResponse<giftData[]>
export type ISetFavoriteResponse = IAxiosResponse<null>
