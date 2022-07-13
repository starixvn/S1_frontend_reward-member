import Api from "../../Api"
import { ICustProfile } from "./type"

// * 是否維持登入狀態
export const checkSignIn = async (): Promise<boolean> => {
	const response = await Api.post(`Site/CheckSignIn`)

	return response?.data?.errorCode === 0
}

// * 使用者資訊
export const getCustProfile = async (): Promise<ICustProfile> => {
	const response = await Api.post(`AccountStrict/GetCustProfile`)

	return response.data?.data ?? {}
}

// * 登出
export const logout = async () => {
	const response = await Api.post(`Account/SignOut`)

	return response?.data?.errorCode === 0
}

// * 這邊是需要 body 的型態的範例
/*
export const getGiftList = async ({
	langId,
	categoryIds,
	tags,
	orderByField,
	desc,
}) => {
	const response = await Api.post(`store/GetGiftList/${langId}`, {
		CategoryIds: categoryIds,
		Tags: tags,
		OrderByField: orderByField,
		Desc: desc,
	})

	if (response?.data?.errorCode !== 0) {
		throw new Error(response?.data?.message)
	}

	return response?.data?.data ?? []
}
*/
