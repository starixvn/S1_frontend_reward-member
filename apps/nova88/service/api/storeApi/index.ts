import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { axiosBaseQuery } from "@apps/nova88/service/axiosBaseQuery"
import { baseUrl } from "@apps/nova88/service/Api"
import {
	IGetGiftListArgs,
	IGetGiftListResponse,
	ISetFavoriteResponse,
	ISetFavoriteArgs,
	IGetMyCoinResponse,
	IGetMyPurchesResponse,
	IGetMyPurchesArgs,
	IGetPointBalanceResponse,
	IGetGiftTagsResponse,
} from "./type"

const storeApi = createApi({
	reducerPath: "storeApi",
	baseQuery: axiosBaseQuery({ baseUrl }),
	tagTypes: ["Post"],
	endpoints: builder => ({
		getGiftList: builder.query<IGetGiftListResponse, IGetGiftListArgs>({
			query: ({ langId, ...data }) => ({
				url: `store/GetGiftList/${langId}`,
				method: "POST",
				data,
			}),
			providesTags: ["Post"],
		}),
		GetPointBalance: builder.query<IGetPointBalanceResponse, null>({
			query: () => ({
				url: `store/GetPointBalance`,
				method: "POST",
				data: {},
			}),
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
		getMyCoin: builder.query<IGetMyCoinResponse, null>({
			query: () => ({
				url: `store/GetMyCoin`,
				method: "POST",
				data: {},
			}),
		}),
		getMyPurchase: builder.query<IGetMyPurchesResponse, IGetMyPurchesArgs>({
			query: ({ PageNumber, PageSize }) => ({
				url: `store/GetMyPurches`,
				method: "POST",
				data: {
					PageNumber,
					PageSize,
				},
			}),
		}),
		getGiftTags: builder.query<IGetGiftTagsResponse, { langId: string }>({
			query: ({ langId }) => ({
				url: `store/GetGiftTags/${langId}`,
				method: "POST",
				data: {},
			}),
		}),
	}),
})

export const {
	useLazyGetGiftListQuery,
	useLazyGetPointBalanceQuery,
	useSetFavoriteMutation,
	useLazyGetMyCoinQuery,
	useGetMyPurchaseQuery,
	useGetGiftTagsQuery,
	useLazyGetGiftTagsQuery,
} = storeApi

export default storeApi
