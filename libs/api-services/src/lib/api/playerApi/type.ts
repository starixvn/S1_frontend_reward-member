import { IAxiosResponse } from '../axiosBaseQuery'

export interface IGetAppLinkData {
	appType: number
	appTypeName: string
	downloadLink: string
}

export type IGetAppLinkResponse = IAxiosResponse<IGetAppLinkData[]>
