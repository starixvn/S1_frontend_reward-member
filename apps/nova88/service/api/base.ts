import axios from "axios"

const rootURL = ""

export const storeRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/store`,
})

export const accountRequest = axios.create({
  withCredentials: true,
  baseURL: `${rootURL}/api/Account`
});

export const accountStrictRequest = axios.create({
  withCredentials: true,
  baseURL: `${rootURL}/api/AccountStrict`
});

export const siteRequest = axios.create({
  withCredentials: true,
  baseURL: `${rootURL}/api/Site`
});

export const loginRequest = axios.create({
  withCredentials: true,
  baseURL: `${rootURL}/api/Site`
});
