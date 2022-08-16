import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { axiosBaseQuery } from "service/axiosBaseQuery"
import { baseUrl } from "service/Api"
import { ICreateRedemptionResponse, ICreateRedemptionArgs } from "./type"

const redemptionApi = createApi({
	reducerPath: "redemptionApi",
	baseQuery: axiosBaseQuery({ baseUrl }),
	tagTypes: ["Post"],
	endpoints: builder => ({
		createRedemption: builder.mutation<
			ICreateRedemptionResponse,
			ICreateRedemptionArgs
		>({
			query: ({ giftId, point }) => ({
				url: `redemption/CreateRedemption`,
				method: "POST",
				data: {
					GiftId: giftId,
					Point: point,
				},
			}),
			invalidatesTags: ["Post"],
		}),
	}),
})

export const { useCreateRedemptionMutation } = redemptionApi

export default redemptionApi
