import Api from "@apps/nova88/service/Api"

export const getPointBalance = async () => {
	const response = await Api.post(`store/GetPointBalance`)
	return response?.data?.data?.pointBalance
}
