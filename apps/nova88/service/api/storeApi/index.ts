import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { axiosBaseQuery } from "service/axiosBaseQuery"
import { baseUrl } from "service/Api"
import {
	IGetGiftListArgs,
	IGetGiftListResponse,
	ISetFavoriteResponse,
	ISetFavoriteArgs,
} from "./type"

const storeApi = createApi({
	reducerPath: "storeApi",
	baseQuery: axiosBaseQuery({ baseUrl }),
	tagTypes: ["Post"],
	endpoints: builder => ({
		getGiftList: builder.query<IGetGiftListResponse, IGetGiftListArgs>({
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
			providesTags: ["Post"],
		}),
		GetPointBalance: builder.query<null, null>({
			query: () => ({
				url: `store/GetPointBalance/en `,
				method: "POST",
				data: {},
			}),
			providesTags: ["Post"],
		}),
		SetFavorite: builder.mutation<ISetFavoriteResponse, ISetFavoriteArgs>({
			query: ({ langId, giftId, isFavorite }) => ({
				url: `store/SetFavorite/${langId}`,
				method: "POST",
				data: {
					giftId,
					isFavorite,
				},
			}),
			invalidatesTags: ["Post"],
		}),
	}),
})

export const {
	useGetGiftListQuery,
	useLazyGetGiftListQuery,
	useLazyGetPointBalanceQuery,
	useSetFavoriteMutation,
} = storeApi

export default storeApi
