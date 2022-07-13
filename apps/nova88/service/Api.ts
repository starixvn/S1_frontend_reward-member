import axios from "axios"

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
}
