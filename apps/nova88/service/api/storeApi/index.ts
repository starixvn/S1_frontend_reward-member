import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { axiosBaseQuery } from "service/axiosBaseQuery"
import { baseUrl } from "service/Api"
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
		getMyCoin: builder.query<IGetMyCoinResponse, null>({
			query: () => ({
				url: `store/GetMyCoin`,
				method: "POST",
				data: {},
			}),
			providesTags: ["Post"],
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
			providesTags: ["Post"],
		}),
		getGiftTags: builder.query<IGetGiftTagsResponse, null>({
			query: () => ({
				url: `store/GetGiftTags/en`,
				method: "POST",
				data: {},
			}),
			providesTags: ["Post"],
		}),
	}),
})

export const {
	useLazyGetGiftListQuery,
	useLazyGetPointBalanceQuery,
	useGetPointBalanceQuery,
	useSetFavoriteMutation,
	useLazyGetMyCoinQuery,
	useGetMyPurchaseQuery,
	useGetGiftTagsQuery,
	useLazyGetGiftTagsQuery,
} = storeApi

export default storeApi
