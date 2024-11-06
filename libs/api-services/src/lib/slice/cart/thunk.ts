import {
	baseAxios,
	IPointBalance,
	ISetShoppingCarData,
	ISetShoppingCartArgs,
} from '@api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAxiosResponse } from '../../api/axiosBaseQuery'

export const getPointBalanceAsync = createAsyncThunk(
	'store/GetPointBalance',
	async () => {
		const { data } = await baseAxios.post<IAxiosResponse<IPointBalance>>(
			`store/GetPointBalance`
		)
		return data
	}
)

export const setShoppingCartAsync = createAsyncThunk(
	'redemption/SetShoppingCart',
	async (arg: ISetShoppingCartArgs) => {
		const { data } = await baseAxios.post<
			IAxiosResponse<ISetShoppingCarData[]>
		>(`redemption/SetShoppingCart`, arg)
		return data
	}
)
