import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"

import { authReducer } from "service/slice/auth"
import storeApi from "service/api/storeApi"

const store = configureStore({
	reducer: {
		auth: authReducer,
		[storeApi.reducerPath]: storeApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(storeApi.middleware),
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
