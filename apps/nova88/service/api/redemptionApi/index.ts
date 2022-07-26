import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { axiosBaseQuery } from "service/axiosBaseQuery"
import { baseUrl } from "service/Api"
import { ICreateRedemptionResponse, ICreateRedemptionArgs } from "./type"

const redemptionApi = createApi({
	reducerPath: "redemptionApi",
	baseQuery: axiosBaseQuery({ baseUrl }),
	tagTypes: ["Post"],
	endpoints: builder => ({
		createRedemption: builder.query<
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
			providesTags: ["Post"],
		}),
	}),
})

export const { useLazyCreateRedemptionQuery } = redemptionApi

export default redemptionApi
