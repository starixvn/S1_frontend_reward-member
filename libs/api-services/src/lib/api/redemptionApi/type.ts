import { IAxiosResponse } from '../axiosBaseQuery'

export interface ICreateRedemptionArgs {
	giftId: number
	point: number
}

export interface ISetShoppingCartArgs {
	giftIds: number[]
	isAdd: number
}

export interface ISetShoppingCarData {
	giftId?: number
	giftName?: string
	enGiftName?: string
	categoryId?: number
	categoryName?: string
	giftDescription?: string
	giftPictureUrl?: string
	isFavorite?: boolean
	tagList?: {
		tagId: number
		tagName: string
		lang: string
	}[]
	point?: number
	priceWorth?: number
	showStock?: boolean
	stock?: number
}

export type ICreateRedemptionResponse = IAxiosResponse<null>
export type ISetShoppingCartResponse = IAxiosResponse<ISetShoppingCarData[]>
