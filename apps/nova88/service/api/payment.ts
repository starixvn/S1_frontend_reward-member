import { RedemptionRequest } from "./base"

export interface ICreateRedemptionArgs {
	GiftId: number
	Point: number
}

export const api_payment_checkout = (data: ICreateRedemptionArgs) =>
	RedemptionRequest.post(`/CreateRedemption`, data)
