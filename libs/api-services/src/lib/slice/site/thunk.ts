import { Api } from '@api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAxiosResponse } from '../../api/axiosBaseQuery'
import { TStaticFileDomainData } from './type'

export const getStaticFileDomainAsync = createAsyncThunk(
	'site/GetStaticFileDomain',
	async () => {
		try {
			const {
				data: { data },
			}: { data: IAxiosResponse<TStaticFileDomainData> } = await Api.post(
				'site/GetStaticFileDomain'
			)

			return data
		} catch (error) {
			return {} as TStaticFileDomainData
		}
	}
)
