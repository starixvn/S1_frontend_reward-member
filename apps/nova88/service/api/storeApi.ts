import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { axiosBaseQuery } from "service/axiosBaseQuery"
import { baseUrl } from "service/Api"

const storeApi = createApi({
	reducerPath: "storeApi",
	baseQuery: axiosBaseQuery({ baseUrl }),
	endpoints: builder => ({
		getGiftList: builder.query({
			query: ({ langId, categoryIds, tags, orderByField, desc }) => ({
				url: `store/GetGiftList/${langId}`,
				method: "POST",
				data: {
					CategoryIds: categoryIds,
					Tags: tags,
					OrderByField: orderByField,
					Desc: desc,
				},
			}),
		}),
	}),
})

export const { useGetGiftListQuery } = storeApi

export default storeApi
