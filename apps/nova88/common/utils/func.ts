export const setCookie = ({
	cookieName,
	cookieValue,
	exdays,
}: {
	cookieName: string
	cookieValue: any
	exdays?: number
}) => {
	const d = new Date()
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
	const expires = `expires=${d.toUTCString()}`
	if (typeof document !== `undefined`) {
		document.cookie = `${cookieName}=${cookieValue};${expires};path=/`
	}
}

export const numberFormat = value => {
	if (value) {
		const valueStr = value.toString()
		const dotIdex = valueStr.indexOf(".")
		let intValue = valueStr
		let floatValue = ""
		if (dotIdex !== -1) {
			intValue = valueStr.substr(0, dotIdex)
			floatValue = valueStr.substr(dotIdex + 1)
		}
		let newIntValue = ""
		for (let index = 0; index < intValue.length; index++) {
			const item = intValue[intValue.length - index - 1]
			if (index !== 0 && index % 3 === 0) {
				newIntValue = item + "," + newIntValue
			} else {
				newIntValue = item + newIntValue
			}
		}
		return floatValue ? newIntValue + "." + floatValue : newIntValue
	}
}
