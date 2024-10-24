import React, { FC, ReactNode } from 'react'

interface DropdownOptionInterface extends FC<IDropdownOptionProps> {
	DROPDOWN_OPTION: string
}

interface IDropdownOptionProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	value: any
	children: ReactNode
}

const DropdownOption: DropdownOptionInterface = ({
	value,
	children,
	...props
}) => {
	return (
		<div className='dropdown-item' {...props}>
			{children}
		</div>
	)
}

DropdownOption.DROPDOWN_OPTION = 'DROPDOWN_OPTION'

export default DropdownOption
