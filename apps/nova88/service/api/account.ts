import { loginRequest } from "./base"

export const api_account_UserLogin = (langId, data) =>
	loginRequest.post(`/SignIn/${langId}`, data)
