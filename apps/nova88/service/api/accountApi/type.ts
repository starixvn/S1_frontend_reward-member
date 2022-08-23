import { IAxiosResponse } from "service/axiosBaseQuery"

export interface ISetLanguageArgs {
	langId: number
}

export type ISetLanguageResponse = IAxiosResponse<null>
