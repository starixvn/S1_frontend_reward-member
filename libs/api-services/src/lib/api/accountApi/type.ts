import { IAxiosResponse } from '../axiosBaseQuery'

export interface ISetLanguageArgs {
	langId: number
}

export type ISetLanguageResponse = IAxiosResponse<null>
