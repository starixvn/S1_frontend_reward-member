import React, { useState } from "react"
import Inputbox from "../common/inputbox"
import { useTranslation } from "react-i18next"
import { LOGIN } from "../../service/auth"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { popBoxActions } from "../../store/popBoxSlice"
import { userActions } from "../../store/userSlice"

const PopBoxLogin = () => {
	const langId = useSelector(state => state.user.langId)
	const isShow = useSelector(state => state.popBox.isOpen)
	const dispatch = useDispatch()
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
		console.log("1")
		e.preventDefault()
		const isVerifyOK =
			checkInputRule("username", usernameVal) &&
			checkInputRule("password", passwordVal)
		if (isVerifyOK) {
			LOGIN({
				userName: usernameVal,
				password: passwordVal,
				langId: langId,
			}).then(res => {
				if (res.errorCode === 0) {
					dispatch(userActions.setUserInfo({ isLogin: res.isLogin }))
					dispatch(popBoxActions.popClose())
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
			<div
				className="icon icon-close"
				onClick={() => {
					dispatch(popBoxActions.popClose())
				}}
			/>
			<div className="loginModule">
				<div>
					<img src="https://store.0814media.net/img/loginbg.jpg" alt="" />
				</div>
				<div className="loginFunction">
					<img src="https://store.0814media.net/img/88logo.png" alt="" />
					<div className="title">{t("Login")}</div>
					<form onSubmit={loginHandle}>
						<Inputbox
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
						<Inputbox
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
