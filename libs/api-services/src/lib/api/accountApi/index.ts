import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseUrl } from '../Api'
import { axiosBaseQuery } from '../axiosBaseQuery'
import { ISetLanguageArgs, ISetLanguageResponse } from './type'

const accountApi = createApi({
	reducerPath: 'accountApi',
	baseQuery: axiosBaseQuery({ baseUrl }),
	tagTypes: ['Post'],
	endpoints: builder => ({
		setLanguage: builder.mutation<ISetLanguageResponse, ISetLanguageArgs>({
			query: data => ({
				url: `account/SetLanguage`,
				method: 'POST',
				data,
			}),
			invalidatesTags: ['Post'],
		}),
	}),
})

export const { useSetLanguageMutation } = accountApi

export default accountApi
