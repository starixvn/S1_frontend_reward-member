import {
	accountApi,
	authReducer,
	cartReducer,
	playerApi,
	redemptionApi,
	siteApi,
	storeApi,
} from '@api'
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

const store = configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
		[storeApi.reducerPath]: storeApi.reducer,
		[playerApi.reducerPath]: playerApi.reducer,
		[siteApi.reducerPath]: siteApi.reducer,
		[redemptionApi.reducerPath]: redemptionApi.reducer,
		[accountApi.reducerPath]: accountApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat([
			storeApi.middleware,
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
