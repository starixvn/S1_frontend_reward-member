import { IAxiosResponse } from "@apps/nova88/service/axiosBaseQuery"

export interface IGetAppLinkData {
	appType: number
	appTypeName: string
	downloadLink: string
}

export type IGetAppLinkResponse = IAxiosResponse<IGetAppLinkData[]>
