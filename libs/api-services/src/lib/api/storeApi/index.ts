import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseUrl } from '../Api'
import { axiosBaseQuery } from '../axiosBaseQuery'
import {
	IGetGiftListArgs,
	IGetGiftListResponse,
	IGetGiftTagsArgs,
	IGetGiftTagsResponse,
	IGetMyCoinResponse,
	IGetMyPurchesArgs,
	IGetMyPurchesResponse,
	IGetPointBalanceResponse,
	ISetFavoriteArgs,
	ISetFavoriteResponse,
} from './type'

const storeApi = createApi({
	reducerPath: 'storeApi',
	baseQuery: axiosBaseQuery({ baseUrl }),
	tagTypes: ['Post'],
	endpoints: builder => ({
		getGiftList: builder.query<IGetGiftListResponse, IGetGiftListArgs>({
			query: data => ({
				url: `store/GetGiftList`,
				method: 'POST',
				data,
			}),
			providesTags: ['Post'],
		}),
		GetPointBalance: builder.query<IGetPointBalanceResponse, null>({
			query: () => ({
				url: `store/GetPointBalance`,
				method: 'POST',
				data: {},
			}),
		}),
		SetFavorite: builder.mutation<ISetFavoriteResponse, ISetFavoriteArgs>({
			query: ({ giftId, isFavorite }) => ({
				url: `store/SetFavorite`,
				method: 'POST',
				data: {
					giftId,
					isFavorite,
				},
			}),
			invalidatesTags: ['Post'],
		}),
		getMyCoin: builder.query<IGetMyCoinResponse, null>({
			query: () => ({
				url: `store/GetMyCoin`,
				method: 'POST',
				data: {},
			}),
		}),
		getMyPurchase: builder.query<IGetMyPurchesResponse, IGetMyPurchesArgs>({
			query: ({ PageNumber, PageSize }) => ({
				url: `store/GetMyPurches`,
				method: 'POST',
				data: {
					PageNumber,
					PageSize,
				},
			}),
		}),
		getGiftTags: builder.query<IGetGiftTagsResponse, IGetGiftTagsArgs>({
			query: data => ({
				url: `store/GetGiftTags`,
				method: 'POST',
				data,
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
