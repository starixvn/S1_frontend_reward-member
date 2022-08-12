import React, { FC } from "react"
import Link from "next/link"
import { DeepRequired, FieldErrorsImpl, UseFormRegister } from "react-hook-form"
import { paths } from "common/constants"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import { Input } from "common/components/Input"
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
					placeholder={t("UserName")}
					error={errors.userName}
					prefix={<i className="icon icon-member" />}
					rules={[
						{
							required: true,
							message: t("Label_Required", { key: t("UserName") }),
						},
						{
							minLength: 6,
							maxLength: 18,
							pattern: /^[A-Za-z0-9]+$/i,
							message: t("Label_UserNameAlphanumeric"),
						},
					]}
				/>

				<Input.Tip>{t("Label_LoginUserNameInfo")}</Input.Tip>
			</div>

			<div className="inputModule">
				<Input
					register={register}
					label="password"
					placeholder={t("PassWord")}
					type="password"
					error={errors.password}
					prefix={<Input.Icon className="icon icon-key" />}
					rules={[
						{
							required: true,
							message: t("Label_Required", { key: t("PassWord") }),
						},
						{
							minLength: 6,
							maxLength: 15,
							message: t("Label_PasswordAlphanumeric"),
						},
					]}
				/>

				<Input.Tip>{t("Label_LoginPasswordInfo")}</Input.Tip>

				<Link href={`/${langId}/${paths.forgetPassword}`}>
					{t("ForgotPassword")}
				</Link>
			</div>

			<div className="btnGroup">
				<button
					type="button"
					className="btn-sign"
					onClick={() => router.push(`/${langId}/${paths.join}`)}>
					{t("SIGN_UP")}
				</button>
				<button className="btn-login" type="submit">
					{t("LOGIN")}
				</button>
			</div>
		</form>
	)
}

export default Form
