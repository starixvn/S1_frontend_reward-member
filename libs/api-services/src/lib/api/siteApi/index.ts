import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseUrl } from '../Api'
import { axiosBaseQuery } from '../axiosBaseQuery'
import { IGetSocialChannelArgs, IGetSocialChannelResponse } from './type'

const siteApi = createApi({
	reducerPath: 'siteApi',
	baseQuery: axiosBaseQuery({ baseUrl }),

	endpoints: builder => ({
		getSocialChannel: builder.query<
			IGetSocialChannelResponse,
			IGetSocialChannelArgs
		>({
			query: ({ langId, currencyId, displayPage }) => ({
				url: `site/GetSocialChannel`,
				method: 'POST',
				data: {
					langId,
					currencyId,
					displayPage,
				},
			}),
		}),
	}),
})

export const { useLazyGetSocialChannelQuery } = siteApi

export default siteApi
