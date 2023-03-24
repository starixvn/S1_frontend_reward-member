import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"

import { authReducer } from "service/slice/auth"
import { cartReducer } from "service/slice/cart"
import index from "service/api/storeApi"
import playerApi from "service/api/playerApi"
import siteApi from "service/api/siteApi"

const store = configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
		[index.reducerPath]: index.reducer,
		[playerApi.reducerPath]: playerApi.reducer,
		[siteApi.reducerPath]: playerApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(index.middleware, playerApi.middleware),
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
