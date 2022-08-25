import Api from "service/Api"

export const getPointBalance = async () => {
	const response = await Api.post(`store/GetPointBalance`)
	return response?.data?.data?.pointBalance
}
