import { BaseQueryFn } from "@reduxjs/toolkit/query"
import axios, { AxiosRequestConfig, AxiosError } from "axios"

export interface IAxiosResponse<T> {
	data: T
	totalPages?: number
	pageNumber?: number
	rowCount?: number
	errorCode: number
	message: string
	rawErrorCode?: string
	rawMessage?: string
}

// * 這裡定義前端預給的 Header
const preHeaders = {
	"ai-host": `${process.env["NEXT_PUBLIC_REFERER_HOST"]}`,
}

// * 定義使用 `createApi` 時的 `baseQuery`，定義可用的參數及基本的錯誤處理
export const axiosBaseQuery =
	(
		{ baseUrl }: { baseUrl: string } = { baseUrl: "" }
	): BaseQueryFn<
		{
			url: string
			method: AxiosRequestConfig["method"]
			data?: AxiosRequestConfig["data"]
			params?: AxiosRequestConfig["params"]
			headers?: AxiosRequestConfig["headers"]
			responseType?: AxiosRequestConfig["responseType"]
		},
		unknown,
		unknown
	> =>
	async ({ url, method, data, params, headers, responseType }) => {
		try {
			const result = await axios({
				url: baseUrl + url,
				method,
				data,
				params,
				headers: { ...preHeaders, ...headers },
				responseType,
			})

			if (result?.data?.errorCode && result?.data?.errorCode !== 0) {
				throw new Error(result?.data?.message)
			}

			return { data: result.data }
		} catch (axiosError) {
			const error = axiosError as AxiosError

			return {
				error: {
					status: error.response?.status,
					message: error?.message || error.response?.statusText,
				},
			}
		}
	}
