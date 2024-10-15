import { IAxiosResponse } from "@apps/nova88/service/axiosBaseQuery"

export interface ISetLanguageArgs {
	langId: number
}

export type ISetLanguageResponse = IAxiosResponse<null>
