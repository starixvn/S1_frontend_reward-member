import { accountRequest, loginRequest } from "./base";

export const api_account_UserLogin = (langId, data) => loginRequest.post(`/SignIn/${langId}`, data);
export const api_account_UserLogout = () => accountRequest.post("/SignOut");


