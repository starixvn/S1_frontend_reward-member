import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"

import { authReducer } from "@apps/nova88/service/slice/auth"
import { cartReducer } from "@apps/nova88/service/slice/cart"
import index from "@apps/nova88/service/api/storeApi"
import playerApi from "@apps/nova88/service/api/playerApi"
import siteApi from "@apps/nova88/service/api/siteApi"
import redemptionApi from "@apps/nova88/service/api/redemptionApi"
import accountApi from "@apps/nova88/service/api/accountApi"

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
