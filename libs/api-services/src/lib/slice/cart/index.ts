import { ISetShoppingCarData } from '@api'
import { RootState } from '@operations'
import { createSlice } from '@reduxjs/toolkit'
import { getPointBalanceAsync, setShoppingCartAsync } from './thunk'

// * 定義 state 的 interface
interface IStateProps {
	cartNumber: number
	pointBalance: number
	cartList: ISetShoppingCarData[]
}

const initialState: IStateProps = {
	cartNumber: 0,
	pointBalance: 0,
	cartList: [],
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
		build
			.addCase(getPointBalanceAsync.fulfilled, (state, action) => {
				state.pointBalance = action.payload.data.pointBalance
			})
			.addCase(setShoppingCartAsync.fulfilled, (state, action) => {
				state.cartList = action.payload.data
			}),
})

// * RootState 可以讓我們知道 state 的 interface
export const selectedCartNumber = ({ cart }: RootState) => cart.cartNumber
export const selectedCartList = ({ cart }: RootState) => cart.cartList
export const selectedPointBalance = ({ cart }: RootState) => cart.pointBalance

export const cartReducer = cartSlice.reducer
export const { setCartNumber, setPointBalance } = cartSlice.actions
