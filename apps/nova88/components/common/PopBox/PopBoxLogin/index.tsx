import {
	Api,
	getCustProfileAsync,
	getPointBalanceAsync,
	selectedLangId,
	setIsLogin,
} from '@api'
import { imageUrl, siteInfo } from '@apps/nova88/config'
import { REWARD88_LANG } from '@constants'
import { useAppDispatch, useAppSelector, usePopBox } from '@operations'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocalStorage } from 'usehooks-ts'
import Form from './Form'

interface IFormValues {
	userName: string
	password: string
}

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
				setError('password', { type: 'custom', message })
			} else if ([1102, 9000].includes(errorCode)) {
				setError('userName', { type: 'custom', message })
			}
		} catch (error) {
			setPopBoxType({
				type: 'warn',
				props: { content: error.message },
			})
		}
	}

	return (
		<div className='login-pop'>
			<div className='icon icon-close' onClick={closePopBox} />
			<div className='loginModule'>
				<div>
					<img src={`${imageUrl}/img/login_${i18n.language}.jpg`} alt='' />
				</div>
				<div className='loginFunction'>
					<img src={`${imageUrl}/img/88logo.png`} alt='' />
					<div className='title'>{t('Login')}</div>

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
