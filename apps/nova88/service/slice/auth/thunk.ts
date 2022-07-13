import { createAsyncThunk } from "@reduxjs/toolkit"
import { setCookie } from "common/utils/func"

import { checkSignIn, getCustProfile, logout } from "./api"

export const checkSignInAsync = createAsyncThunk(
	"auth/checkSignIn",
	async () => {
		const isLogin = await checkSignIn()
		return isLogin
	}
)

export const getCustProfileAsync = createAsyncThunk(
	"auth/getCustProfile",
	async () => {
		const profile = await getCustProfile()

		//  * 記錄語系
		setCookie({
			cookieName: "nova88LangId",
			cookieValue: profile.langId,
		})

		return profile
	}
)

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
	const success = await logout()
	return success
})

// * 這邊是需要 body 的型態的範例
/*
export const getGiftListAsync = createAsyncThunk(
	"store/getGiftList",
	async (body: {
		langId: string
		categoryIds: number[]
		tags: number[] | null
		orderByField: any
		desc: boolean
	}) => {
		const data = await getGiftList(body)

		return data
	}
)
*/
