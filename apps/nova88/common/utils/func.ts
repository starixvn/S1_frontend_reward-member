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

export const getCookie = name => {
	const value = `; ${document.cookie}`
	const parts = value.split(`; ${name}=`)
	if (parts.length === 2) return parts.pop().split(";").shift()
}

export const numberFormat = (num, decimalPlaces, isShowSign = true) => {
	let sign = ""
	const getDecimal = decimalPlaces => {
		let decimal = ""

		for (let i = 0; i < decimalPlaces; i++) {
			decimal += "0"
		}
		return `${decimalPlaces > 0 ? "." : ""}${decimal}`
	}
	if (num < 0) {
		num = num.toString().replace("-", "")
		sign = isShowSign ? "-" : ""
	}
	return (
		sign +
		String(num)
			.split("")
			.reverse()
			.reduce((prev, next, index) => {
				return (index % 3 ? next : next + ",") + prev
			}) +
		getDecimal(decimalPlaces)
	)
}
