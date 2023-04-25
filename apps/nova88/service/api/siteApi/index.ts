import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { axiosBaseQuery } from "service/axiosBaseQuery"
import { baseUrl } from "service/Api"
import { IGetSocialChannelResponse, IGetSocialChannelArgs } from "./type"

const siteApi = createApi({
	reducerPath: "siteApi",
	baseQuery: axiosBaseQuery({ baseUrl }),
	tagTypes: ["PostT"],
	endpoints: builder => ({
		getSocialChannel: builder.mutation<
			IGetSocialChannelResponse,
			IGetSocialChannelArgs
		>({
			query: ({ langId, currencyId, displayPage }) => ({
				url: `site/GetSocialChannel`,
				method: "POST",
				data: {
					langId,
					currencyId,
					displayPage,
				},
			}),
			invalidatesTags: ["PostT"],
		}),
	}),
})

export const { useGetSocialChannelMutation } = siteApi

export default siteApi
