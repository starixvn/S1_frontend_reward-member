import classnames from 'classnames'
import React, {
	Children,
	cloneElement,
	FC,
	ReactElement,
	useEffect,
	useRef,
	useState,
} from 'react'
import { useEffectOnce, useOnClickOutside } from 'usehooks-ts'
import DropdownOption from './DropdownOption'

// * 驗證是否為 Dropdown.Option 元件
const isChildValid = child => child?.type?.['DROPDOWN_OPTION']

interface IDropdownProps {
	placeholder?: string
	defaultValue?: string | number
	value?: string | number
	children: ReactElement | ReactElement[]
	onChange?: (value: any) => void
}

interface DropdownInterface extends FC<IDropdownProps> {
	Option: typeof DropdownOption
}

const Dropdown: DropdownInterface = ({
	placeholder,
	defaultValue,
	value,
	children,
	onChange,
}) => {
	const ref = useRef(null)
	const [active, setActive] = useState<boolean>(false)
	const [option, setOption] = useState<{
		value: any
		optionChildren: any
		index: number
	}>()

	const elements = Array.isArray(children) ? children : [children]

	const toggleActive = () => setActive(prev => !prev)

	// * 點擊 Dropdown 以外的地方將 Options 收合起來
	useOnClickOutside(ref, () => {
		if (active) {
			setActive(false)
		}
	})

	const handleOptionChange = newValue => {
		if (newValue !== undefined) {
			const index = elements.findIndex(({ props }) => props?.value === newValue)

			if (index !== -1) {
				const defaultOption = {
					value: elements[index]?.props?.value,
					optionChildren: elements[index]?.props?.children,
					index,
				}

				setOption(defaultOption)
			} else {
				setOption(undefined)
			}
		}
	}

	// * 初始默認值
	useEffectOnce(() => {
		handleOptionChange(defaultValue)
	})

	// * control component 模式
	useEffect(() => {
		handleOptionChange(value)
	}, [value])

	const placeholderElement = option?.optionChildren ?? placeholder ?? ''

	const renderOptions = () => {
		return Children.map(elements, (child, index) => {
			// * 只允許使用 Dropdown.Option
			if (!isChildValid(child)) {
				throw new Error(
					"Dropdown, Only accepts Dropdown.Option as it's children"
				)
			}

			const { value, children: optionChildren } = child?.props ?? {}

			const elementProps: React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLDivElement>,
				HTMLDivElement
			> = {
				onClick: () => {
					// * 將綁定的 value 往上傳
					onChange && onChange(value)
					// * 記錄當前值
					setOption({ value, optionChildren, index })
					//  * 收合 Options
					toggleActive()
				},
			}

			return cloneElement(child, {
				...elementProps,
			})
		})
	}

	return (
		<div ref={ref} className='inputBox'>
			<div className='dropdown'>
				<button
					onClick={toggleActive}
					className={classnames('btn', {
						active: active,
					})}
				>
					{placeholderElement}
				</button>
				<div
					className={classnames('dropdown-container', {
						active: active,
					})}
				>
					{renderOptions()}
				</div>
			</div>
		</div>
	)
}

Dropdown.Option = DropdownOption
export { Dropdown }
