import { api_account_UserLogin } from "./api/account"

const isBrowser = typeof window !== `undefined`

export const LOGIN = async ({ userName, password, langId }) => {
	if (!isBrowser) return false

	let result = {}

	try {
		let url
		let platform
		let userAgent
		let screen
		let di = ""
		if (typeof window !== "undefined") {
			url = window.location.origin
			platform = navigator.platform
			userAgent = navigator.userAgent
			screen = `${window.screen.width}:${window.screen.height}:${window.screen.colorDepth}`
			di = document.getElementById("__di")?.value
		}
		const res = await api_account_UserLogin(langId, {
			UserName: userName,
			Userpwd: password,
			isPersistent: true,
			url,
			platform,
			userAgent,
			screen,
			di,
		})
		let errMsg = res.data.message
		let isLogin = false
		let userData = {}
		if (res.data.errorCode === 0) {
			const userlangId = res.data.message.replace("/", "")
			let _loginUser = {
				userName,
				langId: userlangId,
				isLogin: true,
			}

			errMsg = ""
			isLogin = true
			userData = _loginUser
		}

		result = {
			errorCode: res.data.errorCode,
			message: errMsg,
			isLogin,
			userData,
		}
	} catch (error) {
		result = {
			errorCode: 999,
			message: "",
			isLogin: false,
			userData: {},
		}
	}

	return result
}
