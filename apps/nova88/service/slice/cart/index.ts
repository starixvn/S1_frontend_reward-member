import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "store"

// * 定義 state 的 interface
interface IStateProps {
	cartNumber: number
}

const initialState: IStateProps = {
	cartNumber: 0,
}

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		setCartNumber: (state, action) => {
			state.cartNumber = action.payload
		},
	},
})

// * RootState 可以讓我們知道 state 的 interface
export const selectedCartNumber = ({ cart }: RootState) => cart.cartNumber

export const { setCartNumber } = cartSlice.actions
export const cartReducer = cartSlice.reducer
