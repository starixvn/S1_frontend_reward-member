import { accountRequest } from "./base"

export const api_account_UserLogin = data=>accountRequest.post("/SignIn", data);
export const api_account_UserLogout = () => accountRequest.post("/SignOut");


