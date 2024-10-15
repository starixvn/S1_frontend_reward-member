import React, { FC } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useLocalStorage } from "usehooks-ts"
import { useAppDispatch, useAppSelector } from "@apps/onetwobet/store"
import { imageUrl, siteInfo } from "@apps/onetwobet/config"
import Api from "@apps/onetwobet/service/Api"
import { selectedLangId, setIsLogin } from "@apps/onetwobet/service/slice/auth"
import { getCustProfileAsync } from "@apps/onetwobet/service/slice/auth/thunk"
import { getPointBalanceAsync } from "@apps/onetwobet/service/slice/cart/thunk"
import { usePopBox } from "@apps/onetwobet/common/hooks"
import { REWARD88_LANG } from "@apps/onetwobet/common/constants/localStorage"
import Form from "./Form"
import { IFormValues } from "./type"

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
			})
			const isLogin = errorCode === 0

			if (isLogin) {
				// * 撈完初始使用者資訊之後再將登入改為 true
				await dispatch(getCustProfileAsync())
				dispatch(setIsLogin(isLogin))
				await dispatch(getPointBalanceAsync())
				closePopBox()

				// * 登入及登出後重置語系
				i18n.changeLanguage(siteInfo.defaultLang)
				setLocalStorageLangId(null)
			} else if ([1101, 1001].includes(errorCode)) {
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
					<img src={`${imageUrl}/img/login_${i18n.language}.jpg`} alt="" />
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
