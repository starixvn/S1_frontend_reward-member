import { CurrenciesEnum, ENV_COOKIE_NAMES } from '@constants'
import { RootState } from '@operations'
import { createSlice } from '@reduxjs/toolkit'
import { getCookie } from 'cookies-next'
import { checkSignInAsync, getCustProfileAsync, logoutAsync } from './thunk'
import { ICustProfile } from './type'

// * 定義 state 的 interface
interface IStateProps {
	isLogin: null | boolean
	profile: ICustProfile
}

const cookieLangId = getCookie(ENV_COOKIE_NAMES.LangId)
const cookieCurrencyId = getCookie(ENV_COOKIE_NAMES.CurrencyId)

const initialState: IStateProps = {
	isLogin: null,
	profile: {
		userName: 'Guest',
		langId: cookieLangId ? String(cookieLangId) : 'en',
		currencyId: cookieCurrencyId
			? Number(cookieCurrencyId)
			: CurrenciesEnum.MYR,
	},
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsLogin: (state, action) => {
			state.isLogin = action.payload
		},
		setLangId: (state, action) => {
			state.profile.langId = action.payload
		},
		setCurrencyId: (state, action) => {
			state.profile.currencyId = action.payload
		},
		setProfile: (state, action) => {
			state.profile = action.payload
		},
	},
	extraReducers: build =>
		build
			.addCase(checkSignInAsync.fulfilled, (state, action) => {
				const isLogin = action.payload
				state.isLogin = isLogin
			})
			.addCase(getCustProfileAsync.fulfilled, (state, action) => {
				const profile = action.payload
				state.profile = profile
			})
			.addCase(logoutAsync.fulfilled, (state, action) => {
				const success = action.payload

				if (success) {
					state = initialState
				}
			}),
})

// * RootState 可以讓我們知道 state 的 interface
export const selectedIsLogin = ({ auth }: RootState) => auth.isLogin
export const selectedProfile = ({ auth }: RootState) => auth.profile
export const selectedCurrencyId = ({ auth }: RootState) =>
	auth.profile?.currencyId
export const selectedUserName = ({ auth }: RootState) => auth.profile?.userName
export const selectedLangId = ({ auth }: RootState) => auth.profile?.langId

export const { setIsLogin, setLangId, setCurrencyId, setProfile } =
	authSlice.actions
export const authReducer = authSlice.reducer
