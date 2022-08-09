import axios from "axios"

const rootURL = ""

export const loginRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/Site`,
})
