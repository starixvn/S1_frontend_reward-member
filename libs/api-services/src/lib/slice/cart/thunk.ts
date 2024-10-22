import { createAsyncThunk } from '@reduxjs/toolkit'
import { getPointBalance } from './api'

export const getPointBalanceAsync = createAsyncThunk(
	'store/GetPointBalance',
	async () => {
		const pointBalance = await getPointBalance()
		return pointBalance
	}
)
