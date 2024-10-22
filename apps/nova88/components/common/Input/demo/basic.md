# Basic Usage

Input 以 [React Hook Form](https://react-hook-form.com/) 實作並提供以下幾種驗證方式，以登入頁面作為範例

React Hook Form makes form validation easy by aligning with the existing HTML standard for form validation.

List of validation rules supported:

- required
- min
- max
- minLength
- maxLength
- pattern
- validate

You can read more detail on each rule in the [register section](https://react-hook-form.com/api#register).

```tsx
import React, { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "common/components/Input"
import { useTranslation } from "react-i18next"
import Api from "service/Api"
import { usePopBox } from "@operations"

interface IFormValues {
 userName: string
 password: string
}

const Basic: FC = () => {
 const { t } = useTranslation()
 const { setPopBoxType } = usePopBox()
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
    // * do something
   } else if ([1101].includes(errorCode)) {
    // * setError 做額外的錯誤處理
    setError("password", { type: "custom", message })
   }
  } catch (error) {
   setPopBoxType({
    type: "warn",
    props: { content: error.message },
   })
  }
 }

 return (
  <form onSubmit={handleSubmit(onSubmit)}>
   <Input
    register={register}
    label="userName"
    placeholder="Basic usage"
    error={errors.userName}
    prefix={<i className="icon icon-member" />}
    rules={[
     {
      required: true,
      message: t("IsRequired", { key: t("UserName") }),
     },
     {
      minLength: 6,
      maxLength: 18,
      pattern: /^[A-Za-z0-9]+$/i,
      message: t("UserNameAlphanumeric"),
     },
    ]}
   />

   {/* // * 額外的 Tip */}
   <Input.Tip>some tip</Input.Tip>
  </form>
 )
}

export default Basic; ****
```
