import axios from "axios"
import { IAxiosResponse } from "./axiosBaseQuery"

export const baseUrl = "/api/"

export const baseAxios = axios.create({
	withCredentials: true,
	baseURL: baseUrl,
})

export default class Api {
	static get = (url: string, data: object | null = null) =>
		baseAxios.get(url, { params: data })

	static post = (url: string, data: object | null = null) =>
		baseAxios.post(url, data)

	static login = async ({
		userName,
		password,
		langId,
	}: {
		userName: string
		password: string
		langId
	}): Promise<IAxiosResponse<void>> => {
		const isBrowser = typeof window !== `undefined`
		if (!isBrowser) return {} as IAxiosResponse<void>

		const url = window.location.origin
		const platform = navigator.platform
		const userAgent = navigator.userAgent
		const screen = `${window.screen.width}:${window.screen.height}:${window.screen.colorDepth}`

		const { data } = await baseAxios.post(`Site/SignIn/${langId}`, {
			UserName: userName,
			Userpwd: password,
			isPersistent: true,
			url,
			platform,
			userAgent,
			screen,
			di: "",
		})

		return data as IAxiosResponse<void>
	}
}
