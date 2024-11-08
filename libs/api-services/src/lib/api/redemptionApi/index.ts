import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseUrl } from '../Api'
import { axiosBaseQuery, IAxiosResponse } from '../axiosBaseQuery'
import {
	ICreateRedemptionArgs,
	ISetShoppingCarData,
	ISetShoppingCartArgs,
} from './type'

const redemptionApi = createApi({
	reducerPath: 'redemptionApi',
	baseQuery: axiosBaseQuery({ baseUrl }),
	tagTypes: ['Post'],
	endpoints: builder => ({
		createRedemption: builder.mutation<IAxiosResponse, ICreateRedemptionArgs>({
			query: ({ giftId, point }) => ({
				url: `redemption/CreateRedemption`,
				method: 'POST',
				data: {
					GiftId: giftId,
					Point: point,
				},
			}),
			invalidatesTags: ['Post'],
		}),
		setShoppingCart: builder.mutation<
			IAxiosResponse<ISetShoppingCarData[]>,
			ISetShoppingCartArgs
		>({
			query: ({ giftIds, isAdd }) => ({
				url: `redemption/SetShoppingCart`,
				method: 'POST',
				data: {
					GiftIds: giftIds,
					IsAdd: isAdd,
				},
			}),
			invalidatesTags: ['Post'],
		}),
	}),
})

export const { useCreateRedemptionMutation, useSetShoppingCartMutation } =
	redemptionApi

export default redemptionApi
