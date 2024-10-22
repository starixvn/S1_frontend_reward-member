import { Api } from '@api'

export const getPointBalance = async () => {
	const response = await Api.post(`store/GetPointBalance`)
	return response?.data?.data?.pointBalance
}
