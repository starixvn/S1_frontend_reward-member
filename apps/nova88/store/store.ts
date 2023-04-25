import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"

import { authReducer } from "service/slice/auth"
import { cartReducer } from "service/slice/cart"
import index from "service/api/storeApi"
import playerApi from "service/api/playerApi"
import siteApi from "service/api/siteApi"
import redemptionApi from "service/api/redemptionApi"
import accountApi from "service/api/accountApi"

const store = configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
		[index.reducerPath]: index.reducer,
		[playerApi.reducerPath]: playerApi.reducer,
		[siteApi.reducerPath]: siteApi.reducer,
		[redemptionApi.reducerPath]: redemptionApi.reducer,
		[accountApi.reducerPath]: accountApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat([
			index.middleware,
			playerApi.middleware,
			siteApi.middleware,
			redemptionApi.middleware,
			accountApi.middleware,
		]),
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
