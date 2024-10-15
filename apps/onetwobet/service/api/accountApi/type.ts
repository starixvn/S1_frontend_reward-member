import { IAxiosResponse } from "@apps/onetwobet/service/axiosBaseQuery"

export interface ISetLanguageArgs {
	langId: number
}

export type ISetLanguageResponse = IAxiosResponse<null>
