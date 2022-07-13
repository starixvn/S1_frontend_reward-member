/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react"
import Inputbox from "../Input/inputbox"
import { useTranslation } from "react-i18next"

const PopBoxLogin = ({
	isShow = false,
	userNameValue = "",
	passwordValue = "",
	onChangeUserName = null,
	onChangePassword = null,
	tipStatus = null,
}) => {
	const [usernameVal, setUsernameVal] = useState("")
	const [passwordVal, setPasswordVal] = useState("")
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
			// errorPopBox(msg);
		}

		return checked
	}

	const loginHandle = async e => {
		e.preventDefault()
		const isVerifyOK =
			checkInputRule("username", usernameVal) &&
			checkInputRule("password", passwordVal)
		if (isVerifyOK) {
			//todo:call login api
		}
	}

	return (
		<div id="popup" className={isShow ? "active" : ""}>
			<div className="login-pop">
				<div className="icon icon-close" />
				<div className="loginModule">
					<div>
						<img src="https://store.0814media.net/img/loginbg.jpg" alt="" />
					</div>
					<div className="loginFunction">
						<img src="https://store.0814media.net/img/88logo.png" alt="" />
						<div className="title">Login</div>
						<form>
							<Inputbox
								icon="icon-member"
								value={userNameValue}
								onBlur={checkInputRule}
								onChange={onChangeUserName}
								placeHolder="UserName"
								iconActions={["icon-warning", "icon-information"]}
								tipStatus={tipStatus}
								tipContent="For security, we suggest that your username does not contain your real name."
							/>
							<Inputbox
								icon="icon-member"
								value={passwordValue}
								onBlur={checkInputRule}
								onChange={onChangePassword}
								placeHolder="PassWord"
								iconActions={[
									"icon-warning",
									"icon-information",
									"icon-eye-blocked",
								]}
								tipStatus={tipStatus}
								tipContent="6-18 alphanumeric (A-Z, a-z, 0-9)characters or special characters @$*!%#?&"
								hotKey="Forgot password?"
								link=""
							/>
							<div className="btnGroup">
								<button className="btn-sign">SIGN UP</button>
								<button className="btn-login">LOGIN</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PopBoxLogin
