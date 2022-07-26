import { IAxiosResponse } from "service/axiosBaseQuery"

export interface ICreateRedemptionArgs {
	giftId: number
	point: number
}
export type ICreateRedemptionResponse = IAxiosResponse<null>
