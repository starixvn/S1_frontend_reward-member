import { LANG_GROUP_COUNTRY } from '@constants'
import { LANG_GROUPS } from '@constants/site/onetwobet'
import { useLanguageGroup } from '@core'
import { usePopBox } from '@operations'
import classnames from 'classnames'
import { Fragment, useRef } from 'react'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'

const LangDropdown = () => {
	const { icon, languageGroup, onSetLanguage } = useLanguageGroup(LANG_GROUPS)
	const { value: isOpen, toggle, setFalse } = useBoolean(false)
	const wrapper = useRef()
	const { setPopBoxType } = usePopBox()

	useOnClickOutside(wrapper, () => setFalse())

	const handleClickLang = async ({
		langCode,
		currencyId,
	}: {
		langCode: string
		currencyId: number
	}) => {
		try {
			await onSetLanguage({
				langCode,
				currencyId,
			})
			toggle()
		} catch (error) {
			setPopBoxType({
				type: 'warn',
				props: { content: error.message },
			})
		}
	}

	const languageSelector = Object.entries(languageGroup).map(([lang, item]) => (
		<Fragment key={lang}>
			<div className='countryName'>{LANG_GROUP_COUNTRY[lang]}</div>
			<div className={`flag ${lang}`}>
				{item?.map(({ value, currencyId, displayText }) => {
					return (
						<button
							key={`${lang}-${value}`}
							type='button'
							onClick={() => {
								handleClickLang({
									langCode: value,
									currencyId,
								})
							}}
						>
							{displayText}
						</button>
					)
				})}
			</div>
		</Fragment>
	))

	return (
		<div className='country' ref={wrapper}>
			<button className={`flag ${icon}`} onClick={toggle} />
			<div className={classnames('countryList', { active: isOpen })}>
				{languageSelector}
			</div>
		</div>
	)
}

export default LangDropdown
