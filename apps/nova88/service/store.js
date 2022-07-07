import { storeRequest } from "./base"

export const api_store_GetGiftList = ({
	langId,
	categoryIds,
	tags,
	orderByField,
	desc,
}) =>
	storeRequest.post(`/GetGiftList/${langId}`, {
		CategoryIds: categoryIds,
		Tags: tags,
		OrderByField: orderByField,
		Desc: desc,
	})
