import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"

import { authReducer } from "service/slice/auth"
import index from "service/api/storeApi"

const store = configureStore({
	reducer: {
		auth: authReducer,

		[index.reducerPath]: index.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(index.middleware),
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
