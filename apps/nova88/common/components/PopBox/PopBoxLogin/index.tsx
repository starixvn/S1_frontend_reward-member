import React, { FC } from "react"
import Api from "service/Api"
import { useForm, SubmitHandler } from "react-hook-form"
import { usePopBox } from "common/hooks"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "store"
import { selectedLangId, setIsLogin } from "service/slice/auth"
import { imageUrl, siteInfo } from "config"
import { getCustProfileAsync } from "service/slice/auth/thunk"
import { IFormValues } from "./type"
import Form from "./Form"
import { useLocalStorage } from "usehooks-ts"
import { REWARD88_LANG } from "common/constants/localStorage"

const PopBoxLogin: FC = () => {
	const { t, i18n } = useTranslation()
	const { closePopBox, setPopBoxType } = usePopBox()
	const dispatch = useAppDispatch()
	const langId = useAppSelector(selectedLangId)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [localStorageLangId, setLocalStorageLangId] = useLocalStorage(
		REWARD88_LANG,
		null
	)

	const {
		register,
		setError,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormValues>()

	const onSubmit: SubmitHandler<IFormValues> = async ({
		userName,
		password,
	}) => {
		try {
			const { errorCode, message } = await Api.login({
				userName,
				password,
				langId,
			})
			const isLogin = errorCode === 0

			if (isLogin) {
				// * 撈完初始使用者資訊之後再將登入改為 true
				await dispatch(getCustProfileAsync())
				dispatch(setIsLogin(isLogin))
				closePopBox()

				// * 登入及登出後重置語系
				i18n.changeLanguage(siteInfo.defaultLang)
				setLocalStorageLangId(null)
			} else if ([1101].includes(errorCode)) {
				setError("password", { type: "custom", message })
			} else if ([1102, 9000].includes(errorCode)) {
				setError("userName", { type: "custom", message })
			}
		} catch (error) {
			setPopBoxType({
				type: "warn",
				props: { content: error.message },
			})
		}
	}

	return (
		<div className="login-pop">
			<div className="icon icon-close" onClick={closePopBox} />
			<div className="loginModule">
				<div>
					<img src={`${imageUrl}/img/loginbg.jpg`} alt="" />
				</div>
				<div className="loginFunction">
					<img src={`${imageUrl}/img/88logo.png`} alt="" />
					<div className="title">{t("Login")}</div>

					<Form
						onSubmit={handleSubmit(onSubmit)}
						register={register}
						errors={errors}
						langId={langId}
					/>
				</div>
			</div>
		</div>
	)
}

export default PopBoxLogin
