import { IAxiosResponse } from "../../axiosBaseQuery"

export interface giftData {
	giftId: number
	giftName: string
	enGiftName: string
	categoryId: number
	categoryName: string
	giftDescription: string
	giftPictureUrl: string
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
}

export type IGetGiftListResponse = IAxiosResponse<giftData[]>
