import React, { FC } from "react"
import Link from "next/link"
import { DeepRequired, FieldErrorsImpl, UseFormRegister } from "react-hook-form"
import { paths } from "@apps/onetwobet/common/constants"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import { Input } from "@apps/onetwobet/common/components/Input"
import { IFormValues } from "./type"

interface IFormProps {
	onSubmit: () => void
	register: UseFormRegister<IFormValues>
	errors: FieldErrorsImpl<DeepRequired<IFormValues>>
	langId: string
}

const Form: FC<IFormProps> = ({ onSubmit, register, errors, langId }) => {
	const { t } = useTranslation()
	const router = useRouter()

	return (
		<form onSubmit={onSubmit}>
			<div className="inputModule">
				<Input
					register={register}
					label="userName"
					placeholder={t("Username")}
					error={errors.userName}
					prefix={<i className="icon icon-member" />}
					rules={[
						{
							required: true,
							message: t("IsRequired", { key: t("Username") }),
						},
					]}
				/>

				<Input.Tip>{t("LoginUserNameInfo")}</Input.Tip>
			</div>

			<div className="inputModule">
				<Input
					register={register}
					label="password"
					placeholder={t("Password")}
					type="password"
					error={errors.password}
					prefix={<Input.Icon className="icon icon-key" />}
					rules={[
						{
							required: true,
							message: t("IsRequired", { key: t("Password") }),
						},
					]}
				/>

				<a href={`/${paths.forgetPassword}`}>{t("ForgetPassword")}</a>
			</div>

			<div className="btnGroup">
				<button
					type="button"
					className="btn-sign"
					onClick={() => router.push(`${paths.join}`)}>
					{t("SIGN_UP")}
				</button>
				<button className="btn-login" type="submit">
					{t("Login").toUpperCase()}
				</button>
			</div>
		</form>
	)
}

export default Form
