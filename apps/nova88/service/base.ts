import axios from "axios"

const rootURL = ""

export const storeRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/store`,
})
