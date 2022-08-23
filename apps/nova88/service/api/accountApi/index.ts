import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { axiosBaseQuery } from "service/axiosBaseQuery"
import { baseUrl } from "service/Api"
import { ISetLanguageArgs, ISetLanguageResponse } from "./type"

const accountApi = createApi({
	reducerPath: "accountApi",
	baseQuery: axiosBaseQuery({ baseUrl }),
	tagTypes: ["Post"],
	endpoints: builder => ({
		setLanguage: builder.mutation<ISetLanguageResponse, ISetLanguageArgs>({
			query: ({ langId }) => ({
				url: `account/SetLanguage`,
				method: "POST",
				data: {
					LangId: langId,
				},
			}),
			invalidatesTags: ["Post"],
		}),
	}),
})

export const { useSetLanguageMutation } = accountApi

export default accountApi
