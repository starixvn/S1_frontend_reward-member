import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { axiosBaseQuery } from "service/axiosBaseQuery"
import { baseUrl } from "service/Api"
import { IGetAppLinkResponse } from "./type"

const playerApi = createApi({
	reducerPath: "playerApi",
	baseQuery: axiosBaseQuery({ baseUrl }),
	tagTypes: ["Post"],
	endpoints: builder => ({
		GetAppLink: builder.query<IGetAppLinkResponse, null>({
			query: () => ({
				url: "Player/GetAppLink",
				method: "POST",
				data: {},
			}),
			providesTags: ["Post"],
		}),
	}),
})

export const { useGetAppLinkQuery } = playerApi
export default playerApi
