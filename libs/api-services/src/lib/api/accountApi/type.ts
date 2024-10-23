import { IAxiosResponse } from '../axiosBaseQuery'

export interface ISetLanguageArgs {
	langId: string
}

export type ISetLanguageResponse = IAxiosResponse<null>
