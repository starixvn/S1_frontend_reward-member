import classNames from 'classnames'
import findIndex from 'lodash/findIndex'
import merge from 'lodash/merge'
import omit from 'lodash/omit'
import React, { FC, ReactNode, useState } from 'react'
import { Path, RegisterOptions, UseFormRegister } from 'react-hook-form'
import Icon from './Icon'
import Tip from './Tip'

type IRulesOption = RegisterOptions & {
	message: string
}

interface InputProps
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	label: Path<any>
	register: UseFormRegister<any>
	type?: 'text' | 'number' | 'password'
	prefix?: ReactNode | any
	suffix?: ReactNode
	placeholder?: string
	error: any
	rules?: IRulesOption[]
}

interface InputInterface extends FC<InputProps> {
	Tip: typeof Tip
	Icon: typeof Icon
}

const Input: InputInterface = ({
	label,
	register,
	prefix = null,
	suffix = null,
	type = 'text',
	placeholder = '',
	error,
	rules,
	...restInputHTMLAttributes
}) => {
	const [isPassword, setIsPassword] = useState<boolean>(true)

	const togglePasswordView = () => setIsPassword(prev => !prev)

	// * 提供 input 型態及判斷是否顯示密碼
	const inputType =
		type === 'password' ? (isPassword ? 'password' : 'text') : type

	// * 過濾 rules 的 message
	const registerOptions: RegisterOptions = rules.reduce(
		(acc, cur) => merge(acc, omit(cur, ['message'])),
		{}
	)

	// * 尋找 rules 是否提供錯誤訊息，默認值為 error 提供的錯誤訊息
	const ruleIndex = error?.type ? findIndex(rules, error.type) : -1
	const { message = error?.message } = rules[ruleIndex] ?? {}

	const isError = Boolean(error)

	return (
		<>
			<div className='inputTxt'>
				{prefix}

				<input
					{...register(label, registerOptions)}
					type={inputType}
					placeholder={placeholder}
					{...restInputHTMLAttributes}
				/>

				<div className='iconModule'>
					{type === 'password' && (
						<i
							onClick={togglePasswordView}
							className={classNames({
								'icon icon-eye': !isPassword,
								'icon icon-eye-blocked': isPassword,
							})}
						/>
					)}

					{isError && <Icon className='icon icon-warning' />}

					{!isError && suffix}
				</div>
			</div>

			{message && <Tip>{message}</Tip>}
		</>
	)
}

Input.Tip = Tip
Input.Icon = Icon

export { Input }
