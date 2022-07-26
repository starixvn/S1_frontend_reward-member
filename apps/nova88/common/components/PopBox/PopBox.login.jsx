import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/router"
import InputBox from "../Input/InputBox"
import { LOGIN } from "service/auth"
import { usePopBox } from "common/hooks"
import { useAppDispatch, useAppSelector } from "store"
import { selectedLangId, setIsLogin } from "service/slice/auth"
import { getCustProfileAsync } from "service/slice/auth/thunk"

const PopBoxLogin = () => {
	const { closePopBox } = usePopBox()
	const dispatch = useAppDispatch()
	const langId = useAppSelector(selectedLangId)

	// const isShow = useSelector(state => state.popBox.isOpen)

	const router = useRouter()
	const [usernameVal, setUsernameVal] = useState("")
	const [passwordVal, setPasswordVal] = useState("")
	const [userNameTip, setUserNameTip] = useState("")
	const [passwordTip, setPasswordTip] = useState("")
	const [isShowUserNameTip, setIsShowUserNameTip] = useState(false)
	const [isShowPasswordTip, setIsShowPasswordTip] = useState(false)
	const { t } = useTranslation()

	const checkInputRule = (col, val) => {
		let checked = true
		let msg = ""

		if (val === "") {
			msg = col === "username" ? t("msg_UsernameReq") : t("msg_PasswordReq")
			checked = false
		} else if (col === "username" && (val.length < 6 || val.length > 18)) {
			// * fix: 'msg' is assigned a value but never used.
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			msg = `${t("lbl_Username")} ${t("msg_UsernameLength")}`
			checked = false
		}

		if (!checked) {
			col === "username"
				? setIsShowUserNameTip(true)
				: setIsShowPasswordTip(true)
		}

		return checked
	}
	const loginHandle = async e => {
		e.preventDefault()
		const isVerifyOK =
			checkInputRule("username", usernameVal) &&
			checkInputRule("password", passwordVal)
		if (isVerifyOK) {
			LOGIN({
				userName: usernameVal,
				password: passwordVal,
				langId: langId,
			}).then(async res => {
				if (res.errorCode === 0) {
					// * 撈完初始使用者資訊之後再將登入改為 true
					await dispatch(getCustProfileAsync())
					dispatch(setIsLogin(res.isLogin))
					closePopBox()
				} else if (
					res.errorCode === 1101 ||
					res.errorCode === 1102 ||
					res.errorCode === 9000
				) {
					setUserNameTip(res.message)
					setIsShowUserNameTip(true)
				} else if (res.errorCode === 1001) {
					setPasswordTip(res.message)
					setIsShowPasswordTip(true)
				}
			})
		}
	}

	return (
		<div className="login-pop">
			<div className="icon icon-close" onClick={closePopBox} />
			<div className="loginModule">
				<div>
					<img src="https://store.0814media.net/img/loginbg.jpg" alt="" />
				</div>
				<div className="loginFunction">
					<img src="https://store.0814media.net/img/88logo.png" alt="" />
					<div className="title">{t("Login")}</div>
					<form onSubmit={loginHandle}>
						<InputBox
							icon="icon-member"
							value={usernameVal}
							onBlur={checkInputRule}
							onChange={e => {
								setUsernameVal(e.target.value)
							}}
							placeHolder={t("UserName")}
							iconActions={["icon-warning", "icon-information"]}
							isShowTip={isShowUserNameTip}
							tipContent={
								userNameTip
									? t(userNameTip)
									: t(
											"For security, we suggest that your username does not contain your real name."
									  )
							}
						/>
						<InputBox
							icon="icon-member"
							value={passwordVal}
							onBlur={checkInputRule}
							onChange={e => {
								setPasswordVal(e.target.value)
							}}
							placeHolder={t("PassWord")}
							iconActions={[
								"icon-warning",
								"icon-information",
								"icon-eye-blocked",
							]}
							isShowTip={isShowPasswordTip}
							tipContent={
								passwordTip
									? t(passwordTip)
									: t(
											"6-18 alphanumeric (A-Z, a-z, 0-9)characters or special characters @$*!%#?&"
									  )
							}
							hotKey={t("Forgot password")}
							link={`https://www.nova88.net/${langId}/forgetPassword`}
						/>
						<div className="btnGroup">
							<button
								className="btn-sign"
								onClick={() =>
									router.push(`https://www.nova88.net/${langId}/join`)
								}>
								{t("SIGN UP")}
							</button>
							<button className="btn-login" type="submit">
								{t("LOGIN")}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default PopBoxLogin
