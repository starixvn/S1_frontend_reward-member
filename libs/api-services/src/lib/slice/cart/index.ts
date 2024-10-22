import { RootState } from '@operations'
import { createSlice } from '@reduxjs/toolkit'
import { getPointBalanceAsync } from './thunk'

// * 定義 state 的 interface
interface IStateProps {
	cartNumber: number
	pointBalance: number
}

const initialState: IStateProps = {
	cartNumber: 0,
	pointBalance: 0,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCartNumber: (state, action) => {
			state.cartNumber = action.payload
		},
		setPointBalance: (state, action) => {
			state.pointBalance = action.payload
		},
	},
	extraReducers: build =>
		build.addCase(getPointBalanceAsync.fulfilled, (state, action) => {
			const pointBalance = action.payload
			state.pointBalance = pointBalance
		}),
})

// * RootState 可以讓我們知道 state 的 interface
export const selectedCartNumber = ({ cart }: RootState) => cart.cartNumber
export const selectedPointBalance = ({ cart }: RootState) => cart.pointBalance

export const { setCartNumber } = cartSlice.actions
export const { setPointBalance } = cartSlice.actions
export const cartReducer = cartSlice.reducer
